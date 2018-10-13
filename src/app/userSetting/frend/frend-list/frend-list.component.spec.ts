import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrendListComponent } from './frend-list.component';

describe('FrendListComponent', () => {
  let component: FrendListComponent;
  let fixture: ComponentFixture<FrendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
