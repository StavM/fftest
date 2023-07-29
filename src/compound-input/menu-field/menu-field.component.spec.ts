import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFieldComponent } from './menu-field.component';

describe('MenuFieldComponent', () => {
  let component: MenuFieldComponent;
  let fixture: ComponentFixture<MenuFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuFieldComponent]
    });
    fixture = TestBed.createComponent(MenuFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
