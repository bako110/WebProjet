import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConditionComponent } from './user-condition.component';

describe('UserConditionComponent', () => {
  let component: UserConditionComponent;
  let fixture: ComponentFixture<UserConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
