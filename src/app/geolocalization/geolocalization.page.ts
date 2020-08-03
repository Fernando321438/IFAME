import { Component } from '@angular/core';
import { CalculateService } from '../services/calculate.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from "@angular/fire/storage";
import * as firebase from 'firebase/app';
import { Artist, ArtistService } from "../services/artist.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-geolocalization',
  templateUrl: 'geolocalization.page.html',
  styleUrls: ['geolocalization.page.scss'],
})
export class GeolocalizationPage {

  location_distance: any ;
  destination_address: any ;
  origin_address: any ;
  travel_duration: any ;
  location: any ;
  
  constructor(
    private calculateService : CalculateService,
    private http: HttpClient,
    public  afAuth: AngularFireAuth,
    private toastCtrl: ToastController, 
    private afs: AngularFireStorage, 
    private auth: AngularFireAuth, 
    private artistService: ArtistService, 
    private afstore: AngularFirestore, 
    private authObj: AngularFireAuth,
    private readonly router: Router) {
    

  }
  
 

  ngOnint(){
    this.reset();
  }

  reset(){
    this.location_distance=null;
    this.destination_address=null;
    this.origin_address=null;
    this.travel_duration=null;
    this.location=null;
  }

  async changeDistance(location: string)
  {



      var results = await this.calculateService.calDistance('jabalpur',location)
      results.subscribe(res=>{
      console.log(res)
      this.location_distance = res['rows']['0']['elements']['0']['distance']['text'];
      this.destination_address = res['destination_addresses'];
      this.origin_address = res['origin_addresses'];
      this.travel_duration = res['rows']['0']['elements']['0']['duration']['text'];
    
    }); 
  }
  

  async changeLocation(){
    await this.calculateService.getCurrentLoc();
  }
  async logout(){
    await this.authObj.signOut();
    this.router.navigateByUrl('/view-artist');
  }
}