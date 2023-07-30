import { Component, ElementRef, Inject, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompoundInputModel } from './compound-input.model';
import { Subject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-compound-input',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatDividerModule, MatButtonModule, MatMenuModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './compound-input.component.html',
  styleUrls: ['./compound-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: CompoundInputComponent }]
})
export class CompoundInputComponent {
  static nextId = 0;

  @Input() options = [
    { label: 'item 0', value: 'Item 0' },
    { label: 'item 1', value: 'Item 1' },
    { label: 'item 2', value: 'Item 2' },
    { label: 'item 3', value: 'Item 3' },
    { label: 'item 4', value: 'Item 4' },
    { label: 'item 5', value: 'Item 5' },
    { label: 'item 6', value: 'Item 6' },
  ]

  parts: FormGroup<{
    input: FormControl<string | null>;
    select: FormControl<string | null>;
  }>;

  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'compound';
  id = `compound-input-${CompoundInputComponent.nextId++}`;

  onChange = (_: any) => { };
  onTouched = () => { };


  get empty() {
    const { value: { input, select } } = this.parts;
    return !input && !select;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  /* placeholder */
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  /* required */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  /* disabled */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  /* value */
  @Input()
  get value(): CompoundInputModel | null {
    if (this.parts.valid) {
      const { value: { input, select } } = this.parts;
      return new CompoundInputModel(input!, select!);
    }
    return null;
  }
  set value(vals: CompoundInputModel | null) {
    const { input, select } = vals || new CompoundInputModel('', '');
    this.parts.setValue({ input, select });
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  constructor(
    private formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.parts = formBuilder.group({
      input: ['', [Validators.required]],
      select: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  onFocusIn(event: FocusEvent) {
    if (this.focused) {
      return;
    }

    const el = event.target as HTMLElement;   
    if (el.tagName !== 'INPUT') {
      return;
    }

    this.focused = true;
    this.stateChanges.next();
  }

  onFocusOut(event: FocusEvent) {
    const el = event.target as HTMLElement;   
    if (el.tagName !== 'INPUT') {
      return;
    }
    
    this.touched = true;
    this.focused = false;
    this.onTouched();
    this.stateChanges.next();
  }


  writeValue(model: CompoundInputModel | null): void {
    this.value = model;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(): void {
    this.onChange(this.value);
  }

  onSelect(input: string, selection: string): void {
    this.value = new CompoundInputModel(input, selection);
    this.onChange(this.value);
  }

  onContainerClick() {
    // if (this.parts.controls.subscriber.valid) {
    //   this._focusMonitor.focusVia(this.subscriberInput, 'program');
    // } else if (this.parts.controls.exchange.valid) {
    //   this._focusMonitor.focusVia(this.subscriberInput, 'program');
    // } else if (this.parts.controls.area.valid) {
    //   this._focusMonitor.focusVia(this.exchangeInput, 'program');
    // } else {
    //   this._focusMonitor.focusVia(this.areaInput, 'program');
    // }
  }

  setDescribedByIds() {

  }
}
