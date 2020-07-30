import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-view-crypto',
  templateUrl: './view-crypto.page.html',
  styleUrls: ['./view-crypto.page.scss'],
})
export class ViewCryptoPage implements OnInit {

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
