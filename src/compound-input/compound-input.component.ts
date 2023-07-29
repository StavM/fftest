import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuFieldComponent } from './menu-field/menu-field.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-compound-input',
  standalone: true,
  imports: [CommonModule, MenuFieldComponent, InputFieldComponent, MatDividerModule],
  templateUrl: './compound-input.component.html',
  styleUrls: ['./compound-input.component.scss']
})
export class CompoundInputComponent {

}
