import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Audio, Categories, Novel, chaptersById, favorites, novelById, rating, tagById, volumeById, volumes } from '../Model/novel';

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

  postFavorites(user_id: string, novel_id: number): Observable<favorites> {
    return this.http.post<favorites>(`/api/novel/post/favorites`, {user_id, novel_id});
  }

  getFavorites(id: string): Observable<favorites[]> {
    return this.http.get<favorites[]>(`/api/novel/get/favorites/${id}`);
  }

  postRating(user_id: string, novel_id: number, rating_value: number): Observable<rating> {
    return this.http.post<rating>(`/api/novel/post/rating`, {user_id, novel_id, rating_value});
  }

  // getRating(id: string): Observable<rating[]> {
  //   return this.http.get<rating[]>(`/api/novel/get/ratings/${id}`);
  // }

  getRating(novelId: number, userId: number): Observable<rating> {
    const params = new HttpParams()
      .set('novel_id', novelId.toString())
      .set('user_id', userId.toString());

    return this.http.get<rating>(`/api/novel/get/ratings/`, { params });
  }

  getAllNovels(): Observable<Novel[]> {
    return this.http.get<Novel[]>(`/api/novel/get/allNovels`);
  }

  getChapterByVolume(id: string): Observable<chaptersById[]> {
    return this.http.get<chaptersById[]>(`/api/novel/get/chaptersByVolumeId/${id}`);
  }

  getAudio(id: string): Observable<Audio[]> {
    return this.http.get<Audio[]>(`/api/novel/get/audio/${id}`);
  }

}
