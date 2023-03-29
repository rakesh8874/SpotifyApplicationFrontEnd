import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public loggedIn:boolean = false;

  constructor(private login:UserService){}

ngOnInit(): void {
   this.loggedIn = this.login.isLoggedIn();
}

logoutuser(){
  this.login.logout();
  location.reload();
}



}
