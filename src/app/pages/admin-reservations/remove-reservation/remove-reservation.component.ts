import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remove-reservation',
  templateUrl: './remove-reservation.component.html',
  styleUrls: ['./remove-reservation.component.css']
})
export class RemoveReservationComponent implements OnInit {
  constructor( private reservationService: ReservationService, private router: Router, private route:ActivatedRoute){}

  reservation: any = [];
  id: number = 0;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.reservationService.viewRentalBooking(this.id).subscribe(res =>{
        if(res['status']== 'success'){
          const resData = res!['data']!['reservation']

          this.reservationForm?.setValue({
            first_name: resData['first_name'],
            last_name: resData['last_name'],
            license_number: resData['license_number'],
            phone_number: resData['phone_nbr'],
            start_date: resData['start_date'],
            end_date: resData['end_date']
          });
        }
      });
    }
  }
  @ViewChild('reservationForm')reservationForm?:NgForm;

  cancelReservation(oForm: NgForm){
    this.reservationService.removeReservation(this.id).subscribe(res =>{

      if(res['status']=='success'){
        Swal.fire({
          icon: 'success',
          title: 'Successfully Cancelled',
        });
        this.router.navigateByUrl('/User-Reservations')
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Failed to Cancel Reservation'
        })
      }
    });
  }
}
