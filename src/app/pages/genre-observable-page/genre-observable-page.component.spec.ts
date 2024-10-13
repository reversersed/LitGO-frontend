import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreObservablePageComponent } from './genre-observable-page.component';

describe('GenreObservablePageComponent', () => {
  let component: GenreObservablePageComponent;
  let fixture: ComponentFixture<GenreObservablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreObservablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreObservablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
