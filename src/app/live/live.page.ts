import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { File } from "@ionic-native/file/ngx";
import { AngularFireStorage } from "@angular/fire/storage";
import * as firebase from 'firebase/app';
import { Artist, ArtistService } from "../services/artist.service";
import { AngularFirestore } from "@angular/fire/firestore";


@Component({
  selector: 'app-live',
  templateUrl: 'live.page.html',
  styleUrls: ['live.page.scss'],
})
export class LivePage {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService, 
    public  afAuth: AngularFireAuth,
    private toastCtrl: ToastController, 
    private media: Media, 
    private file: File, 
    private afs: AngularFireStorage, 
    private auth: AngularFireAuth, 
    private artistService: ArtistService, 
    private afstore: AngularFirestore, 
    private authObj: AngularFireAuth,
    private readonly router: Router) { }

  // CHANGE THE SERVER PORT TO YOUR SERVER ENV PORT!
  // THIS IS TEST USING LOCALHOST WITH PORT 5000 DEFINED INSIDE WEB SERVER
  // IN THIS APP WE ARE USING NODE JS SERVER
  SERVER_URL = 'http://localhost:8100';

  // ngIf UI Boolean 
  gotVid = false;
  songfailed = false;
  showInfo = false;
  is_firebase = false;

  // PUT YOUR Youtube API KEY!! Below
  apiKey: string = 'AIzaSyCgBpktoh39RCS4cunYdh-Rqx-IQxxqTq4';

  // Loading message
  loading ='';

  // Youtube Videos Holder
  firebasedata: any;

  // MAX results for Youtube fetch
  maxResults = 8;

  // Song Information from audd.io API
  
  status: string;
  artist: string;
  album: string;
  label: string;
  release_date: string;
  title: string;

  // AUDIO Binery Holder
  audio = '';

  // SAVE URL FROM NGModel (Form input)
  url = '';

  async search() {
    this.spinner.show();
    this.loading = "Getting Firebase Data!";
    let url = 'https://registrazione-utenti-2f9ed.firebaseio.com' + this.apiKey + '&part=snippet&q=' + this.artist + '&type=video&maxResults=' + this.maxResults;
    this.http.get(url).subscribe(res => {
      let firebaseio = JSON.parse(JSON.stringify(res));
      console.log(firebaseio.items);
      this.apiKey = firebaseio.items;
      this.gotVid = true;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.showToast("Error at featching youtube data!");
    });
  }

  check(url: string) {
    this.Is_firebase(url);
    if (this.url=null) { // se questo url non è presente nel database, allora entra nel ciclo (if) ,altrimenti entra nell'altro (else)
      this.showToast("Please input a firebase link");
    }
    else {
      this.showToast("Correct Link, Click Process Button To Begin");
    }
  }

  async process(url: any) {
    this.spinner.show();
    this.loading = "Processing Video, Please Wait!";
    await this.getBase64AudioServer(url)
      .then(data => {
        if (data) {
          this.loading = "Start Recoginztion";
          console.log("Start Recoginztion");
          this.getSongInfo();
        }
      }).catch(err => {
        console.log(err);
        this.spinner.hide();
        this.showToast("Server Error can't process url");
      })
  }

  Is_firebase(url: string) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match) {
      this.is_firebase = true;
    }
    else {
      this.is_firebase = false;
    }
  }

  Firebase_parser(url: string) {
    var regExp = /^.*(firebase\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
  }

  getBase64AudioServer(url: any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.SERVER_URL}/api/firebase/?url=${url}`, { responseType: 'text' })
        .subscribe(res => {
          if (res != undefined && res != null && res != '') {
            this.audio = res;
            resolve(true);
          }
          else {
            reject("SERVER ERROR MAYBE?!");
          }
        });
    });
  }

  getSongInfo() {
    const formData = new FormData();
    formData.append('audio', this.audio);
    this.http.post('https://api.audd.io', formData).subscribe(res => {
      let json = JSON.parse(JSON.stringify(res));
      console.log(json);
      console.log(json.status);
      this.status = json.status;
      this.spinner.hide();
      if (this.status == "success" && json.result != null) {
        this.album = json.result.album;
        this.artist = json.result.artist;
        this.label = json.result.label;
        this.release_date = json.result.release_date;
        this.title = json.result.title;
        this.showInfo = true;
      } else {
        this.songfailed = true;
        this.showInfo = false;
		this.gotVid = false;
        this.showToast("We can't recoginztion this song");
      }
    });

  }
  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
  async logout(){
    await this.authObj.signOut();
    this.router.navigateByUrl('/view-artist');
  }
}


