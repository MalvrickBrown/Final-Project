import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit {
  constructor( private fleetService: FleetService, private reservationService: ReservationService, private route: ActivatedRoute ){}

  id: number = 0;
  reservation: any;

  ngOnInit(): void {
    this.fetchReservation();
  }

  fetchReservation(){
    this.id = this.route.snapshot.params['id'];
    this.reservationService.viewRentalBooking(this.id).subscribe(res =>{
      if(res['status'] !== 'error'){
        this.reservation = res['data']['reservation'];
      }
    });
  }
}
