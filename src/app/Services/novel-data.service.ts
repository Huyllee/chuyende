import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categories, Novel, chaptersById, favorites, novelById, tagById, volumeById, volumes } from '../Model/novel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class NovelDataService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>('/api/novel/get/categories');
  }

  getNovels(): Observable<Novel[]> {
    return this.http.get<Novel[]>('/api/novel/get/novels');
  }

  getNovelByCategories(genre: string): Observable<Novel[]> {
    return this.http.get<Novel[]>(`/api/novel/get/novels/${genre}`);
  }

  getNovelById(id: string): Observable<novelById[]> {
    return this.http.get<novelById[]>(`/api/novel/get/novel/${id}`);
  }

  getTagById(id: string): Observable<tagById[]> {
    return this.http.get<tagById[]>(`/api/novel/get/novel/tag/${id}`);
  }

  getVolumeById(id: string): Observable<volumeById[]> {
    return this.http.get<volumeById[]>(`/api/novel/get/novel/volumes/${id}`);
  }

  getVolumes(): Observable<volumes[]> {
    return this.http.get<volumes[]>(`/api/novel/get/volumes`);
  }

  getChapters(): Observable<chaptersById[]> {
    return this.http.get<chaptersById[]>(`/api/novel/get/chapters`);
  }

  getChaptersByVolumeId(): Observable<chaptersById[]> {
    return this.http.get<chaptersById[]>(`/api/novel/get/chapters`);
  }

  getChapterById(id: string): Observable<chaptersById[]> {
    return this.http.get<chaptersById[]>(`/api/novel/get/chapter/${id}`);
  }

  getAllNovelsBySearchTerm(searchTerm: string) {
    return this.http.get<Novel[]>(`/api/novel/search/${searchTerm}`)
      .pipe(map(novels => novels.filter(novels => novels.title.toLowerCase()
        .includes(searchTerm.toLowerCase()))
      )
    )
  }

  postFavorites(user_id: string, novel_id: string): Observable<favorites> {
    return this.http.post<favorites>(`/api/novel/post/favorites`, {user_id, novel_id});
  }

  getAllNovels(): Observable<Novel[]> {
    return this.http.get<Novel[]>(`/api/novel/get/allNovels`);
  }

  getChapterByVolume(id: string): Observable<chaptersById[]> {
    return this.http.get<chaptersById[]>(`/api/novel/get/chaptersByVolumeId/${id}`);
  }

}
