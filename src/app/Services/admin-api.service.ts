import { Injectable } from '@angular/core';
import { Novel, newNovel } from '../Model/novel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  // responseType: 'text' as const
};
@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient) { }

  postNovel(NovelObj: Novel): Observable<Novel> {
    return this.http.post<Novel>(`${'/api/novel/post/newNovel'}`, NovelObj, httpOptions )
  }

  getNovel(): Observable<Novel[]>{
    return this.http.get<Novel[]>(`${'/api/novel/get/allNovels'}`)
  }

  updateNovel(NovelObj: Novel, id: number): Observable<Novel>{
    return this.http.put<Novel>(`${'/api/novel/put/novel'}/${id}`, NovelObj, httpOptions )
  }

  deleteNovel(id: string): Observable<Novel>{
    return this.http.delete<Novel>(`${'/api/novel/delete/novel'}/${id}`, httpOptions )
  }

  getNovelById(id: number): Observable<Novel>{
    return this.http.get<Novel>(`${'/api/novel/get/novelById'}/${id}` )
  }
}
