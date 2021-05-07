import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPortalComponent } from './user-portal.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogComponent } from './blog/blog.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { UsersBlogComponent } from './users-blog/users-blog.component';
import { Authguard } from '../shared/services/canactivate.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: UserPortalComponent,
    // canActivate: [Authguard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'add-blog',
        component: AddBlogComponent,
      },
      {
        path: 'profile-details',
        component: ProfileDetailsComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'users-blog',
        component: UsersBlogComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserportalRoutingModule { }
