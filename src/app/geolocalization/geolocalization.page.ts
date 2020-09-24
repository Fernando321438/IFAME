import { Component } from "@angular/core";
import { CalculateService } from "../services/calculate.service";
import { HttpClient } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from "@angular/fire/storage";
import * as firebase from "firebase/app";
import { Artist, ArtistService } from "../services/artist.service";
import { AngularFirestore } from "@angular/fire/firestore";
declare var window: { app: { backgroundGeolocation: { start: () => void; stop: () => void; }; }; };
@Component({
  selector: "app-geolocalization",
  templateUrl: "geolocalization.page.html",
  styleUrls: ["geolocalization.page.scss"],
})
export class GeolocalizationPage {
 
  locations: any;

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
  ) {
    this.locations = [];
  }

  ngOnint() {
 
  }
 StartBackgroundTracking(){
    window.app.backgroundGeolocation.start();
  }
  
  StopBackgroundGeolocation(){
    window.app.backgroundGeolocation.stop();
  }
  GetLocations(){
    this.locations = (JSON.parse(localStorage.getItem("location"))==null)?[]:JSON.parse(localStorage.getItem("location"));
  }
  ClearLocations(){
    localStorage.removeItem("location");
    
  }
}
