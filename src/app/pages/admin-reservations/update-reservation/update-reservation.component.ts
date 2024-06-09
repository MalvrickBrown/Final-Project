import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.css']
})
export class UpdateReservationComponent implements OnInit {
  constructor(private reservationService: ReservationService, private router: Router, 
    private route: ActivatedRoute
  ){}

  reservation: any = [];
  id: number = 0;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.reservationService.viewRentalBooking(this.id).subscribe(res => {
        
        if(res['status']== 'success'){
          const userRes = res!['data']!['reservation'];
          this.reservation = userRes;

          let startDate = JSON.stringify(userRes['start_date']);
          let endDate = JSON.stringify(userRes['end_date']);
          // formatDate(startDate, 'dd/mm/yyyy',"en-US");
          let newStartDate = new Date(startDate).toISOString().split('T')[0]
          let newEndDate = new Date(endDate).toISOString().split('T')[0]
          console.log(newStartDate)

          this.userForm?.setValue({
            start_date: newStartDate,
            end_date: newEndDate
          })
        }
      })
    }
  }
  @ViewChild('userForm')userForm?:NgForm;

  updateReservation(oForm: NgForm){
    this.reservationService.updateBooking(this.id, oForm.value).subscribe(res =>{
      if(res['status']=='success'){
        Swal.fire({
          icon: 'success',
          title: 'Successfully Updated'
        });
        this.router.navigateByUrl('/User-Reservations');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Unable to Modify'
        });
      }
    });
  }
}
