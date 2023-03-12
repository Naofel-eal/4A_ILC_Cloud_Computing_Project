import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { ResearchComponent } from './research/research.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: "Bula - Home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', title: "Bula - Sign up", component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', title: "Bula - Sign in", component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'topic/:hashtag', component: TopicPageComponent, canActivate: [AuthGuard] },
  { path: 'research', component: ResearchComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }