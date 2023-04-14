import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IUserLogin, IUserRegister, User } from '../Model/users';
import { HttpClient } from '@angular/common/http';


const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userSubject = new BehaviorSubject<User>(this.getUserToLocalStogare());

  public userObservable: Observable<User>;

  constructor(private http: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>('/api/users/login', userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStogare(user);
          this.userSubject.next(user);
          console.log(`Welcome to Food ${user.full_name}!`);
        },
        error: (errorResponse) => {
          throw new Error(errorResponse.error);
        }
      })
    );
  }

  register(userRegiser:IUserRegister):Observable<User> {
    return this.http.post<User>('/api/users/register', userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStogare(user);
          this.userSubject.next(user);
          console.log(`Welcome to register ${user.full_name}!`);
        },
        error: (errorResponse) => {
          throw new Error(errorResponse.error);
        }
      })
    )
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

  getUsersByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`/api/users/get/user/${email}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`/api/users/get/users`);
  }
}
