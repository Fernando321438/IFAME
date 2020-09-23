import { Component, OnInit,ElementRef, ViewChild, Input  } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { IonSlides, IonSlide, IonCard } from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireDatabase } from "@angular/fire/database";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import {LivePage} from "../live/live.page";
import { first } from 'rxjs/operators';
import { DataService } from "../services/data.service";

import { LoadingController,Platform,ToastController } from '@ionic/angular';
import { DatePipe, PathLocationStrategy } from '@angular/common';
import {IonRange} from '@ionic/angular';

import {FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { digest } from '@angular/compiler/src/i18n/digest';


@Component({
  selector: "app-view-users",
  templateUrl: "./view-users.page.html",
  styleUrls: ["./view-users.page.scss"],
})
export class ViewUsersPage implements OnInit {
  public searchTerm: string = "";
  public items: any;

  selectedCards: any;
  user: any = {};
  immagine = [];

  segment = 0;
  sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
  };
  
  /* slideOpts = {
    initialSlide: 0,
    speed: 400 */
  recordname:any;
  records: any;
  songs: any;
  imgURL:any=[];
  
  live:boolean=true;
  music:boolean=false;
  search:boolean=false;

  @Input() src: string;

  @ViewChild("range", {static:false}) range: IonRange;

  currSongname;
  currArtistname;
  currImage;

  progress= 0;
  isPlaying =false;
  
  isTouched = false;

  isShow=true;

  currSecsText;
  durationText;

  currRangeTime;
  maxRangeValue;

  currSong: HTMLAudioElement;

  upNextImg;
  upNextSongname;
  upNextArtistname;
  upNextDigitalaudio;

  upPrevImg;
  upPrevTitle;
  upPrevSubtitle;
  upPrevDigitalaudio;

  audio:any;

  message: any;
  mp3s: any[0];
  artistCurrent: any = {};

  constructor(private afs:AngularFirestore,private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private file: File,
   
    private datePipe: DatePipe, 
    public afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private activatedRoute: ActivatedRoute,
    private afDB: AngularFireDatabase,
    private media: Media,
    private readonly router: Router,
    private dataService: DataService
  ) {
    
      this.afs.collection('/Live Record').valueChanges()
      .subscribe(records => {
        this.records = records;
        console.log(this.records);
  
      })  
      
     this.afs.collection('/Digital Record').valueChanges()
      .subscribe(songs => {
        this.songs = songs;
        console.log(this.songs);
  
      })  
    
 

   
   
   }
  async ngOnInit() {
  
    this.setFiltered();
}
setFiltered() {
  this.records = this.dataService.filterRecords(this.searchTerm);
  this.songs = this.dataService.filterSongs(this.searchTerm);
}




  segmentChanged(event)
   {
     var segment = event.target.value; 
     if(segment == "Live")
     {
       this.live= true;
       this.music= false;
       this.search= false;
     }
     else if (segment == "Music")
     {
      this.live= false;
      this.music= true;
      this.search= false;
    }
    else if (segment == "Search")
    {
     this.live= false;
     this.music= false;
     this.search= true;
   }
  }
    
 
  playSong(Songname, artistname, imgURL, song) {
    if(this.currSong !=null){
      this.currSong.pause(); 
     }
   
   
     document.getElementById("fullPlayer").style.bottom = "0px";
     this.currSongname = Songname;
     this.currArtistname = artistname;
     this.currImage = imgURL;
     
    
     this.currSong = new Audio(song);
     
     this.currSong.play().then(() => {
     this.durationText = this.sToTime(this.currSong.duration);
     this.maxRangeValue = Number(this.currSong.duration.toFixed(2).toString().substring(0, 5));
   
     var index= this.songs.findIndex(x => x.Songname == this.currSongname);
     
   
     if((index +1) == this.songs.length) {
       this.upNextImg = this.songs[0].imgURL;
       this.upNextSongname = this.songs[0].Songname;
       this.upNextArtistname = this.songs[0].artistname;
       this.upNextDigitalaudio = this.songs[0].digitalaudio;
     }
     else{
       this.upNextImg = this.songs[index +1].imgURL;
       this.upNextSongname = this.songs[index +1].Songname;
       this.upNextArtistname = this.songs[index +1].artistname;
       this.upNextDigitalaudio = this.songs[index +1].digitalaudio;
     }
     this.isPlaying = true;

/*      
//-------------------------------
if((index -1) == this.songs.length) {
  this.upPrevImg = this.songs[0].imgURL;
  this.upPrevTitle = this.songs[0].Songname;
  this.upPrevSubtitle = this.songs[0].subtitle;
  this.upPrevDigitalaudio = this.songs[0].digitalaudio;
}
else{
  this.upPrevImg = this.songs[index -1].imgURL;
  this.upPrevTitle = this.songs[index -1].Songname;
  this.upPrevSubtitle = this.songs[index -1].subtitle;
  this.upPrevDigitalaudio = this.songs[index -1].digitalaudio;
}
this.isPlaying = true;  */
//---------------------------------
})
     

     
     this.currSong.addEventListener("timeupdate", () => {
      if(!this.isTouched){
     this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0,  5));
     this.currSecsText = this.sToTime(this.currSong.currentTime);
     this.progress = (Math.floor(this.currSong.currentTime) / Math.floor(this.currSong.duration));
   
   
     if (this.currSong.currentTime == this.currSong.duration) {
       this.playNext();
     }
    }
     });
    
   
     }
     sToTime(t){
       return this.padZero(parseInt(String((t / (60)) % 60)))+ ":"+
       this.padZero(parseInt(String((t) % 60)));
     }
   padZero(v) {
     return (v < 10) ? "0" +v : v;
   }
         
   playNext(){
     
    
     var index = this.songs.findIndex(x => x.Songname == this.currSongname);
   
     if ((index + 1 )== this.songs.length){
       this.playSong(this.songs[0].Songname, this.songs[0].artistname,this.songs[0].imgURL,this.songs[0].digitalaudio);
     }
     else {
       var nextIndex = index +1;
       this.playSong(this.songs[nextIndex].Songname, this.songs[nextIndex].artistname,this.songs[nextIndex].imgURL,this.songs[nextIndex].digitalaudio);
   
     }
   
   }
   
   playPrev(){
     var index = this.songs.findIndex(x => x.Songname == this.currSongname);
   
     if (index == 0) {
      var lastIndex = this.songs.length - 1;
       this.playSong(this.songs[lastIndex].Songname, this.songs[lastIndex].artistname,this.songs[lastIndex].imgURL, this.songs[lastIndex].digitalaudio);
   
   }
   
   else {
     var prevIndex = index -1;
     this.playSong(this.songs[prevIndex].Songname, this.songs[prevIndex].artistname,this.songs[prevIndex].imgURL, this.songs[prevIndex].digitalaudio);
   
   }
   
   }
   
   minimize(){
     document.getElementById("fullPlayer").style.bottom = "-1000px";
     document.getElementById("miniPlayer").style.bottom = "0px";
   }
   maximize(){
     document.getElementById("fullPlayer").style.bottom = "0px";
     document.getElementById("miniPlayer").style.bottom = "-100px";
   
   }
   pause (){
     this.currSong.pause();
     this.isPlaying = false;
   }
   play(){
     this.currSong.play();
     this.isPlaying = true;
   }
   
   cancel(){
     document.getElementById("miniPlayer").style.bottom = "-100px";
     this.currImage = "";
     this.currSongname = "";
     this.currArtistname = "";
     this.progress = 0;
     this.currSong.pause();
     this.isPlaying = false;
   }
   touchStart(){
     this.isTouched = true;
     this.currRangeTime = Number(this.range.value);
   }
   touchMove(){
     this.currSecsText = this.sToTime(this.range.value);
   }
   touchEnd(){
   this.isTouched = false;
   this.currSong.currentTime = Number(this.range.value);
   this.currSecsText = this.sToTime(this.currSong.currentTime)
   this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0,  5 ));
   if (this.isPlaying){
     this.currSong.play();
   }
  }

   async logout(){
     if( this.isPlaying = true){
      this.currSong.pause();
      await this.afAuth.signOut();
      this.router.navigateByUrl('/login-register');
     }
     else{
    await this.afAuth.signOut();
    this.router.navigateByUrl('/login-register');}
    
  }

}
