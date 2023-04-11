import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelAdminPageComponent } from './novel-admin-page.component';

describe('NovelAdminPageComponent', () => {
  let component: NovelAdminPageComponent;
  let fixture: ComponentFixture<NovelAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovelAdminPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
