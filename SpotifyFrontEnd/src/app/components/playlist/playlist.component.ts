import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaylistService } from 'src/app/services/playlist.service';
import { TrackService } from 'src/app/services/track.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  showPlaylist:boolean = false;

  playListDetails:any=[];

  playlistd:boolean = false;
  playlista:boolean = false;
  allSongs:any = [];

  songsIdAndName:any = [];

  addedSongs:any = [];

  plylistName:any;

  showSongs:boolean = false;
  showSongsA:boolean = false;
  song:boolean = false;
  
  constructor(private playlist:PlaylistService, private fb:FormBuilder, private snak: MatSnackBar, private songs:TrackService){}

  ngOnInit(): void {
    this.songs.allSongs().subscribe(
      data=>{
        this.songsIdAndName = data;
      }
    )
  }

  playlistform = this.fb.group({
    playlistName:['']
})

addSongForm = this.fb.group({
  trackName:['']
})

// method to Add Song into Playlist
addSongsInPlaylist(){
   this.playlist.addSongIntoPlaylist(this.addSongForm.value).subscribe(
    (data:any)=>{
      this.addedSongs = data;
      Swal.fire("Success", "Your Selected Song Has Been Added Into Your Playlist", 'success');
    },
    (error:any)=>{
      this.snak.open("Something went Wrong !!", "Ok", {
        duration: 3000,
      })
    }
   )
}

//Method For Showing playlist form
  showPlaylistForm(){
    if(this.showPlaylist==false){
      this.showPlaylist = true;
    }else{
      this.showPlaylist = false;
    }
  }
  //Method For Creating playlist
  generatePlaylist(){
     this.playlist.createPlaylist(this.playlistform.value).subscribe( 
      (data:any)=>{
        this.playListDetails = data;
        Swal.fire("Success", "Your Playlist Has been Created Successfully", 'success');
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
      (error:any)=>{
        this.snak.open("Something went Wrong !!", "Ok", {
          duration: 3000,
        })
      }
     )
  }
  //Method For Showing users playlist
  showPlaylists(){
    this.playlist.availablePlaylist().subscribe(
      (data:any)=>{
        this.playListDetails = data;
      },
      (error:any)=>{
        this.snak.open("Something went Wrong !!", "Ok", {
          duration: 3000,
        })
      }
    )
    if(this.playlistd==false){
      this.playlistd = true;
    }else{
      this.playlistd = false;
    }
  }
  //method for showing playlist to add songs
  addSongIntoPlaylist(){
    this.playlist.availablePlaylist().subscribe(
      (data:any)=>{
        this.playListDetails = data;
      },
      (error:any)=>{
        this.snak.open("Something went Wrong !!", "Ok", {
          duration: 3000,
        })
      }
    )
    if(this.playlista==false){
      this.playlista = true;
    }else{
      this.playlista = false;
    }
  }
  //  method for showing songs to add
  showSongsForm(){
    if(this.song==false){
      this.song = true;
    }else{
      this.song = false;
    }
  }

  //Method For Showing Songs Details To  Add into playlist 
  showSongsDetails(){
     this.songs.allSongs().subscribe(
      (data)=>{
        this.allSongs = data;
      }
     )
     if(this.showSongs==false){
      this.showSongs = true;
    }else{
      this.showSongs = false;
    }
  }
//Method For Show Songs Details To Play
  showSongsDetailsA(){
     this.playlist.getPlaylistSongs().subscribe(
      (data:any)=>{
        this.addedSongs = data;
      },
      (error:any)=>{
        this.snak.open("Wrong Playlist Name !!", "Ok", {
          duration: 3000,
        })
      }
     )
     if(this.showSongsA==false){
      this.showSongsA = true;
    }else{
      this.showSongsA = false;
    }
  }

  // method to delete selected playlist

  deleteSelectedPlaylist(){
    this.playlist.deletePlaylist().subscribe(
      (data:any)=>{
        Swal.fire('Success','Playlist Deleted Successfully', 'success');
        localStorage.removeItem('playlistName');
      },
      (error:any)=>{
        this.snak.open("Something went Wrong !!", "Ok", {
          duration: 3000,
        })
      }
    )
  }

  // method to delete selected song

  deleteSong(){
    this.playlist.deleteSongs().subscribe(
      (data:any)=>{
        Swal.fire('Success','Song Deleted Successfully', 'success');
      },
      (error:any)=>{
        this.snak.open("Something went Wrong !!", "Ok", {
          duration: 3000,
        })
      }
    )
  }

}
