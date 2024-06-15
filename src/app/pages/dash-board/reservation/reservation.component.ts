import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/app-services/auth.service';
import { FleetService } from 'src/app/services/fleet.service';
import { ReservationService } from 'src/app/services/reservation.service';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  constructor (private reservationService: ReservationService, private fleetService: FleetService, 
  private router: Router, private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder){}
  
  
  users: any = []; //Object for storing user profile information.
  
  id: number = 0;

  // To retrieve data of selected vehicle
  rentals:any = [];
  

  ngOnInit(): void {
    // this.fetchRentals();
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.fleetService.getRental(this.id).subscribe(res => {
        if(res['status']== 'success'){
          this.rentals = res['data']['rental'];
        }
      })
    }
    this.fetchUserProfile(); //Call function to fetch user profile
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
      this.users.email;
      this.rentals.make; //Recently Added
      this.rentals.model; //Recently Added
      this.formObj = oForm.value;

      console.log(this.users);        
    
    this.reservationService.makeBooking(this.formObj).subscribe(res =>{
      if(res['status']=='success'){
        Swal.fire({
          icon: 'success',
          title: 'REGISTRATION SUCCESSFUL',
        });
        this.fleetService.availableRental(this.id, this.formObj).subscribe(res => {});
        this.sendThisEmail(); //Calling function to send Email
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
  
  form: FormGroup = this.fb.group({
    from_name: this.users.first_nm,
    from_last_name: this.users.last_nm,
    to_name: 'On The Toll Rental',
    from_email: this.users.email,
    subject: 'Your Booking Information',
    from_fleet_make: this.rentals.make,
    from_fleet_model: this.rentals.model
    // to_date: '',
    // from_date: ''
  })

  async sendThisEmail(){
    emailjs.init('IXPk5Vl6_u5jEdsnB');
    let response = await emailjs.send("service_jx7cgm5","template_467l62o",{
      from_name: this.users.first_nm,
      from_last_name: this.users.last_nm,
      from_email: this.users.email,
      reply_to: "malvrickbrown16@gmail.com",
      subject: this.form.value.subject,
      from_fleet_make: this.rentals.make,
      from_fleet_model: this.rentals.model
      });
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
  
}
