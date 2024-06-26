import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/app-services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor( private authService: AuthService, private route: ActivatedRoute ){}

  users: any = [];
  id: number = 0;
  
  ngOnInit(): void {
    // this.authService.logout();
    this.fetchUserProfile();
  }

  fetchUserProfile(){
    console.log('fetching:' + localStorage.getItem('tokenKey'))
    this.authService.getThisUser().subscribe(res =>{
      if(res['status']== 'success'){
        this.users = res['data']['user'];
      }
    })
  }
  
}
