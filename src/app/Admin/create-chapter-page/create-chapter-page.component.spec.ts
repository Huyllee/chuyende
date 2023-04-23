import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChapterPageComponent } from './create-chapter-page.component';

describe('CreateChapterPageComponent', () => {
  let component: CreateChapterPageComponent;
  let fixture: ComponentFixture<CreateChapterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChapterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChapterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
