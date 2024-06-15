import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import Swal from 'sweetalert2';

// ngForm
@Component({
  selector: 'app-update-unit',
  templateUrl: './update-unit.component.html',
  styleUrls: ['./update-unit.component.css']
})
export class UpdateUnitComponent implements OnInit{
  constructor(private fleetService: FleetService, private router:Router, private route: ActivatedRoute){}

  rental: any = [];
  id: number = 0;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.fleetService.getRental(this.id).subscribe(res => {

        if(res['status']=='success'){
          const rentData = res!['data']!['rental'];
          this.rentalForm?.setValue({
            make: rentData['make'],
            model: rentData['model'],
            type: rentData['type'],
            daily_cost: rentData['daily_cost'],
            weekly_cost: rentData['weekly_cost'],
            status: rentData['status']
          })
        }
      })
    }
  }
  @ViewChild('rentalForm')rentalForm?:NgForm;

  updateRental(oForm: NgForm){
    this.fleetService.updateFleet(this.id, oForm.value).subscribe(res =>{
      if(res['status']=='success'){
        Swal.fire({
          icon: 'success',
          title: 'Successfully Updated'
        });
        this.router.navigateByUrl('/Administrator');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Unable to Modify'
        });
      }
    });
  }
}
