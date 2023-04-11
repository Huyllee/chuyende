import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categories, Novel, novelByGenre } from '../Model/novel';

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

  getAllFoodsByTag(tag: string): Observable<Novel[]> {
    return this.http.get<Novel[]>('/api/novel/get/novels/' + tag);
  }

  getNovelById(id: string): Observable<Novel[]> {
    return this.http.get<Novel[]>('/api/novel/get/novels/' + id);
  }

  // getUsersById(id: string): Observable<Users> {
  //   return this.http.get<Users>(`/api/v1/Users/${id}`);
  // }

}
