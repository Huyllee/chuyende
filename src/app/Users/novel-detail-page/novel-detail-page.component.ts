import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { Observable } from 'rxjs';
import { Audio, chaptersById, volumeById, volumes } from 'src/app/Model/novel';
import { NovelDataService } from 'src/app/Services/novel-data.service';

@Component({
  selector: 'app-novel-detail-page',
  templateUrl: './novel-detail-page.component.html',
  styleUrls: ['./novel-detail-page.component.scss']
})
export class NovelDetailPageComponent {
  isSpeaking = false; // khởi tạo biến để lưu trạng thái đang đọc hay không
  chapters: chaptersById[] = [];
  volumes: volumes[] = [];
  audio: Audio[] = [];

  startReading() {
    const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.textContent);


    paragraphs.forEach(text => {
      const utterance = new SpeechSynthesisUtterance(text!);
      utterance.lang = 'vi-VN'; // thiết lập ngôn ngữ đọc là tiếng Việt
      speechSynthesis.speak(utterance);
    });
  }

  constructor(private novelService: NovelDataService, private activatedRoute: ActivatedRoute) {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.novelService.getChapterById(id).subscribe(chapters => {
      this.chapters = chapters;
      console.log(this.chapters[0]);
    });

    let novelsObservalbe: Observable<chaptersById[]>;
    activatedRoute.params.subscribe((params) => {
      if ((params && params['id'])) {
        novelsObservalbe = this.novelService.getChapterById(params['id']);
        this.novelService.getAudio(params['id']).subscribe(audio => {
          this.audio = audio;
          console.log(this.audio[0]);
        });
      }

      novelsObservalbe.subscribe((chapters) => {
        this.chapters = chapters;
        console.log(chapters[0]);

      })
    });

    this.novelService.getVolumes().subscribe(volumes => {
      this.volumes = volumes;
      console.log(this.volumes);
    });

  }

}
