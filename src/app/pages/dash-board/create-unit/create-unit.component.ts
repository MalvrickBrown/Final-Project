import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.css']
})
export class CreateUnitComponent implements OnInit {
  constructor(private fleetService: FleetService, private router:Router) { }
  ngOnInit(): void {
    
  }
  
  submitForm(oform: HTMLFormElement){
    const form = new FormData(oform)
      const addsub = this.fleetService.addToFleet(form).subscribe ((res) =>{
        if(res['status'] == 'success'){
          Swal.fire({
            icon: 'success',
            title: 'REGISTRATION SUCCESSFUL'
          });
          this.router.navigateByUrl('/Rental-Fleet');
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Failed to Add Unit'
          })
        }
    })
  }
}