import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsAComponent } from './forms-a.component';

describe('FormsAComponent', () => {
  let component: FormsAComponent;
  let fixture: ComponentFixture<FormsAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsAComponent]
    });
    fixture = TestBed.createComponent(FormsAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
