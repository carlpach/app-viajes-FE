import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBookingComponent } from './detail-booking.component';

describe('DetailBookingComponent', () => {
  let component: DetailBookingComponent;
  let fixture: ComponentFixture<DetailBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailBookingComponent]
    });
    fixture = TestBed.createComponent(DetailBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
