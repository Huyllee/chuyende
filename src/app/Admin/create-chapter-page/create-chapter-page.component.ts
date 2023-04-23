import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { chaptersById, volumes } from 'src/app/Model/novel';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NovelDataService } from 'src/app/Services/novel-data.service';

@Component({
  selector: 'app-create-chapter-page',
  templateUrl: './create-chapter-page.component.html',
  styleUrls: ['./create-chapter-page.component.scss']
})
export class CreateChapterPageComponent {
  //Sidebar toggle show hide function
  status = false;

  createChaptersForm!: FormGroup;
  chapterIdUpdate!: number;
  public isUpdateActive: boolean = false;
  chapters!: chaptersById;
  volumes: volumes[] = [];

  addToggle()
  {
    this.status = !this.status;
  }

  constructor(
    private fb: FormBuilder,
    private adminService: AdminApiService,
    private novelService: NovelDataService,
    private router: Router,
    private toastService: NgToastService,
    private activatedRouter: ActivatedRoute
    ) {

  }

  volume = new FormControl('',[Validators.required]);
  title = new FormControl('',[Validators.required]);
  content = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createChaptersForm = this.fb.group({
      volume: this.volume,
      title: this.title,
      content: this.content,
    })

    this.novelService.getVolumes().subscribe(volumes => this.volumes = volumes);

    this.activatedRouter.params.subscribe(val => {
      this.chapterIdUpdate = val["id"];
      if (val && val["id"]) {
        this.adminService.getChapterById(this.chapterIdUpdate).subscribe(res => {
          this.isUpdateActive = true;
          this.fillFormUpdate(res);
          this.chapters = res;
        })
      }
      console.log(this.chapters);
    })

  }

  submit() {
    this.adminService.postChapter(this.createChaptersForm.value).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Chapter created successfully", duration: 3000 });
        this.createChaptersForm.reset();
      }
    })
  }


  update() {
    this.adminService.updateChapter(this.createChaptersForm.value, this.chapterIdUpdate).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Chapter updated successfully", duration: 3000 });
        this.createChaptersForm.reset();
        this.router.navigate(['admin/chapters']);
      }
    })

  }

  fillFormUpdate(chapters: chaptersById) {
    this.createChaptersForm.setValue({
      volume: chapters.volume,
      title: chapters.title,
      content: chapters.content,
    })
  }
}
