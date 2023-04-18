import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterDetailAdminPageComponent } from './chapter-detail-admin-page.component';

describe('ChapterDetailAdminPageComponent', () => {
  let component: ChapterDetailAdminPageComponent;
  let fixture: ComponentFixture<ChapterDetailAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterDetailAdminPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterDetailAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
