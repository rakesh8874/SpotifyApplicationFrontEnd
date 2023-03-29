import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userservice:UserService, private snak:MatSnackBar, private fb:FormBuilder){}


  signInForm = this.fb.group({
    username:['',[Validators.required]],
    password:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]],
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required, Validators.minLength(2)]],
    email:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]],
    contactNo:['',[Validators.required,Validators.pattern(/^[789]\d{9}$/)]]
  })

  get username(){
    return this.signInForm.get('username');
  }

  get password(){
    return this.signInForm.get('password');
  }

  get firstName(){
    return this.signInForm.get('firstName');
  }

  get lastName(){
    return this.signInForm.get('lastName');
  }
get email(){
    return this.signInForm.get('email');
  }
  get contactNo(){
    return this.signInForm.get('contactNo');
  }

  onSubmit(){
    console.log(this.signInForm.value);
     this.userservice.addUser(this.signInForm.value).subscribe((data)=>{
      console.log(data);
       Swal.fire("Success", "User Registred Successfully","success");
     }, (error)=>{
      this.snak.open("Something went Wrong !!", "Ok",{
        duration:3000,
      });
     })  
      
  }
}
