import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './main-page/change-password/change-password.component';
import { HeaderBarComponent } from './main-page/header-bar/header-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TweetsComponent } from './main-page/tweets/tweets.component';
import { UpdateTweetComponent } from './main-page/update-tweet/update-tweet.component';
import { UsersComponent } from './main-page/users/users.component';
import { AuthGuard } from './shared/auth.guard';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'', component: UserComponent, pathMatch: 'full'},
  {path : "sign-in" , component: SignInComponent},
  {path : "sign-up" , component: SignUpComponent},
  {path : "forgotpw" , component: ForgotPasswordComponent},
  {path : "mainPage" , component: MainPageComponent, canActivate:[AuthGuard]},
  {path : "app-header-bar" , component: HeaderBarComponent, canActivate:[AuthGuard]},
  {path : "home" , component: MainPageComponent, canActivate:[AuthGuard]},
  {path : "tweets" , component: TweetsComponent, canActivate:[AuthGuard]},
  {path : "users" , component: UsersComponent, canActivate:[AuthGuard]},
  {path : "changePassword" , component: ChangePasswordComponent, canActivate:[AuthGuard]},
  {path : "logout" , component: UserComponent, canActivate:[AuthGuard]},
  {path : "updateTweet" , component: UpdateTweetComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
