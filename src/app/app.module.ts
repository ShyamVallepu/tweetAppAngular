import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TweetComponent } from './tweet/tweet.component';
import { UserComponent } from './user/user.component';
import { ChangePasswordComponent } from './main-page/change-password/change-password.component';
import { HeaderBarComponent } from './main-page/header-bar/header-bar.component';
import { LikesComponent } from './main-page/likes/likes.component';
import { RetweetsComponent } from './main-page/retweets/retweets.component';
import { TweetsComponent } from './main-page/tweets/tweets.component';
import { UpdateTweetComponent } from './main-page/update-tweet/update-tweet.component';
import { UsersComponent } from './main-page/users/users.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { PostService } from './service/PostService';
import { UserService } from './service/UserService';
import { AuthGuard } from './shared/auth.guard';
import { AuthInterceptor } from './shared/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    MainPageComponent,
    TweetComponent,
    UserComponent,
    ChangePasswordComponent,
    HeaderBarComponent,
    LikesComponent,
    RetweetsComponent,
    TweetsComponent,
    UpdateTweetComponent,
    UsersComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    Ng2SearchPipeModule,
    MatIconModule
  ],

  providers: [UserService,AuthGuard,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },PostService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
