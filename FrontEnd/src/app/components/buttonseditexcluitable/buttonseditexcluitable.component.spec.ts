import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonseditexcluitableComponent } from './buttonseditexcluitable.component';

describe('ButtonseditexcluitableComponent', () => {
  let component: ButtonseditexcluitableComponent;
  let fixture: ComponentFixture<ButtonseditexcluitableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonseditexcluitableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonseditexcluitableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
