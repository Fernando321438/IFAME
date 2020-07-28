import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'live.page.html',
  styleUrls: ['live.page.scss'],
})
export class LivePage {

  constructor(private http: HttpClient,private toastCtrl: ToastController, private spinner: NgxSpinnerService) { }

  // CHANGE THE SERVER PORT TO YOUR SERVER ENV PORT!
  // THIS IS TEST USING LOCALHOST WITH PORT 5000 DEFINED INSIDE WEB SERVER
  // IN THIS APP WE ARE USING NODE JS SERVER
  SERVER_URL = 'http://localhost:5000';

  // ngIf UI Boolean 
  gotVid = false;
  songfailed = false;
  showInfo = false;
  is_yt = false;

  // PUT YOUR Youtube API KEY!! Below
  apiKey: string = 'AIzaSyBVlpXbhtVrmh1g6ACo_TC2CrxxW2kqe5o';

  // Loading message
  loading = '';

  // Youtube Videos Holder
  youtubedata: any;

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
    this.loading = "Getting Youtube Data!";
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&part=snippet&q=' + this.artist + '&type=video&maxResults=' + this.maxResults;
    this.http.get(url).subscribe(res => {
      let search = JSON.parse(JSON.stringify(res));
      console.log(search.items);
      this.youtubedata = search.items;
      this.gotVid = true;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.showToast("Error at featching youtube data!");
    });
  }

  check(url) {
    this.is_youtube(url);
    if (!this.is_yt) {
      this.showToast("Please input a youtube link");
    }
    else {
      this.showToast("Correct Link, Click Process Button To Begin");
    }
  }

  async process(url) {
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

  is_youtube(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match) {
      this.is_yt = true;
    }
    else {
      this.is_yt = false;
    }
  }

  youtube_parser(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
  }

  getBase64AudioServer(url) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.SERVER_URL}/api/youtube/?url=${url}`, { responseType: 'text' })
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
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}


