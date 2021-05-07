import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { reducer, userdetailsFeatureKey } from '../state/reducers/user.reducer';
import { EntryRoutingModule } from './entry-routing.module';
import { EntryComponent } from './entry.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [SignUpComponent, LoginComponent, EntryComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    EntryRoutingModule,
    StoreModule.forFeature(userdetailsFeatureKey, reducer),
  ],
  providers: [],
})
export class EntryModule {}
