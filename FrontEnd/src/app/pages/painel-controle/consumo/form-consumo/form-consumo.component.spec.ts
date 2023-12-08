import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsumoComponent } from './form-consumo.component';

describe('FormConsumoComponent', () => {
  let component: FormConsumoComponent;
  let fixture: ComponentFixture<FormConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
