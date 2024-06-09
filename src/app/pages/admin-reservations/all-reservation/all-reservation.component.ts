import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';


@Component({
  selector: 'app-all-reservation',
  templateUrl: './all-reservation.component.html',
  styleUrls: ['./all-reservation.component.css']
})
export class AllReservationComponent implements OnInit {
  constructor( private reservationService: ReservationService, _http: HttpClient ){}

  reservations: any = [];

  ngOnInit(): void {
    this.fetchallReservation();
  }
  
  fetchallReservation(){
    this.reservationService.getReservations().subscribe(res => {
      if(res['status']== 'success'){
        this.reservations = res['data']['reservations'];
      }
    });
  }
}
