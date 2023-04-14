import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EditorModule } from '@tinymce/tinymce-angular';

import { NgToastModule } from 'ng-angular-popup';
import { NgConfirmModule } from 'ng-confirm-box';
import { FileUploadModule } from 'ng2-file-upload';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

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
import { DiscussionPageComponent } from './Users/discussion-page/discussion-page.component';
import { NovelAdminPageComponent } from './Admin/novel-admin-page/novel-admin-page.component';
import { NovelDetailAdminPageComponent } from './Admin/novel-detail-admin-page/novel-detail-admin-page.component';
import { DashboardPageComponent } from './Admin/dashboard-page/dashboard-page.component';
import { CategoriesListComponent } from './Layouts/categories-list/categories-list.component';
import { LoginPageComponent } from './Users/login-page/login-page.component';
import { RegisterPageComponent } from './Users/register-page/register-page.component';
import { NewLinesToParagraphsPipe } from './Layouts/new-lines-to-paragraphs.pipe';
import { UsersAdminPageComponent } from './Admin/users-admin-page/users-admin-page.component';
import { CreateNovelsPageComponent } from './Admin/create-novels-page/create-novels-page.component';
import { LimitToPipe } from './Layouts/limit-to.pipe';


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
    DiscussionPageComponent,
    NovelAdminPageComponent,
    NovelDetailAdminPageComponent,
    DashboardPageComponent,
    CategoriesListComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NewLinesToParagraphsPipe,
    UsersAdminPageComponent,
    CreateNovelsPageComponent,
    LimitToPipe
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
    EditorModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,
    MatCardModule,
    ReactiveFormsModule,

    NgToastModule,
    NgConfirmModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
