import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAdminPageComponent } from './genre-admin-page.component';

describe('GenreAdminPageComponent', () => {
  let component: GenreAdminPageComponent;
  let fixture: ComponentFixture<GenreAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreAdminPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
