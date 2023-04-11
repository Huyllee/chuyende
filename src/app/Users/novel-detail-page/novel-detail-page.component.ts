import { Component } from '@angular/core';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

@Component({
  selector: 'app-novel-detail-page',
  templateUrl: './novel-detail-page.component.html',
  styleUrls: ['./novel-detail-page.component.scss']
})
export class NovelDetailPageComponent {
  isSpeaking = false; // khởi tạo biến để lưu trạng thái đang đọc hay không

  startReading() {
    const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.textContent);


    paragraphs.forEach(text => {
      const utterance = new SpeechSynthesisUtterance(text!);
      utterance.lang = 'vi-VN'; // thiết lập ngôn ngữ đọc là tiếng Việt
      speechSynthesis.speak(utterance);
    });
  }
}
