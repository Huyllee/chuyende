import { Injectable } from '@angular/core';
import { Categories, Novel, newNovel, volumes } from '../Model/novel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/users';

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

  getNovelByGenre(id: number): Observable<Novel>{
    return this.http.get<Novel>(`${'/api/novel/get/novelWithGenre'}/${id}` )
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${'/api/users/get/users'}`)
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${'/api/users/get/userById'}/${id}` )
  }

  postUser(UserObj: User): Observable<User> {
    return this.http.post<User>(`${'/api/users/post/newUser'}`, UserObj, httpOptions )
  }

  updateUser(UserObj: User, id: number): Observable<User>{
    return this.http.put<User>(`${'/api/users/put/user'}/${id}`, UserObj, httpOptions )
  }

  deleteUser(id: string): Observable<User>{
    return this.http.delete<User>(`${'/api/users/delete/user'}/${id}`, httpOptions )
  }

  getGenre(): Observable<Categories[]>{
    return this.http.get<Categories[]>(`${'/api/novel/get/categories'}`)
  }

  postGenre(GenreObj: Categories): Observable<Categories> {
    return this.http.post<Categories>(`${'/api/novel/post/newGenre'}`, GenreObj, httpOptions )
  }

  getGenreById(id: number): Observable<Categories>{
    return this.http.get<Categories>(`${'/api/novel/get/genreById'}/${id}` )
  }

  updateGenre(GenreObj: Categories, id: number): Observable<Categories>{
    return this.http.put<Categories>(`${'/api/novel/put/genre'}/${id}`, GenreObj, httpOptions )
  }

  deleteGenre(id: string): Observable<Categories>{
    return this.http.delete<Categories>(`${'/api/novel/delete/genre'}/${id}`, httpOptions )
  }

  getVolumes(): Observable<volumes[]>{
    return this.http.get<volumes[]>(`${'/api/novel/get/volumes'}`)
  }

  postVolume(VolumeObj: volumes): Observable<volumes> {
    return this.http.post<volumes>(`${'/api/novel/post/newVolume'}`, VolumeObj, httpOptions )
  }

  getVolumeById(id: number): Observable<volumes>{
    return this.http.get<volumes>(`${'/api/novel/get/volumeById'}/${id}` )
  }

  updateVolume(VolumeObj: volumes, id: number): Observable<volumes>{
    return this.http.put<volumes>(`${'/api/novel/put/volume'}/${id}`, VolumeObj, httpOptions )
  }

  deleteVolume(id: string): Observable<volumes>{
    return this.http.delete<volumes>(`${'/api/novel/delete/volume'}/${id}`, httpOptions )
  }

}
