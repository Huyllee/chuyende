import { Injectable } from '@angular/core';
import { Novel } from '../Model/novel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient) { }

  postNovel(NovelObj: Novel){
    return this.http.post<Novel>(`${'/api/novel/post/novels'}`, NovelObj )
  }

  getNovel(){
    return this.http.get<Novel[]>(`${'/api/novel/get/allNovels'}`)
  }

  updateNovel(NovelObj: Novel, id: number){
    return this.http.put<Novel>(`${'/api/novel/put/novels'}/${id}`, NovelObj )
  }

  deleteNovel(id: number){
    return this.http.delete<Novel>(`${'/api/novel/delete/novels'}/${id}` )
  }

  getNovelById(id: number){
    return this.http.get<Novel>(`${'/api/novel/get/novels'}/${id}` )
  }
}
