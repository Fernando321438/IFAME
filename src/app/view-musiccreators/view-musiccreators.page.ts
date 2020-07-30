import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-view-musiccreators',
  templateUrl: './view-musiccreators.page.html',
  styleUrls: ['./view-musiccreators.page.scss'],
})
export class ViewMusiccreatorsPage implements OnInit {

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
