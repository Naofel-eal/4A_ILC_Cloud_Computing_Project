import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BulasCarouselComponent } from './shared/components/bulas-carousel/bulas-carousel.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: "Bula - Home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', title: "Bula - Sign up", component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', title: "Bula - Sign in", component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'profile/:userId', title: "Bula - Profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'test', component: BulasCarouselComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }