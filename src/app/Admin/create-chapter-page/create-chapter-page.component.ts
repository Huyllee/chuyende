import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { chaptersById, volumes } from 'src/app/Model/novel';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NovelDataService } from 'src/app/Services/novel-data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
  fileTemp: any;

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
    private activatedRouter: ActivatedRoute,
    private fireStogre: AngularFireStorage,
    ) {

  }

  volume = new FormControl('',[Validators.required]);
  title = new FormControl('',[Validators.required]);
  content = new FormControl('',[Validators.required]);
  audio = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createChaptersForm = this.fb.group({
      volume: this.volume,
      title: this.title,
      content: this.content,
      audio: this.audio,
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

  async submit() {
    const file = this.createChaptersForm.get('audio')?.value;

    let chapterNovelUrl = '';
    if (file) {
      const path = `audio/${file.name}`;
      const upload = await this.fireStogre.upload(path, file);
      chapterNovelUrl = await upload.ref.getDownloadURL();
    }
    const formData = {...this.createChaptersForm.value, audio: chapterNovelUrl};
    console.log(formData);

    this.adminService.postChapter(formData).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Chapter created successfully", duration: 3000 });
        this.createChaptersForm.reset();
      }
    })
  }


  async update() {
    if (!this.createChaptersForm.valid) {
      this.createChaptersForm.markAllAsTouched();
      this.toastService.error({ detail: "Error", summary: "Xin vui lòng điền đầy đủ", duration: 3000 });
      return;
    }

    const file = this.fileTemp;
    let chapterNovelUrl = this.chapters.audio;
    if (file) {
      const path = `audio/${file.name}`;
      const upload = await this.fireStogre.upload(path, file);
      chapterNovelUrl = await upload.ref.getDownloadURL();
    }
    const formData = {...this.createChaptersForm.value, cover_image: chapterNovelUrl};
    console.log(formData);

    this.adminService.updateChapter(formData, this.chapterIdUpdate).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Chapter updated successfully", duration: 3000 });
        this.createChaptersForm.reset();
        this.router.navigate(['admin/chapters']);
      }
    })

  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createChaptersForm.get('audio')!.setValue(file);
      this.fileTemp = file;
    }
  }

  fillFormUpdate(chapters: chaptersById) {
    this.createChaptersForm.setValue({
      volume: chapters.volume,
      title: chapters.title,
      content: chapters.content,
      audio: chapters.audio
    })
  }

  logout(){
    this.adminService.logout();
  }
}
