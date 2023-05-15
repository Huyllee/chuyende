import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NgToastService } from 'ng-angular-popup';
import { NovelDataService } from 'src/app/Services/novel-data.service';
import { Categories, Novel, newNovel } from 'src/app/Model/novel';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-create-novels-page',
  templateUrl: './create-novels-page.component.html',
  styleUrls: ['./create-novels-page.component.scss']
})
export class CreateNovelsPageComponent {
  //Sidebar toggle show hide function
  status = false;

  createNovelForm!: FormGroup;
  novelIdUpdate!: number;
  public isUpdateActive: boolean = false;
  categories: Categories[] = [];
  novel!: Novel;
  fileTemp: any;

  addToggle()
  {
    this.status = !this.status;
  }

  // public uploader: FileUploader = new FileUploader({url: URL});

  constructor(
    private fb: FormBuilder,
    private adminService: AdminApiService,
    private novelService: NovelDataService,
    private router: Router,
    private toastService: NgToastService,
    private activatedRouter: ActivatedRoute,
    private fireStogre: AngularFireStorage,
    ) {
    // this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
    //   console.log('FileUpload:uploaded:', item, status, response);
    // };
  }

  title = new FormControl('',[Validators.required]);
  author = new FormControl('',[Validators.required]);
  artist = new FormControl('',[Validators.required]);
  description = new FormControl('',[Validators.required]);
  cover_image = new FormControl('',[Validators.required]);
  categories_id = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createNovelForm = this.fb.group({
      title: this.title,
      author: this.author,
      artist: this.artist,
      description: this.description,
      cover_image: this.cover_image,
      categories_id: this.categories_id,
    })

    this.novelService.getCategories().subscribe(categories => this.categories = categories);

    this.activatedRouter.params.subscribe(val => {
      this.novelIdUpdate = val["id"];
      if (val && val["id"]) {
        this.adminService.getNovelById(this.novelIdUpdate).subscribe(res => {
          this.isUpdateActive = true;
          this.fillFormUpdate(res);
          this.novel = res;
        })
      }
      console.log(this.novel);
    })

  }

  async submit() {
    const file = this.createNovelForm.get('cover_image')?.value;

    let novelImageUrl = '';
    if (file) {
      const path = `novel/${file.name}`;
      const upload = await this.fireStogre.upload(path, file);
      novelImageUrl = await upload.ref.getDownloadURL();
    }
    const formData = {...this.createNovelForm.value, cover_image: novelImageUrl};
    console.log(formData);


    this.adminService.postNovel(formData).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Novel created successfully", duration: 3000 });
        this.createNovelForm.reset();
      }
    })
  }


  async update() {
    if (!this.createNovelForm.valid) {
      this.createNovelForm.markAllAsTouched();
      this.toastService.error({ detail: "Error", summary: "Xin vui lòng điền đầy đủ", duration: 3000 });
      return;
    }

    const file = this.fileTemp;
    let novelImageUrl = this.novel.cover_image;
    if (file) {
      const path = `novel/${file.name}`;
      const upload = await this.fireStogre.upload(path, file);
      novelImageUrl = await upload.ref.getDownloadURL();
    }
    const formData = {...this.createNovelForm.value, cover_image: novelImageUrl};
    console.log(formData);


    this.adminService.updateNovel(formData, this.novelIdUpdate).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Novel updated successfully", duration: 3000 });
        this.createNovelForm.reset();
        this.router.navigate(['admin/novels']);
      }
    })

  }


  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   const fileName = file.name;
  //   this.createNovelForm.get('cover_image')!.setValue(fileName);
  // }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createNovelForm.get('cover_image')!.setValue(file);
      this.fileTemp = file;
    }
  }

  fillFormUpdate(novel: Novel) {
    this.createNovelForm.setValue({
      title: novel.title,
      author: novel.author,
      artist: novel.artist,
      description: novel.description,
      cover_image: novel.cover_image,
      categories_id: novel.categories_id,
    })
  }

  logout(){
    this.adminService.logout();
  }
}

