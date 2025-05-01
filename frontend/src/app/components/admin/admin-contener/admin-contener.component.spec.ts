import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContenerComponent } from './admin-contener.component';

describe('AdminContenerComponent', () => {
  let component: AdminContenerComponent;
  let fixture: ComponentFixture<AdminContenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContenerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
