import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTrushComponent } from './property-trush.component';

describe('PropertyTrushComponent', () => {
  let component: PropertyTrushComponent;
  let fixture: ComponentFixture<PropertyTrushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyTrushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
