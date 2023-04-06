import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelCreationPageComponent } from './novel-creation-page.component';

describe('NovelCreationPageComponent', () => {
  let component: NovelCreationPageComponent;
  let fixture: ComponentFixture<NovelCreationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovelCreationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
