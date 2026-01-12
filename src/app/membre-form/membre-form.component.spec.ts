import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreFormComponent } from './membre-form.component';

describe('MembreFormComponent', () => {
  let component: MembreFormComponent;
  let fixture: ComponentFixture<MembreFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembreFormComponent]
    });
    fixture = TestBed.createComponent(MembreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
