import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remove-unit',
  templateUrl: './remove-unit.component.html',
  styleUrls: ['./remove-unit.component.css']
})
export class RemoveUnitComponent implements OnInit {
  constructor (private fleetService:FleetService, private router:Router, private route:ActivatedRoute){}

  rental: any = [];
  id: number = 0;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.fleetService.getRental(this.id).subscribe(res =>{
        if(res['status']=='success'){
          const rentData = res!['data']!['rental']
          this.rentalForm?.setValue({
            make: rentData['make'],
            model: rentData['model'],
            type: rentData['type'],
            daily_cost: rentData['daily_cost'],
            weekly_cost: rentData['weekly_cost'],
            status: rentData['status']
          });
        }
      });
    }
  }
  @ViewChild('rentalForm')rentalForm?:NgForm;

  deleteRental(oForm: NgForm){
    this.fleetService.removeRental(this.id).subscribe(res => {

      if(res['status']=='success'){
        Swal.fire({
          icon: 'success',
          title: 'Successfully Removed Rental',
        });
        this.router.navigateByUrl('/Administrator')
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Failed to Remove Rental'
        });
      }
    });
  }
}
