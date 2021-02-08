import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { NavController } from "@ionic/angular";
import { AngularFireDatabase } from "@angular/fire/database";

import "firebase/firestore";
import { ArtistService, Artist } from "../services/artist.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-registration",
  templateUrl: "./registration-artist.page.html",
  styleUrls: ["./registration-artist.page.scss"],
})
export class RegistrationArtistPage implements OnInit {
  artists: any = {};
  Artist = {
    Typeartist: "",
    Name: "",
    Surname: "",
    Alias: "",
    Id_work: "",
    Phone_Number: "",
    Genres: "",
    Royalties: "",
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public authService: AuthService,
    public router: Router,
    public afs: AngularFirestore,
    private artistService: ArtistService,
    private toastCtrl: ToastController,
    private afDB: AngularFireDatabase,
    private authObj: AngularFireAuth,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.artistService.getArtist(id).subscribe((artist) => {
        this.artists = artist;
      });
    }
  }

  signUp() {
    if (
      this.artists.email &&
      this.artists.password &&
      this.artists.validatepassword === this.artists.password &&
      this.artists.typeartist &&
      this.artists.name &&
      this.artists.surname &&
      this.artists.alias &&
      this.artists.id_work &&
      this.artists.Phone_Number &&
      this.artists.genres &&
      this.artists.royalties
    ) {
      this.authObj
        .createUserWithEmailAndPassword(
          this.artists.email,
          this.artists.password
        )
        .then(async (ges) => {
          console.log(ges);

          const datages = {
            email: this.artists.email,
            Typeartist: this.artists.typeartist,
            Name: this.artists.name,
            Surname: this.artists.surname,
            Alias: this.artists.alias,
            Id_work: this.artists.id_work,
            Phone_Number: this.artists.Phone_Number,
            Genres: this.artists.genres,
            Royalties: this.artists.royalties,
            createdAt: Date.now(),
          };
          const userId = (await this.authObj.currentUser).uid;
          const artistFire1 = this.afs.collection("artist");
          await artistFire1.ref
            .doc(userId)
            .set(datages)
            .then(() => {
              this.router.navigateByUrl("/view-artist");
              this.showToast("artist added");
            })
            .catch((e) => {
              console.log(e);
            });
          console.log(userId);
        });
    } else {
      this.showToast(
        "The two passwords are not associated or has not been filled in some field"
      );
    }
  }
  validation() {
    if (
      this.artists.email != null &&
      this.artists.password != null &&
      this.artists.typeartist != null &&
      this.artists.name != null &&
      this.artists.surname != null &&
      this.artists.alias != null &&
      this.artists.id_work != null &&
      this.artists.Phone_Number != null &&
      this.artists.genres != null &&
      this.artists.royalties != null
      

    ) {
      if (this.artists.validatepassword === this.artists.password) {
        return true;
      } else {
        this.showToast("The two passwords are not associated");
        return false;
      }
    } else {
      this.showToast("Compilare tutti i campi");
      return false;
    }
  }

  deleteMusiccreators() {
    this.artistService.deleteArtist(this.artists).then(
      () => {
        this.router.navigateByUrl("/");
        this.showToast("artist deleted");
      },
      (err) => {
        this.showToast("Errore eliminazione dell_artista:(");
      }
    );
  }

  showToast(msg) {
    this.toastCtrl
      .create({
        message: msg,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }
  async logout() {
    await this.afAuth.signOut();
    this.router.navigateByUrl("/login-register");
  }
}
