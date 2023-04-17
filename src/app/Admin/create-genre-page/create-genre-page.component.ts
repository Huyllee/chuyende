import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from 'src/app/Model/novel';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-genre-page',
  templateUrl: './create-genre-page.component.html',
  styleUrls: ['./create-genre-page.component.scss']
})
export class CreateGenrePageComponent {
  //Sidebar toggle show hide function
  status = false;

  createGenreForm!: FormGroup;
  genreIdUpdate!: number;
  public isUpdateActive: boolean = false;
  genre!: Categories;

  addToggle()
  {
    this.status = !this.status;
  }

  roles: number[] = [
    1,
    2,
  ]

  constructor(
    private fb: FormBuilder,
    private adminService: AdminApiService,
    private router: Router,
    private toastService: NgToastService,
    private activatedRouter: ActivatedRoute
    ) {
  }

  category_name = new FormControl('',[Validators.required]);
  description = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createGenreForm = this.fb.group({
      category_name: this.category_name,
      description: this.description,
    })

    this.activatedRouter.params.subscribe(val => {
      this.genreIdUpdate = val["id"];
      if (val && val["id"]) {
        this.adminService.getGenreById(this.genreIdUpdate).subscribe(res => {
          this.isUpdateActive = true;
          this.fillFormUpdate(res);
          this.genre = res;
        })
      }
      console.log(this.genreIdUpdate);
    })

  }

  submit() {
    this.adminService.postGenre(this.createGenreForm.value).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Genre created successfully", duration: 3000 });
        this.createGenreForm.reset();
      }
    })
  }


  update() {
    this.adminService.updateGenre(this.createGenreForm.value, this.genreIdUpdate).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Genre updated successfully", duration: 3000 });
        this.createGenreForm.reset();
        this.router.navigate(['admin/genre']);
      }
    })

  }

  fillFormUpdate(genre: Categories) {
    this.createGenreForm.setValue({
      category_name: genre.category_name,
      description: genre.description,
    })
  }

}
