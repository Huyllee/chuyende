import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNovelsPageComponent } from './create-novels-page.component';

describe('CreateNovelsPageComponent', () => {
  let component: CreateNovelsPageComponent;
  let fixture: ComponentFixture<CreateNovelsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNovelsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNovelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
