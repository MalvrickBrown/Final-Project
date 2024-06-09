import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-services/auth.service';
import { FleetService } from 'src/app/services/fleet.service';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {
  constructor( private authService: AuthService, private fleetService: FleetService ) {}
  
  rentals: any = [];

  ngOnInit(): void {
    this.fetchRentals();
  }

  
  
  fetchRentals(){
    this.fleetService.getRentals().subscribe(res => {
      if(res['status']== 'success'){
        this.rentals = res['data']['rentals'];
      }
    });
  }
}
