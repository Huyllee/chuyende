import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelDetailAdminPageComponent } from './novel-detail-admin-page.component';

describe('NovelDetailAdminPageComponent', () => {
  let component: NovelDetailAdminPageComponent;
  let fixture: ComponentFixture<NovelDetailAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovelDetailAdminPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelDetailAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
