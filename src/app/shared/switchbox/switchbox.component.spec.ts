import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchboxComponent } from './switchbox.component';

describe('SwitchboxComponent', () => {
  let component: SwitchboxComponent;
  let fixture: ComponentFixture<SwitchboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
