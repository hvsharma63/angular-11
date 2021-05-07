import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogComponent } from './blog/blog.component';
import { EditprofileComponent } from './edit-profile/editprofile.component';
import { NavComponent } from './nav/nav.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { UserportalRoutingModule } from './user-portal-routing.module';
import { UserPortalComponent } from './user-portal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkTableModule } from '@angular/cdk/table';
import { UsersBlogComponent } from './users-blog/users-blog.component';
import { TableComponent } from './table/table.component';
import { MatSortModule } from '@angular/material/sort';
import { AppInterceptor } from '../shared/interceptors/app.interceptor';
import { SortPipe } from '../shared/pipes/sort.pipe';
import { userdetailsFeatureKey, reducer } from '../state/reducers/user.reducer';
import { CustomDirective } from '../shared/directives/custom.directive';

@NgModule({
  declarations: [
    AddBlogComponent,
    NavComponent,
    BlogComponent,
    UsersBlogComponent,
    EditprofileComponent,
    ProfileDetailsComponent,
    UserPortalComponent,
    SortPipe,
    CustomDirective,
    TableComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    CdkTableModule,
    ReactiveFormsModule,
    UserportalRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    StoreModule.forFeature(userdetailsFeatureKey, reducer),
    // EffectsModule.forFeature([UsersBlogEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
})
export class UserportalModule {}
