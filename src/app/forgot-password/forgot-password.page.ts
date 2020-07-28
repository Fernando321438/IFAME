import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: any;
  constructor(
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  reset() {
    if (this.email) {
      this.auth.sendPasswordResetEmail(this.email).then((r) => {
        console.log("Email Reset");
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
