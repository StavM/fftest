import { Component, ElementRef, Inject, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompoundInputModel, CompoundInputOption, defaultCompoundInput } from './compound-input.model';
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
  providers: [{ provide: MatFormFieldControl, useExisting: CompoundInputComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})
export class CompoundInputComponent {
  static nextId = 0;

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
    const { input, select } = vals || defaultCompoundInput;
    this.parts.setValue({ input, select });
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  constructor(
    formBuilder: FormBuilder,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.parts = formBuilder.group({
      input: [defaultCompoundInput.input, [Validators.required]],
      select: [defaultCompoundInput.select, [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
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

  onSelect(selection: any): void {
    this.parts.patchValue({ select: selection.value });
    this.onChange(this.value);
  }
}
