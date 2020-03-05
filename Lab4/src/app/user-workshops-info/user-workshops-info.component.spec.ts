import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkshopsInfoComponent } from './user-workshops-info.component';

describe('UserWorkshopsInfoComponent', () => {
  let component: UserWorkshopsInfoComponent;
  let fixture: ComponentFixture<UserWorkshopsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWorkshopsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkshopsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
