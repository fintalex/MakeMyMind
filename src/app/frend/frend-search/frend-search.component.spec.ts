import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrendSearchComponent } from './frend-search.component';

describe('FrendSearchComponent', () => {
  let component: FrendSearchComponent;
  let fixture: ComponentFixture<FrendSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrendSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrendSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
