import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastController } from "@ionic/angular";
import { AngularFireStorage } from "@angular/fire/storage";
import {
  MusiccreatorsService,
  Musiccreators,
} from "../services/musiccreators.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: "app-view-musiccreators",
  templateUrl: "./view-musiccreators.page.html",
  styleUrls: ["./view-musiccreators.page.scss"],
})
export class ViewMusiccreatorsPage implements OnInit {
  musiccreators: Musiccreators;
  musiccreatorsCurrent: any = {};
  dummyList: any[];

  constructor(
    private toastCtrl: ToastController,
    private musiccreatorsService: MusiccreatorsService,
    private activatedRoute: ActivatedRoute,
    private afstore: AngularFirestore,
    private readonly router: Router,
    private afDB: AngularFireDatabase,

    private authObj: AngularFireAuth
  ) {}
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.musiccreatorsService
        .getMusiccreators(id)
        .subscribe((musiccreators) => {
          this.musiccreators = musiccreators;
        });
    }
  }
  async Savedata() {
    if (
      this.musiccreatorsCurrent.Songname +
      this.musiccreatorsCurrent.Textsongname +
      this.musiccreatorsCurrent.Textsongcomposer +
      this.musiccreatorsCurrent.Songwriter +
      this.musiccreatorsCurrent.Producer
    ) {
      const datages = {
        Songname: this.musiccreatorsCurrent.Songname,
        Genres: this.musiccreatorsCurrent.Genres,
        Textsongcomposer: this.musiccreatorsCurrent.Textsongcomposer,
        Textsongname: this.musiccreatorsCurrent.Textsongname,
        Songwriter: this.musiccreatorsCurrent.Songwriter,
        Producer: this.musiccreatorsCurrent.Producer,
        Labels: this.musiccreatorsCurrent.Labels,
      };

      const artistFire1 = this.afstore.collection("music-creators");
      const artistFire2 = artistFire1.ref.doc(
        (await this.authObj.currentUser).uid
      );
      artistFire2
        .collection("Song-Information")
        .doc("/" + this.musiccreatorsCurrent.Songname)
        .set(datages)
        .then(
          () => {
            this.showToast("Datas Added");
          },
          (err) => {
            this.showToast("Datas Not Added");
          }
        )
        .catch((e) => {
          console.log(e);
        });
    } else {
      this.showToast("Empty Data Field ");
    }
  }
  doRefresh(event) {
    console.log("Pull Event Triggered!");
    setTimeout(() => {
      this.dummyList = Array(10);
      event.target.complete();
    }, 2000);
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
    await this.authObj.signOut();
    this.router.navigateByUrl("/login-register");
  }
}
