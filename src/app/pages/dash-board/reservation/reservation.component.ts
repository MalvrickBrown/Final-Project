import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/app-services/auth.service';
import { FleetService } from 'src/app/services/fleet.service';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  constructor (private reservationService: ReservationService, private fleetService: FleetService, 
  private router: Router, private route: ActivatedRoute, private authService: AuthService){}
  
  userId: any = [];
  users: any = [];
  
  // To retrieve data of selected vehicle
  id: number = 0;
  rental: any = [];


  rentals:any = [];
  makeRes = [];

  ngOnInit(): void {
    this.fetchRentals();
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.fleetService.getRental(this.id).subscribe(res => {
        if(res['status']== 'success'){
          this.rentals = res['data']['rental'];
          // this.rentalForm?.setValue({
          //   model: this.rentals['model']
          // })
        }
      })
    }
    this.fetchUserProfile();
  }

  @ViewChild('rentalForm')rentalForm?:NgForm;

  formObj:any = [];
  keys:any = [];


  // Function to insert reservaion information in the user_reservation table
  bookingRental(oForm: NgForm){

    console.log(oForm.value)
    this.id = this.route.snapshot.params['id'];

      oForm.value.id = this.id;
      
      oForm.value.user_id = this.users.id;

      oForm.value.first_name = this.users.first_nm;
      oForm.value.last_name = this.users.last_nm;
      oForm.value.license_number = this.users.license_nbr;
      oForm.value.phone_nbr = this.users.phone_number;
      this.formObj = oForm.value;

      console.log(this.users);        

    this.reservationService.makeBooking(this.formObj).subscribe(res =>{
      if(res['status']=='success'){
        Swal.fire({
          icon: 'success',
          title: 'REGISTRATION SUCCESSFUL',
        });
        this.fleetService.availableRental(this.id, this.formObj).subscribe(res => {});
        this.reservationService.autoUpdateCustomers(this.formObj).subscribe(res => {
          this.router.navigateByUrl('/Rental-Fleet');
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Failed to Register'
        })
      }
    })
  }
  // Fetch user profile
  fetchUserProfile(){
    console.log('fetching:' + localStorage.getItem('tokenKey'))
    this.authService.getThisUser().subscribe(res =>{
      if(res['status']== 'success'){
        this.users = res['data']['user'];
      }
    })
  }
  
  // Fetch Information of rentals
  fetchRentals(){
    this.fleetService.getRentals().subscribe(res => {
      if(res['status']== 'success'){
        this.rentals = res['data']['rentals'];
      }
    });
  }
}
