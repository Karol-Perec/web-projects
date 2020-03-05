import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiApiComponent } from './wiki-api.component';

describe('WikiApiComponent', () => {
  let component: WikiApiComponent;
  let fixture: ComponentFixture<WikiApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
