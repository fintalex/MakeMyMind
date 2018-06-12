import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallSideNavComponent } from './wall-side-nav.component';

describe('WallSideNavComponent', () => {
  let component: WallSideNavComponent;
  let fixture: ComponentFixture<WallSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
