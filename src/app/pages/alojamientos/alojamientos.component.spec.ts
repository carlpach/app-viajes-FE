import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlojamientosComponent } from './alojamientos.component';

describe('AlojamientosComponent', () => {
  let component: AlojamientosComponent;
  let fixture: ComponentFixture<AlojamientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlojamientosComponent]
    });
    fixture = TestBed.createComponent(AlojamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
