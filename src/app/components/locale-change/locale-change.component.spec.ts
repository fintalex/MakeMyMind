import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleChangeComponent } from './locale-change.component';

describe('LocaleChangeComponent', () => {
  let component: LocaleChangeComponent;
  let fixture: ComponentFixture<LocaleChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaleChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaleChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
