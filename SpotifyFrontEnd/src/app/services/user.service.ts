import {  HttpClient, HttpHeaders} from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:8084/authUser"

  music_url = "http://localhost:8085/users"

  constructor(private http:HttpClient) { }

  // Method to add user

  public addUser(user:any){
  return  this.http.post(`${this.music_url}/register`,user);
  }
  
  public loginUser(token:any){
      localStorage.setItem('jwtTocken', token);
      return true;
  }

  // method to check user is login or not

  isLoggedIn(){
   let token = localStorage.getItem("jwtTocken");
       if(token == undefined || token == '' || token == null){
        return false;
       }else{
        return true;
       }
  }

  //method to logout user

  logout(){
    localStorage.removeItem('jwtTocken');
    localStorage.removeItem('username');
    localStorage.removeItem('playlistName');
    return true;
  }

  //method to login user

public loginCheck(login:any){
    return this.http.post(`${this.url}/login/`,login);
}

//method to get token

public getToken(){
  let tocken = localStorage.getItem('jwtTocken');
  console.log("Get Tocken "+tocken);
 }
 
 //method to get logged in user

 public getCurrentUser(){
  let httpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    Authorization :'Bearer '+localStorage.getItem('jwtTocken')
 });
 let requestOption= {headers:httpHeaders}
  return this.http.get(this.url+"/current-user", requestOption);
 }


}
