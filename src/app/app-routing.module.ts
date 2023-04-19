import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Users/home-page/home-page.component';
import { NovelPageComponent } from './Users/novel-page/novel-page.component';
import { NovelDetailPageComponent } from './Users/novel-detail-page/novel-detail-page.component';
import { ProfilePageComponent } from './Users/profile-page/profile-page.component';
import { SearchPageComponent } from './Users/search-page/search-page.component';
import { CategoryPageComponent } from './Users/category-page/category-page.component';
import { DiscussionPageComponent } from './Users/discussion-page/discussion-page.component';
import { NovelAdminPageComponent } from './Admin/novel-admin-page/novel-admin-page.component';
import { NovelDetailAdminPageComponent } from './Admin/novel-detail-admin-page/novel-detail-admin-page.component';
import { LoginPageComponent } from './Users/login-page/login-page.component';
import { RegisterPageComponent } from './Users/register-page/register-page.component';
import { UsersAdminPageComponent } from './Admin/users-admin-page/users-admin-page.component';
import { DashboardPageComponent } from './Admin/dashboard-page/dashboard-page.component';
import { CreateNovelsPageComponent } from './Admin/create-novels-page/create-novels-page.component';
import { CreateUsersPageComponent } from './Admin/create-users-page/create-users-page.component';
import { UserDeitailAdminPageComponent } from './Admin/user-deitail-admin-page/user-deitail-admin-page.component';
import { GenreAdminPageComponent } from './Admin/genre-admin-page/genre-admin-page.component';
import { CreateGenrePageComponent } from './Admin/create-genre-page/create-genre-page.component';
import { GenreDetailAdminPageComponent } from './Admin/genre-detail-admin-page/genre-detail-admin-page.component';
import { VolumeAdminPageComponent } from './Admin/volume-admin-page/volume-admin-page.component';
import { CreateVolumePageComponent } from './Admin/create-volume-page/create-volume-page.component';
import { ChaptersAdminPageComponent } from './Admin/chapters-admin-page/chapters-admin-page.component';
import { VolumeDetailAdminPageComponent } from './Admin/volume-detail-admin-page/volume-detail-admin-page.component';
import { CreateChapterPageComponent } from './Admin/create-chapter-page/create-chapter-page.component';
import { ChapterDetailAdminPageComponent } from './Admin/chapter-detail-admin-page/chapter-detail-admin-page.component';
import { PageNotFoundComponent } from './Users/page-not-found/page-not-found.component';

const routes: Routes = [
  /* route user */
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  { path: 'novel/:id', component: NovelPageComponent, pathMatch: 'full' },
  { path: 'novel-detail/:id', component: NovelDetailPageComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'search/:searchTerm', component: SearchPageComponent },
  { path: 'category', component: CategoryPageComponent },
  { path: 'category/:genre', component: CategoryPageComponent },
  { path: 'discussion', component: DiscussionPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {path: '**', component: PageNotFoundComponent},

  /* route admin */
  { path: 'admin', component: DashboardPageComponent },

  { path: 'admin/novels', component: NovelAdminPageComponent },
  { path: 'admin-novel-detail/:id', component: NovelDetailAdminPageComponent },
  { path: 'admin-create-novel', component: CreateNovelsPageComponent },
  { path: 'admin-update-novel/:id', component: CreateNovelsPageComponent },

  { path: 'admin/users', component: UsersAdminPageComponent },
  { path: 'admin-create-user', component: CreateUsersPageComponent },
  // { path: 'admin-update-user/:id', component: CreateUsersPageComponent },
  { path: 'admin-user-detail/:id', component: UserDeitailAdminPageComponent },

  { path: 'admin/genre', component: GenreAdminPageComponent },
  { path: 'admin-create-genre', component: CreateGenrePageComponent },
  { path: 'admin-update-genre/:id', component: CreateGenrePageComponent },
  { path: 'admin-genre-detail/:id', component: GenreDetailAdminPageComponent },

  { path: 'admin/volumes', component: VolumeAdminPageComponent },
  { path: 'admin-create-volume', component: CreateVolumePageComponent },
  { path: 'admin-update-volume/:id', component: CreateVolumePageComponent },
  { path: 'admin-volume-detail/:id', component: VolumeDetailAdminPageComponent },

  { path: 'admin/chapters', component: ChaptersAdminPageComponent },
  { path: 'admin-create-chapter', component: CreateChapterPageComponent },
  { path: 'admin-update-chapter/:id', component: CreateChapterPageComponent },
  { path: 'admin-chapter-detail/:id', component: ChapterDetailAdminPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
