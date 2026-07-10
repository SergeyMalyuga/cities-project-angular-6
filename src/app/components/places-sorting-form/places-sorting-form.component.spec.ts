import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesSortingFormComponent } from './places-sorting-form.component';

describe('PlacesSortingFormComponent', () => {
  let component: PlacesSortingFormComponent;
  let fixture: ComponentFixture<PlacesSortingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesSortingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesSortingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
