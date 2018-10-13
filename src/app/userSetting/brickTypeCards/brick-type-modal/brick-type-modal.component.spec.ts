import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickTypeModalComponent } from './brick-type-modal.component';

describe('BrickTypeModalComponent', () => {
  let component: BrickTypeModalComponent;
  let fixture: ComponentFixture<BrickTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
