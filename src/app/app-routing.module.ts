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

const routes: Routes = [
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

  { path: 'admin-novel-detail/:id', component: NovelDetailAdminPageComponent },
  { path: 'admin/users', component: UsersAdminPageComponent },
  { path: 'admin-create-novel', component: CreateNovelsPageComponent },
  { path: 'admin-update-novel/:id', component: CreateNovelsPageComponent },
  { path: 'admin', component: DashboardPageComponent },
  { path: 'admin/novels', component: NovelAdminPageComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
