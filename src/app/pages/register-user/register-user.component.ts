import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/app-services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit{

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    
  }
  newUser(oForm: NgForm){
    this.authService.registerUser(oForm.value).subscribe(res => {
      if(res['status']== 'success'){
        Swal.fire({
          icon: 'success',
          title: 'Successfully Registered',
        });
        this.router.navigateByUrl('/Rental-Fleet');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Failed to Register'
        });
      }
    });
  }
}