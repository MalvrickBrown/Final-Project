import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/app-services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor( private authService: AuthService, private route: ActivatedRoute){}

  users: any = [];
  id: number = 0;
  

  ngOnInit(): void {
    this.fetchUserProfile(); //Call user profile function on request of page.
  }

  // function to fetch Current Logged in user information and store it in users object
  fetchUserProfile(){
    this.id = this.route.snapshot.params['id'];
    console.log('fetching:' + localStorage.getItem('tokenKey'))
    this.authService.getThisUser().subscribe(res =>{
      if(res['status']== 'success'){
        this.users = res['data']['user'];
      }
    })
  }
}
