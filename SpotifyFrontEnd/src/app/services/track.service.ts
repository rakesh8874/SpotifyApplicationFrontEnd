import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  
  url = "http://localhost:8085/musicService/getallmusic";

  constructor(private http:HttpClient) { }

  //method to get all songs

  public allSongs(){
    return  this.http.get(this.url);
  }

}
