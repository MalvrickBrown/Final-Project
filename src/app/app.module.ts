import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/partials/header/header.component';
import { FooterComponent } from './pages/partials/footer/footer.component';
import { HomeComponent } from './pages/home/home/home.component';
import { FleetComponent } from './pages/rental-fleet/fleet/fleet.component';
import { AboutUsComponent } from './pages/about-us/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us/contact-us.component';
import { AuthComponent } from './pages/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './pages/logout/logout.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { ReservationComponent } from './pages/dash-board/reservation/reservation.component';
import { RentalComponent } from './pages/rental-fleet/rental/rental.component';
import { CreateUnitComponent } from './pages/dash-board/create-unit/create-unit.component';
import { UpdateUnitComponent } from './pages/dash-board/update-unit/update-unit.component';
import { RemoveUnitComponent } from './pages/dash-board/remove-unit/remove-unit.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { AllReservationComponent } from './pages/admin-reservations/all-reservation/all-reservation.component';
import { UpdateReservationComponent } from './pages/admin-reservations/update-reservation/update-reservation.component';
import { TokenInterceptor } from './shared/utils/token.interceptor';
import { RemoveReservationComponent } from './pages/admin-reservations/remove-reservation/remove-reservation.component';
import { MyHighLightDirective } from './pages/rental-fleet/rental/my-high-light.directive';
import { ViewReservationComponent } from './pages/admin-reservations/view-reservation/view-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FleetComponent,
    AboutUsComponent,
    ContactUsComponent,
    AuthComponent,
    LogoutComponent,
    DashBoardComponent,
    ReservationComponent,
    RentalComponent,
    CreateUnitComponent,
    UpdateUnitComponent,
    RemoveUnitComponent,
    RegisterUserComponent,
    AllReservationComponent,
    UpdateReservationComponent,
    RemoveReservationComponent,
    MyHighLightDirective,
    ViewReservationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }