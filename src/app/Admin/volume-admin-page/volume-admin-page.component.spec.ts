import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeAdminPageComponent } from './volume-admin-page.component';

describe('VolumeAdminPageComponent', () => {
  let component: VolumeAdminPageComponent;
  let fixture: ComponentFixture<VolumeAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolumeAdminPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumeAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
