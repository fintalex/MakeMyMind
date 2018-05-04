import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickModalComponent } from './brick-modal.component';

describe('BrickModalComponent', () => {
  let component: BrickModalComponent;
  let fixture: ComponentFixture<BrickModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
