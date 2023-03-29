import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaymusicComponent } from './components/playmusic/playmusic.component';
import { SignupComponent } from './components/signup/signup.component';
import { TrackManagerComponent } from './components/track-manager/track-manager.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:TrackManagerComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:"full"
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'playlist',
    component:PlaylistComponent,
    pathMatch:'full',
    canActivate:[AuthGuard]
  },
  {
    path:'play',
    component:PlaymusicComponent,
    pathMatch:'full',
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    component:PageNotFoundComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
