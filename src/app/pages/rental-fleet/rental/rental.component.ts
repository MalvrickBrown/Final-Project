import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  constructor ( private fleetService: FleetService, private route: ActivatedRoute ){

  }
  ngOnInit(): void {
    this.fetchRental();
  }
  id: number = 0;
  rental: any;
  hasData: boolean = false;

  // Function that call a single rental
  fetchRental(){
    this.id = this.route.snapshot.params['id'];
    this.fleetService.getRental(this.id).subscribe(res =>{
      if(res['status'] !== 'error'){
        this.rental = res['data']['rental'];
        this.hasData = true;
      }else{
        this.hasData = false;
      }
    });
  }
}