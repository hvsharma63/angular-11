import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CdkTableModule } from '@angular/cdk/table';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { EntryModule } from './entry/entry.module';
import { UserportalModule } from './user-portal/user-portal.module';
import { reducers, metaReducers } from '../app/state/reducers';
import { environment } from '../environments/environment';
import { MatSortModule } from '@angular/material/sort';
import { UserEffectsBlog } from './state/efffects/user-blog.effects';
import { Authguard } from './shared/services/canactivate.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    UserportalModule,
    EntryModule,
    NgbModule,
    CdkTableModule,
    MatSortModule,
    ReactiveFormsModule,

    SimpleNotificationsModule.forRoot({
      position: ['top', 'right'],
    }),
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserEffectsBlog]),
  ],
  providers: [Authguard, NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
