import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersAdminPageComponent } from './chapters-admin-page.component';

describe('ChaptersAdminPageComponent', () => {
  let component: ChaptersAdminPageComponent;
  let fixture: ComponentFixture<ChaptersAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaptersAdminPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaptersAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
