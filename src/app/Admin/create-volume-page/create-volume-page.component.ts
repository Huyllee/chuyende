import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Novel, volumes } from 'src/app/Model/novel';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NovelDataService } from 'src/app/Services/novel-data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-create-volume-page',
  templateUrl: './create-volume-page.component.html',
  styleUrls: ['./create-volume-page.component.scss']
})
export class CreateVolumePageComponent {
  //Sidebar toggle show hide function
  status = false;
  fileTemp: any;
  createVolumeForm!: FormGroup;
  volumeIdUpdate!: number;
  public isUpdateActive: boolean = false;
  volumes!: volumes;
  novels: Novel[] = [];

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

  novels_id = new FormControl('',[Validators.required]);
  volume_title = new FormControl('',[Validators.required]);
  cover_image = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createVolumeForm = this.fb.group({
      novels: this.novels,
      volume_title: this.volume_title,
      cover_image: this.cover_image,
    })

    this.novelService.getAllNovels().subscribe(novels => this.novels = novels);

    this.activatedRouter.params.subscribe(val => {
      this.volumeIdUpdate = val["id"];
      if (val && val["id"]) {
        this.adminService.getVolumeById(this.volumeIdUpdate).subscribe(res => {
          this.isUpdateActive = true;
          this.fillFormUpdate(res);
          this.volumes = res;
        })
      }
      console.log(this.volumes);
    })

  }

  async submit() {
    const file = this.createVolumeForm.get('cover_image')?.value;

    let volumeImageUrl = '';
    if (file) {
      const path = `volumes/${file.name}`;
      const upload = await this.fireStogre.upload(path, file);
      volumeImageUrl = await upload.ref.getDownloadURL();
    }
    const formData = {...this.createVolumeForm.value, cover_image: volumeImageUrl};
    console.log(formData);

    this.adminService.postVolume(formData).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Volume created successfully", duration: 3000 });
        this.createVolumeForm.reset();
      }
    })
  }


  async update() {
    if (!this.createVolumeForm.valid) {
      this.createVolumeForm.markAllAsTouched();
      this.toastService.error({ detail: "Error", summary: "Xin vui lòng điền đầy đủ", duration: 3000 });
      return;
    }

    const file = this.fileTemp;
    let volumeImageUrl = this.volumes.cover_image;
    if (file) {
      const path = `volumes/${file.name}`;
      const upload = await this.fireStogre.upload(path, file);
      volumeImageUrl = await upload.ref.getDownloadURL();
    }
    const formData = {...this.createVolumeForm.value, cover_image: volumeImageUrl};
    console.log(formData);

    this.adminService.updateVolume(formData, this.volumeIdUpdate).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Volume updated successfully", duration: 3000 });
        this.createVolumeForm.reset();
        this.router.navigate(['admin/volumes']);
      }
    })

  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createVolumeForm.get('cover_image')!.setValue(file);
      this.fileTemp = file;
    }
  }

  fillFormUpdate(volumes: volumes) {
    this.createVolumeForm.setValue({
      novels: volumes.novels,
      volume_title: volumes.volume_title,
      cover_image: volumes.cover_image,
    })
  }

  logout(){
    this.adminService.logout();
  }
}
