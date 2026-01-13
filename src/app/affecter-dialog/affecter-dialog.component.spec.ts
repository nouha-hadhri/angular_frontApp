import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterDialogComponent } from './affecter-dialog.component';

describe('AffecterDialogComponent', () => {
  let component: AffecterDialogComponent;
  let fixture: ComponentFixture<AffecterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffecterDialogComponent]
    });
    fixture = TestBed.createComponent(AffecterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
