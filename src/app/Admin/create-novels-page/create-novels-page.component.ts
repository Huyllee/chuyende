import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-create-novels-page',
  templateUrl: './create-novels-page.component.html',
  styleUrls: ['./create-novels-page.component.scss']
})
export class CreateNovelsPageComponent {
  //Sidebar toggle show hide function
  status = false;

  addToggle()
  {
    this.status = !this.status;
  }

  public uploader: FileUploader = new FileUploader({url: URL});

  constructor() {
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log('FileUpload:uploaded:', item, status, response);
    };
  }
}
