import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService{


  url = "http://localhost:8085/users";

  constructor(private http:HttpClient) { }

  // method to create to playlist
 
   createPlaylist(playlist:any){
    let httpHeaders=new HttpHeaders({
       Authorization :'Bearer '+localStorage.getItem('jwtTocken')
    });
    let requestOption= {headers:httpHeaders}
     return  this.http.post(`${this.url}/addUserPlaylist`,playlist,requestOption);
    }

    // method to fetch all playlist

    availablePlaylist(){
      let httpHeaders=new HttpHeaders({
        'Content-Type':'application/json',
        Authorization :'Bearer '+localStorage.getItem('jwtTocken')
     });
     let requestOption= {headers:httpHeaders}
      return this.http.get(`${this.url}/getAllPlaylist`, requestOption);
    }

    // method to get all playlist songs

    getPlaylistSongs(){
      let httpHeaders=new HttpHeaders({
        'Content-Type':'application/json',
        Authorization :'Bearer '+localStorage.getItem('jwtTocken')
     });
     let requestOption= {headers:httpHeaders}
     let playlistName = localStorage.getItem("playlistName");
      return this.http.get(`${this.url}/getAllMusicOfPlaylist/${playlistName}`, requestOption);
    }

    // method to add song in playlist

    addSongIntoPlaylist(songs:any){
      let httpHeaders=new HttpHeaders({
        Authorization :'Bearer '+localStorage.getItem('jwtTocken')
     });
     let requestOption= {headers:httpHeaders}
     let playlistName = localStorage.getItem("playlistName");
      return  this.http.post(`${this.url}/addSongIntoPlaylist/${playlistName}`,songs,requestOption);
     }
 
     //method for deleting playlist

     deletePlaylist(){
      let httpHeaders=new HttpHeaders({
        Authorization :'Bearer '+localStorage.getItem('jwtTocken')
     });
     let requestOption= {headers:httpHeaders}
     let playlistName = localStorage.getItem("playlistName");
      return  this.http.delete(`${this.url}/deletePlaylist/${playlistName}`, requestOption);
     }

     //method for deleting songs

    deleteSongs(){
      let songsName = window.prompt("Please Enter Song Name of which one want to delete");
      let httpHeaders=new HttpHeaders({
        Authorization :'Bearer '+localStorage.getItem('jwtTocken')
     });
     let requestOption= {headers:httpHeaders}
     let playlistName = localStorage.getItem("playlistName");
      return  this.http.delete(`${this.url}/deleteSongs/${playlistName}/${songsName}`, requestOption);
    }

}




