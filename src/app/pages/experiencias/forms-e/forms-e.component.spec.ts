import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEComponent } from './forms-e.component';

describe('FormsEComponent', () => {
  let component: FormsEComponent;
  let fixture: ComponentFixture<FormsEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsEComponent]
    });
    fixture = TestBed.createComponent(FormsEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
