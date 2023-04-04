import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelDetailPageComponent } from './novel-detail-page.component';

describe('NovelDetailPageComponent', () => {
  let component: NovelDetailPageComponent;
  let fixture: ComponentFixture<NovelDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovelDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
