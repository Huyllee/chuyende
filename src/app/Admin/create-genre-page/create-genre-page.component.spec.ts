import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGenrePageComponent } from './create-genre-page.component';

describe('CreateGenrePageComponent', () => {
  let component: CreateGenrePageComponent;
  let fixture: ComponentFixture<CreateGenrePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGenrePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGenrePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
