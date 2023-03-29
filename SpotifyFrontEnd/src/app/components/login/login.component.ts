import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaylistService } from 'src/app/services/playlist.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private login: UserService, private snak: MatSnackBar, private playlist:PlaylistService) { }

  resData:any;
  user:any;
  plylistName:any;

  loginForm = this.fb.group({
    username: ['',[Validators.required]],   
    password: ['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]]   
  })

  // getters for form field

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  // login method

  onSubmit(){
    console.log(this.loginForm.value);
    this.login.loginCheck(this.loginForm.value).subscribe(
      data => {
        console.log(data);
        this.resData = data;
        this.login.loginUser(this.resData.token);
         Swal.fire("Success", "User Logged In Successfully", 'success');
        this.login.getCurrentUser().subscribe(
          res=>{
            console.log(res);
            this.user = res;
           localStorage.setItem("username",this.user.username);
          }
        )
        this.playlist.availablePlaylist().subscribe(
          res=>{
            console.log(res);
            this.plylistName = res;
            for(let play of this.plylistName){
              localStorage.setItem('playlistName',play.playlistName);
              }
          }
        )
      },
      error => {
        this.snak.open("Something went Wrong !!", "Ok", {
          duration: 3000,
        }
        )
      }
    )
  }
  
   
}
