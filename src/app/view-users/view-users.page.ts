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
//////////////////////////////////////////////////////
currRecordname;
currRecord: HTMLAudioElement;

upNextRecordname;

///////////////////////////////////////////////////////
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
  @ViewChild("range", {static:false}) range2: IonRange;

  isMostra=true;
  isMostra2=true;
  currSongname;
  currArtistname;
  currImage;

  progress= 0;
  isPlaying =false;
  
  isTouched = false;

  isShow=true;
  isShow2=true;


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
  currRecord2: any;
  currRecordname2: any;
  currArtistname2: any;
  currImage2: any;
  maxRangeValue2: number;
  durationText2: string;
  upNextImg2: any;
  upNextRecordname2: any;
  upNextArtistname2: any;
  upNextLiveaudio: any;
  currRangeTime2: number;
  currSecsText2: string;
  isTouched2: boolean;
  isPlaying2: any;
  progress2: number;



  upPrevImg2;
  upPrevTitle2;
  upPrevSubtitle2;
  upPrevLiveaudio;


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
     this.isShow=false;
   }
   play(){
     this.currSong.play();
     this.isPlaying = true;
     this.isShow=true;
   }
   
   cancel(){
     document.getElementById("miniPlayer").style.bottom = "-100px";
     this.currImage = "";
     this.currSongname = "";
     this.currArtistname = "";
     this.progress = 0;
     this.currSong.pause();
     this.isPlaying = false;
     this.isShow=true;
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





 
  playSong2(Recordname, artistname2, imgURL2, record) {
    if(this.currRecord !=null){
      this.currRecord.pause(); 
     }
   
   
     document.getElementById("fullPlayer2").style.bottom = "0px";
     this.currRecordname = Recordname;
     this.currArtistname = artistname2;
     this.currImage = imgURL2;
     
    
     this.currRecord = new Audio(record);
     
     this.currRecord.play().then(() => {
     this.durationText2 = this.sToTime(this.currRecord.duration);
     this.maxRangeValue2= Number(this.currRecord.duration.toFixed(2).toString().substring(0, 5));
   
     var index2= this.records.findIndex(x => x.Recordname == this.currRecordname);
     
   
     if((index2 +1) == this.records.length) {
       this.upNextImg2 = this.records[0].imgURL2;
       this.upNextRecordname2 = this.records[0].Recordname;
       this.upNextArtistname2 = this.records[0].artistname2;
       this.upNextLiveaudio = this.records[0].liveaudio;
     }
     else{
       this.upNextImg2 = this.records[index2 +1].imgURL2;
       this.upNextRecordname2 = this.records[index2 +1].Recordname;
       this.upNextArtistname2 = this.records[index2 +1].artistname2;
       this.upNextLiveaudio = this.records[index2 +1].liveaudio;
     }
     this.isPlaying2 = true;

})
     

     
     this.currRecord.addEventListener("timeupdate", () => {
      if(!this.isTouched2){
     this.currRangeTime2 = Number(this.currRecord.currentTime.toFixed(2).toString().substring(0,  5));
     this.currSecsText2 = this.sToTime(this.currRecord.currentTime);
     this.progress = (Math.floor(this.currRecord.currentTime) / Math.floor(this.currRecord.duration));
   
   
     if (this.currRecord.currentTime == this.currRecord.duration) {
       this.playNext2();
     }
    }
     });
    
   
     }
      sToTime2(t){
       return this.padZero2(parseInt(String((t/ (60)) % 60)))+ ":"+
       this.padZero2(parseInt(String((t) % 60)));
     } 
   padZero2(v) {
     return (v < 10) ? "0" +v : v;
   } 
         
   playNext2(){
     
    
     var index2 = this.records.findIndex(x => x.Recordname == this.currRecordname);
   
     if ((index2 + 1 )== this.records.length){
       this.playSong2(this.records[0].Recordname, this.records[0].artistname2,this.records[0].imgURL2,this.records[0].liveaudio);
     }
     else {
       var nextIndex2 = index2 +1;
       this.playSong2(this.records[nextIndex2].Recordname, this.records[nextIndex2].artistname2,this.records[nextIndex2].imgURL2,this.records[nextIndex2].liveaudio);
   
     }
   
   }
   
   playPrev2(){
     var index2 = this.records.findIndex(x => x.Recordname == this.currRecordname);
   
     if (index2 == 0) {
      var lastIndex2 = this.records.length - 1;
       this.playSong2(this.records[lastIndex2].Recordname, this.records[lastIndex2].artistname2,this.records[lastIndex2].imgURL2, this.records[lastIndex2].liveaudio);
   
   }
     
   else {
     var prevIndex2 = index2 -1;
     this.playSong2(this.records[prevIndex2].Recordname, this.records[prevIndex2].artistname2,this.records[prevIndex2].imgURL2, this.records[prevIndex2].liveaudio);
   
   }
   
   }
   
   minimize2(){
     document.getElementById("fullPlayer2").style.bottom = "-1000px";
     document.getElementById("miniPlayer2").style.bottom = "0px";
   }
   maximize2(){
     document.getElementById("fullPlayer2").style.bottom = "0px";
     document.getElementById("miniPlayer2").style.bottom = "-100px";
   
   }
   pause2(){
     this.currRecord.pause();
     this.isPlaying2 = false;
   }
   play2(){
     this.currRecord.play();
     this.isPlaying2 = true;
   }
   cancel2(){
    document.getElementById("miniPlayer2").style.bottom = "-100px";
    this.currImage = "";
    this.currRecordname = "";
    this.currArtistname = "";
    this.progress = 0;
    this.currRecord.pause();
    this.isPlaying2 = false;
  }
  
  touchStart2(){
     this.isTouched2 = true;
   }
   touchMove2(){
     this.currSecsText2 = this.sToTime(this.currRangeTime2);
   } 
    touchEnd2(){
   this.isTouched2 = false;
   this.currRecord.currentTime = Number(this.currRangeTime2);
   this.currSecsText2 = this.sToTime(this.currRecord.currentTime)
   this.currRangeTime2 = Number(this.currRecord.currentTime.toFixed(2).toString().substring(0,  5 ));
   if (this.isPlaying2){
     this.currRecord.play();
   }
  }  
  
  async logout(){
     if( this.isPlaying = true ,this.isPlaying2 = true){
      this.currSong.pause();
      this.currRecord.pause();

      await this.afAuth.signOut();
      this.router.navigateByUrl('/login-register');
     }
     else{
    await this.afAuth.signOut();
    this.router.navigateByUrl('/login-register');}
    
  }

}
