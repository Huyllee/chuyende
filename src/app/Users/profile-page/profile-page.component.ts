import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  ngOnInit(): void {
    // Lấy danh sách các phần tử có class là ".showcase-item"
    const elements = document.querySelectorAll('.count-1');
    const elements2 = document.querySelectorAll('.count-2');

    // Đếm số lượng phần tử
    const count = elements.length;
    const count2 = elements2.length;
    // Lấy phần tử có id là "number"
    const resultElement = document.getElementById('number');
    const resultElement2 = document.getElementById('count');
    const resultElement3 = document.getElementById('value');

    // Thay đổi nội dung HTML của phần tử "number"
    resultElement!.innerHTML = `${count}`;
    resultElement2!.innerHTML = `${count2}`;
    resultElement3!.innerHTML = `${count2}`;
  }

}
