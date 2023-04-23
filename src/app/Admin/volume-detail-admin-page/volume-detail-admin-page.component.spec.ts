import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeDetailAdminPageComponent } from './volume-detail-admin-page.component';

describe('VolumeDetailAdminPageComponent', () => {
  let component: VolumeDetailAdminPageComponent;
  let fixture: ComponentFixture<VolumeDetailAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolumeDetailAdminPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumeDetailAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
