import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFuncionariosComponent } from './form-funcionarios.component';

describe('FormFuncionariosComponent', () => {
  let component: FormFuncionariosComponent;
  let fixture: ComponentFixture<FormFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFuncionariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
