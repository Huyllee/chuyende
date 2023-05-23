import { Injectable } from '@angular/core';
import { Categories, Novel, chaptersById, newNovel, volumes } from '../Model/novel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../Model/users';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { IUserLogin } from '../Model/users';
import { NgToastService } from 'ng-angular-popup';

const USER_KEY = 'User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  // responseType: 'text' as const
};
@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  private userSubject = new BehaviorSubject<User>(this.getUserToLocalStogare());
  public userObservable:Observable<User>;

  constructor(private http: HttpClient, private storage: AngularFireStorage, private toastService: NgToastService,) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>('/api/users/login-admin', userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStogare(user);
          this.userSubject.next(user);
          this.toastService.success({ detail: "Success", summary: "Đăng nhập thành công", duration: 3000 });
          console.log(user);
        },
        error: (errorResponse) => {
          this.toastService.error({ detail: errorResponse.error, summary: 'Đăng nhập thất bại', duration: 3000 });
        }
      })
    );
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStogare(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserToLocalStogare():User{
    const userJson = localStorage.getItem(USER_KEY)
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

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

  getChapters(): Observable<chaptersById[]> {
    return this.http.get<chaptersById[]>(`/api/novel/get/chapters`);
  }

  postChapter(ChapterObj: chaptersById): Observable<chaptersById> {
    return this.http.post<chaptersById>(`${'/api/novel/post/newChapter'}`, ChapterObj, httpOptions )
  }

  getChapterById(id: number): Observable<chaptersById> {
    return this.http.get<chaptersById>(`/api/novel/get/chapterById/${id}`);
  }

  updateChapter(ChapterObj: chaptersById, id: number): Observable<chaptersById>{
    return this.http.put<chaptersById>(`${'/api/novel/put/chapter'}/${id}`, ChapterObj, httpOptions )
  }

  deleteChapter(id: string): Observable<chaptersById>{
    return this.http.delete<chaptersById>(`${'/api/novel/delete/chapter'}/${id}`, httpOptions )
  }


  getNovelImage(path: string): Observable<string> {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }
}
