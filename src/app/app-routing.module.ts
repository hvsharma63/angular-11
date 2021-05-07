import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Authguard } from './shared/services/canactivate.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/entry/login',
    pathMatch: 'full'
  },
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./entry/entry.module').then((m) => m.EntryModule),
  // },
  {
    path: 'entry',
    loadChildren: () =>
      import('./entry/entry.module').then((m) => m.EntryModule),
  },
  // {
  //   path: 'sign-up',
  //   loadChildren: () =>
  //     import('./user-portal/user-portal.module').then(
  //       (m) => m.UserportalModule
  //     ),
  //  },
  {
    path: 'user-portal',
    loadChildren: () =>
      import('./user-portal/user-portal.module').then(
        (m) => m.UserportalModule
      ),
  },
  //  {
  //   path: '**',
  //   redirectTo:'/entry/login',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [Authguard],
})
export class AppRoutingModule { }
