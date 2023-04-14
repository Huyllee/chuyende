import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UserDataService } from './Services/user-data.service';
import { User } from './Model/users';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chuyen_de';
  user!: User;
  users!: User[];
  isAdmin = false;

  constructor(private userService: UserDataService, private router: Router, private activatedRoute: ActivatedRoute) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkPath(event.url)
      }
    });

  }

  checkPath(url: string) {
    switch(true) {
      case url === '/admin' || url.startsWith('/admin'):
        this.isAdmin = true;
        break;
      // case url === '/' || url.startsWith('/tag') || url === '/search' || url.startsWith('/search'):
      //   this.showBanner = true;
      //   this.showFooter = true;
      //   break;
      // case url === '/login' || url.startsWith('/login'):
      //   this.showFooter = false;
      //   this.showBanner = false;
      //   break;
      // case url === '/register'|| url.startsWith('/register'):
      //   this.showBanner = false;
      //   this.showFooter = false;
      //   break;
      // default:
      //   this.showBanner = false;
      //   this.showFooter = true;
      //   break;
    }
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
