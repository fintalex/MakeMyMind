import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickTypeDetailsComponent } from './brick-type-details.component';

describe('BrickDetailsComponent', () => {
  let component: BrickTypeDetailsComponent;
  let fixture: ComponentFixture<BrickTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
