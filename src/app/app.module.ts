import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './utils/angular.material/angular.material.module';
import { DetailComponent } from './pages/detail/detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticateInterceptor } from './interceptors/authenticate.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { CarouselComponent } from './utils/carousel/carousel.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { FavoriteComponent } from './pages/favorite/favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    HomeComponent,
    NavbarComponent,
    CarouselComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    IvyCarouselModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
