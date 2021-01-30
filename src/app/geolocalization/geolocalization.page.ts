/* import { Component } from "@angular/core";
import { CalculateService } from "../services/calculate.service";
import { HttpClient } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from "@angular/fire/storage";
import * as firebase from "firebase/app";
import { Artist, ArtistService } from "../services/artist.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-geolocalization",
  templateUrl: "geolocalization.page.html",
  styleUrls: ["geolocalization.page.scss"],
})
export class GeolocalizationPage {
  location_distance: any;
  destination_address: any;
  origin_address: any;
  travel_duration: any;
  location: any;

  constructor(
    private calculateService: CalculateService,
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private afs: AngularFireStorage,
    private auth: AngularFireAuth,
    private artistService: ArtistService,
    private afstore: AngularFirestore,
    private authObj: AngularFireAuth,
    private readonly router: Router
  ) {}

  ngOnint() {
    this.getDirection();

  }

  public lat = 24.799448;
public lng = 120.979021;
 
public origin: any;
public destination: any;
 

 
getDirection() {
  this.origin = { lat: 24.799448, lng: 120.979021 };
  this.destination = { lat: 24.799524, lng: 120.975017 };
 
  // Location within a string
  // this.origin = 'Taipei Main Station';
  // this.destination = 'Taiwan Presidential Office';
}

  async logout() {
    await this.authObj.signOut();
    this.router.navigateByUrl("/view-artist");
  }
}
 */