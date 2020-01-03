import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyHelpComponent } from './property-help.component';

describe('PropertyHelpComponent', () => {
  let component: PropertyHelpComponent;
  let fixture: ComponentFixture<PropertyHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
