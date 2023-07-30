import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CompoundInputComponent } from 'src/compound-input/compound-input.component';
import { CompoundInputModel } from 'src/compound-input/compound-input.model';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CompoundInputComponent, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup = new FormGroup({
    tel: new FormControl(new CompoundInputModel('', '')),
  });
}
