import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { BulasCarouselComponent } from './shared/components/bulas-carousel/bulas-carousel.component';
import { CreateBulaComponent } from './shared/components/navbar/create-bula/create-bula.component';
import {AutosizeModule} from 'ngx-autosize';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { TopicsComponent } from './shared/components/navbar/topics/topics.component';
import { BulaPanelComponent } from './shared/components/bula/bula.panel/bula.panel.component';

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
    BulasCarouselComponent,
    CreateBulaComponent,
    TopicsComponent,
    BulaPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AutosizeModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  exports: [BulaContentFormatterDirective]
})
export class AppModule { }
