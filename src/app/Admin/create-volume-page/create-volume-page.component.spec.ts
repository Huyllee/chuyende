import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVolumePageComponent } from './create-volume-page.component';

describe('CreateVolumePageComponent', () => {
  let component: CreateVolumePageComponent;
  let fixture: ComponentFixture<CreateVolumePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVolumePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVolumePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
