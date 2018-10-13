import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickTypeCenterComponent } from './brick-type-center.component';

describe('BrickTypeCenterComponent', () => {
  let component: BrickTypeCenterComponent;
  let fixture: ComponentFixture<BrickTypeCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickTypeCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickTypeCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
