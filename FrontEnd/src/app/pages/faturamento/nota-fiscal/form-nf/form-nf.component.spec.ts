import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNfComponent } from './form-nf.component';

describe('FormNfComponent', () => {
  let component: FormNfComponent;
  let fixture: ComponentFixture<FormNfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
