import { Component, OnInit} from '@angular/core';
import { TrackService } from 'src/app/services/track.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-track-manager',
  templateUrl: './track-manager.component.html',
  styleUrls: ['./track-manager.component.css']
})
export class TrackManagerComponent implements OnInit{

  constructor(private track:TrackService, private snak:MatSnackBar){}
  
    
  songsDetails:any = [];

  ngOnInit(): void {
        this.track.allSongs().subscribe(
          (song:any) => {
            this.songsDetails = song;
          },
          error =>{
                       this.snak.open("Something went Wrong !!", "Ok",{
                       duration:3000,
                   }
                 )
             }
        )
  }

}
