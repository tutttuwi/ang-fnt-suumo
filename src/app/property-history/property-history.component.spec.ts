import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyHistoryComponent } from './property-history.component';

describe('PropertyHistoryComponent', () => {
  let component: PropertyHistoryComponent;
  let fixture: ComponentFixture<PropertyHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
