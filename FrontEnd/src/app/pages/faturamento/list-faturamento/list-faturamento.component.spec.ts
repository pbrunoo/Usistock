import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFaturamentoComponent } from './list-faturamento.component';

describe('ListFaturamentoComponent', () => {
  let component: ListFaturamentoComponent;
  let fixture: ComponentFixture<ListFaturamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFaturamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFaturamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
