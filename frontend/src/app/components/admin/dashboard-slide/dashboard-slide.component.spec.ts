import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSlideComponent } from './dashboard-slide.component';

describe('DashboardSlideComponent', () => {
  let component: DashboardSlideComponent;
  let fixture: ComponentFixture<DashboardSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
