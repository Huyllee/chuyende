import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreDetailAdminPageComponent } from './genre-detail-admin-page.component';

describe('GenreDetailAdminPageComponent', () => {
  let component: GenreDetailAdminPageComponent;
  let fixture: ComponentFixture<GenreDetailAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreDetailAdminPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreDetailAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
