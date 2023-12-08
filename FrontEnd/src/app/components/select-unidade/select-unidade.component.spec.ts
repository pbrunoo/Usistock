import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUnidadeComponent } from './select-unidade.component';

describe('SelectUnidadeComponent', () => {
  let component: SelectUnidadeComponent;
  let fixture: ComponentFixture<SelectUnidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUnidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUnidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
