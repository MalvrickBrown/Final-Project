import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { FleetComponent } from './pages/rental-fleet/fleet/fleet.component';
import { AboutUsComponent } from './pages/about-us/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us/contact-us.component';
import { AuthComponent } from './pages/auth/auth.component';
import {GuardsGuard} from './shared/guards.guard'
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
import { RemoveReservationComponent } from './pages/admin-reservations/remove-reservation/remove-reservation.component';
import { ViewReservationComponent } from './pages/admin-reservations/view-reservation/view-reservation.component';
import { ProfileComponent } from './pages/user-profile/profile/profile.component';

const routes: Routes = [
  {path: 'Home', title: 'Home Page', component:HomeComponent, pathMatch: 'full'},
  {path: 'Rental-Fleet', title: 'Fleet', component:FleetComponent, canActivate: [GuardsGuard] },
  {path: 'rental/:id', title: 'Fleet Rental', component:RentalComponent, canActivate: [GuardsGuard]},

  {path: 'About-us', title: 'About Being On the Toll', component:AboutUsComponent},
  {path: 'Contact-Us', title: 'How to Reach Us', component:ContactUsComponent},

  {path: 'Register', title: 'Register Account', component:RegisterUserComponent},
  {path: 'login', title: 'Login to continue', component:AuthComponent},
  {path: 'logOut', title: 'Logout User', component:LogoutComponent},
  
  {path: 'addReservation/:id', title: 'Reservation', component:ReservationComponent},
  
  {path: 'Administrator', title: 'Dash Board', component:DashBoardComponent, canActivate: [GuardsGuard]},
  {path: 'Create-New-Unit', title: 'Addition to Fleet', component:CreateUnitComponent},
  {path: 'Update-Unit/:id', title: 'Updating Rental', component:UpdateUnitComponent},
  {path: 'Remove-Unit/:id', title: 'Removing Rental', component:RemoveUnitComponent},

  {path: 'User-Reservations', title: 'Reservations', component:AllReservationComponent, canActivate: [GuardsGuard] },
  {path: 'updateReservation/:id', title: 'Update User Reservation', component:UpdateReservationComponent},
  {path: 'removeReservation/:id', title: 'Cancel User Reservation', component:RemoveReservationComponent },
  {path: 'viewReservation/:id', title: 'View User Reservation', component:ViewReservationComponent},
  {path: 'userProfile/:id', title: 'User Profile', component:ProfileComponent, canActivate: [GuardsGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
