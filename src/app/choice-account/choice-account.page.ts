import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choice-account',
  templateUrl: './choice-account.page.html',
  styleUrls: ['./choice-account.page.scss'],
})
export class ChoiceAccountPage implements OnInit {

  constructor(
    public  afAuth: AngularFireAuth,
    private readonly router: Router,) { }

  ngOnInit() {
  }
  async logout(){
    await this.afAuth.signOut();
    this.router.navigateByUrl('/login-register');
  }
}
