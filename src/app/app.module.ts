import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';

import { EditorModule } from '@tinymce/tinymce-angular';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Layouts/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './Layouts/footer/footer.component';
import { HomePageComponent } from './Users/home-page/home-page.component';
import { ScrollToTopComponent } from './Layouts/scroll-to-top/scroll-to-top.component';
import { NovelPageComponent } from './Users/novel-page/novel-page.component';
import { ProfilePageComponent } from './Users/profile-page/profile-page.component';
import { NovelDetailPageComponent } from './Users/novel-detail-page/novel-detail-page.component';
import { SearchPageComponent } from './Users/search-page/search-page.component';
import { CategoryPageComponent } from './Users/category-page/category-page.component';
import { NovelCreationPageComponent } from './Users/Dashboard/novel-creation-page/novel-creation-page.component';
import { DiscussionPageComponent } from './Users/discussion-page/discussion-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
    ScrollToTopComponent,
    NovelPageComponent,
    ProfilePageComponent,
    NovelDetailPageComponent,
    SearchPageComponent,
    CategoryPageComponent,
    NovelCreationPageComponent,
    DiscussionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    CarouselModule,
    FormsModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
