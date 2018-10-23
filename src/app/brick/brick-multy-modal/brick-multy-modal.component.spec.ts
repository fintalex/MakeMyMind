import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickMultyModalComponent } from './brick-multy-modal.component';

describe('BrickMultyModalComponent', () => {
  let component: BrickMultyModalComponent;
  let fixture: ComponentFixture<BrickMultyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickMultyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickMultyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
