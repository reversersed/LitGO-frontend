import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToUpOverlayComponent } from './to-up-overlay.component';

describe('ToUpOverlayComponent', () => {
  let component: ToUpOverlayComponent;
  let fixture: ComponentFixture<ToUpOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToUpOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToUpOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
