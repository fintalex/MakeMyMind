import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickTypeListComponent } from './brick-type-list.component';

describe('BrickListComponent', () => {
  let component: BrickTypeListComponent;
  let fixture: ComponentFixture<BrickTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
