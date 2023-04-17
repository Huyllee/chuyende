import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Novel, volumes } from 'src/app/Model/novel';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NovelDataService } from 'src/app/Services/novel-data.service';

@Component({
  selector: 'app-create-volume-page',
  templateUrl: './create-volume-page.component.html',
  styleUrls: ['./create-volume-page.component.scss']
})
export class CreateVolumePageComponent {
  //Sidebar toggle show hide function
  status = false;

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
    private activatedRouter: ActivatedRoute
    ) {

  }

  novel_id = new FormControl('',[Validators.required]);
  volume_title = new FormControl('',[Validators.required]);
  cover_image = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createVolumeForm = this.fb.group({
      novel_id: this.novel_id,
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

  submit() {
    this.adminService.postVolume(this.createVolumeForm.value).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Volume created successfully", duration: 3000 });
        this.createVolumeForm.reset();
      }
    })
  }


  update() {
    this.adminService.updateVolume(this.createVolumeForm.value, this.volumeIdUpdate).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "Volume updated successfully", duration: 3000 });
        this.createVolumeForm.reset();
        this.router.navigate(['admin/novels']);
      }
    })

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileName = file.name;
    this.createVolumeForm.get('cover_image')!.setValue(fileName);
  }

  fillFormUpdate(volumes: volumes) {
    this.createVolumeForm.setValue({
      novel_id: volumes.novel_id,
      volume_title: volumes.volume_title,
      cover_image: volumes.cover_image,
    })
  }
}
