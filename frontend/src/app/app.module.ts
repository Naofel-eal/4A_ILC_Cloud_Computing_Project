import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BulaComponent } from './shared/components/bula/bula.component';
import { FormComponent } from './shared/components/Authentication/form/form.component';
import { BackgroundComponent } from './shared/components/background/background.component';
import { TrendComponent } from './home/trend/trend.component';
import { BulaContentFormatterDirective } from './shared/directives/bula-content-formatter.directive';
import { GsapComponent } from './gsap/gsap.component';
import { BulasCarouselComponent } from './shared/components/bulas-carousel/bulas-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    BulaComponent,
    FormComponent,
    BackgroundComponent,
    TrendComponent,
    BulaContentFormatterDirective,
    GsapComponent,
    BulasCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BulaContentFormatterDirective]
})
export class AppModule { }
