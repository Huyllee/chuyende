import { Injectable } from '@angular/core';
import { Novel, newNovel } from '../Model/novel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient) { }

  postNovel(NovelObj: Novel): Observable<Novel> {
    return this.http.post<Novel>(`${'/api/novel/post/newNovel'}`, NovelObj )
  }

  getNovel(): Observable<Novel[]>{
    return this.http.get<Novel[]>(`${'/api/novel/get/allNovels'}`)
  }

  updateNovel(NovelObj: Novel, id: number): Observable<Novel>{
    return this.http.put<Novel>(`${'/api/novel/put/novel'}/${id}`, NovelObj )
  }

  deleteNovel(id: number): Observable<Novel>{
    return this.http.delete<Novel>(`${'/api/novel/delete/novels'}/${id}` )
  }

  getNovelById(id: number): Observable<Novel>{
    return this.http.get<Novel>(`${'/api/novel/get/novelById'}/${id}` )
  }
}
