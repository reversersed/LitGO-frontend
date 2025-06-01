import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBooksPageComponent } from './my-books-page.component';

describe('MyBooksPageComponent', () => {
  let component: MyBooksPageComponent;
  let fixture: ComponentFixture<MyBooksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBooksPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
