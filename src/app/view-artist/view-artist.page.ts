import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-view-artist',
  templateUrl: './view-artist.page.html',
  styleUrls: ['./view-artist.page.scss'],
})
export class ViewArtistPage implements OnInit {

  constructor(
    public  afAuth: AngularFireAuth,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }
  async logout(){
    await this.afAuth.signOut();
    this.router.navigateByUrl('/login-register');
  }
}
