import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FleetService } from 'src/app/services/fleet.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  constructor(private fleetService: FleetService, private http: HttpClient){}
  
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
