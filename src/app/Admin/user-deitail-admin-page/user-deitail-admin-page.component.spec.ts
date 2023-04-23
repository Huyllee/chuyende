import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeitailAdminPageComponent } from './user-deitail-admin-page.component';

describe('UserDeitailAdminPageComponent', () => {
  let component: UserDeitailAdminPageComponent;
  let fixture: ComponentFixture<UserDeitailAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDeitailAdminPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDeitailAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
