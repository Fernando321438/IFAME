import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"],
})
export class ForgotPasswordPage implements OnInit {
  email: any;
  constructor(
    public afAuth: AngularFireAuth,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  reset() {
    if (this.email) {
      this.afAuth
        .sendPasswordResetEmail(this.email)
        .then((r) => {
          console.log("Email Reset");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  async logout() {
    await this.afAuth.signOut();
    this.router.navigateByUrl("/login-register");
  }
}
