import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app-services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor( private authService: AuthService,
    private router: Router
  ){}
  ngOnInit(): void {
    //
  }

  hasError?: boolean;
  errMsg?: string;
  userRole?: string;

  onLogin2(oForm: NgForm){
    const logUsers = this.authService.loginUser(oForm.value).subscribe({
      next:
      (loginRes) =>{
        console.log(`loginRes>> ${loginRes}`)
        if(loginRes['status'] === 'success'){
          this.hasError = false;
          
          this.authService.authToken = loginRes['data']!['token'];
          this.authService.saveAuthToken();
          console.log(JSON.stringify(loginRes)); 
          
          this.userRole = loginRes['data']!['user']['role'];
          
          this.authService.getCurrentUser(() =>{
          this.authService.loginState = true;
          });
          if(this.userRole == 'USER'){
            this.router.navigateByUrl('/Rental-Fleet');
          }else if(this.userRole == 'ADMIN'){ // Change from else to else if to facilitate 'ADMIN role'.
            this.router.navigateByUrl('/Administrator');
          }
          // this.router.navigateByUrl('/login');
        }
      },
      error:
        (error) =>{
          console.log(error.error.message)
          this.hasError = true;
          this.errMsg = error.error['message']
  
          this.authService.loginState = false;
        },
      complete:
        () => {
          // check when the process is finished and do something
        }
    })
    
  }
}
