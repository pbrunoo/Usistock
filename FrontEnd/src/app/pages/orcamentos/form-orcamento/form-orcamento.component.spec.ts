import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrcamentoComponent } from './form-orcamento.component';

describe('FormOrcamentoComponent', () => {
  let component: FormOrcamentoComponent;
  let fixture: ComponentFixture<FormOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOrcamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
