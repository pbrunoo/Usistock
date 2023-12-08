import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFaturamentoComponent } from './form-faturamento.component';

describe('FormFaturamentoComponent', () => {
  let component: FormFaturamentoComponent;
  let fixture: ComponentFixture<FormFaturamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFaturamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFaturamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
