import { Component, OnInit,ElementRef, ViewChild, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController,Platform,ToastController } from '@ionic/angular';
import { DatePipe, PathLocationStrategy } from '@angular/common';
import {IonRange} from '@ionic/angular';

import {FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { digest } from '@angular/compiler/src/i18n/digest';

@Component({
  selector: 'app-view-users3',
  templateUrl: './view-users3.page.html',
  styleUrls: ['./view-users3.page.scss'],
})
export class ViewUsers3Page implements OnInit {
  
  public items: any;
//////////////////////////////////////////////////////
currRecordname2;
currRecord2: HTMLAudioElement;
upNextRecordname2;
upPrevLiveaudio;
///////////////////////////////////////////////////////
  selectedCards: any;
  user: any = {};
  immagine = [];

  recordname:any;
  records: any;
  imgURL2:any=[];
  
 

  @Input() src: string;

  @ViewChild("range", {static:false}) range: IonRange;

  
  currArtistname2;
  currImage2;

  progress= 0;
  isPlaying =false;
  
  isTouched = false;

  isShow=true;

  currSecsText2;
  durationText2;

  currRangeTime2;
  maxRangeValue2;

  currSong: HTMLAudioElement;

  upNextImg2;
  upNextArtistname2;
  upNextLiveaudio;

  upPrevImg2;
  upPrevTitle2;
  upPrevSubtitle2;

  audio:any;

  message: any;
  mp3s: any[0];
  artistCurrent: any = {};

  constructor(private afs:AngularFirestore,private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private file: File,
   
    private media: Media,
    private datePipe: DatePipe, 
    private afAuth: AngularFireAuth,
    private router: Router,
    private afStorage:AngularFireStorage,
    private authObj: AngularFireAuth)
    
  
    
    
    
    {afs.collection('/Live Record').valueChanges()
    .subscribe(records => {
      this.records = records;
      console.log(this.records);

    })  
    
    }

      
    
    
  
  ngOnInit() {
 
  }

  playSong2(Recordname, artistname2, imgURL2, record) {
    if(this.currRecord2 !=null){
      this.currRecord2.pause(); 
     }
   
   
     document.getElementById("fullPlayer").style.bottom = "0px";
     this.currRecordname2 = Recordname;
     this.currArtistname2 = artistname2;
     this.currImage2 = imgURL2;
     
    
     this.currRecord2 = new Audio(record);
     
     this.currRecord2.play().then(() => {
     this.durationText2 = this.sToTime(this.currRecord2.duration);
     this.maxRangeValue2= Number(this.currRecord2.duration.toFixed(2).toString().substring(0, 5));
   
     var index= this.records.findIndex(x => x.Recordname == this.currRecordname2);
     
   
     if((index +1) == this.records.length) {
       this.upNextImg2 = this.records[0].imgURL2;
       this.upNextRecordname2 = this.records[0].Recordname;
       this.upNextArtistname2 = this.records[0].artistname2;
       this.upNextLiveaudio = this.records[0].liveaudio;
     }
     else{
       this.upNextImg2 = this.records[index +1].imgURL2;
       this.upNextRecordname2 = this.records[index +1].Recordname;
       this.upNextArtistname2 = this.records[index +1].artistname2;
       this.upNextLiveaudio = this.records[index +1].liveaudio;
     }
     this.isPlaying = true;

})
     

     
     this.currRecord2.addEventListener("timeupdate", () => {
      if(!this.isTouched){
     this.currRangeTime2 = Number(this.currRecord2.currentTime.toFixed(2).toString().substring(0,  5));
     this.currSecsText2 = this.sToTime(this.currRecord2.currentTime);
     this.progress = (Math.floor(this.currRecord2.currentTime) / Math.floor(this.currRecord2.duration));
   
   
     if (this.currRecord2.currentTime == this.currRecord2.duration) {
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
     
    
     var index = this.records.findIndex(x => x.Recordname == this.currRecordname2);
   
     if ((index + 1 )== this.records.length){
       this.playSong2(this.records[0].Recordname, this.records[0].artistname2,this.records[0].imgURL2,this.records[0].liveaudio);
     }
     else {
       var nextIndex = index +1;
       this.playSong2(this.records[nextIndex].Recordname, this.records[nextIndex].artistname2,this.records[nextIndex].imgURL2,this.records[nextIndex].liveaudio);
   
     }
   
   }
   
   playPrev(){
     var index = this.records.findIndex(x => x.Recordname == this.currRecordname2);
   
     if (index == 0) {
      var lastIndex = this.records.length - 1;
       this.playSong2(this.records[lastIndex].Recordname, this.records[lastIndex].artistname2,this.records[lastIndex].imgURL2, this.records[lastIndex].liveaudio);
   
   }
     
   else {
     var prevIndex = index -1;
     this.playSong2(this.records[prevIndex].Recordname, this.records[prevIndex].artistname2,this.records[prevIndex].imgURL2, this.records[prevIndex].liveaudio);
   
   }
   
   }
   
   minimize2(){
     document.getElementById("fullPlayer").style.bottom = "-1000px";
     document.getElementById("miniPlayer").style.bottom = "0px";
   }
   maximize2(){
     document.getElementById("fullPlayer").style.bottom = "0px";
     document.getElementById("miniPlayer").style.bottom = "-100px";
   
   }
   pause(){
     this.currRecord2.pause();
     this.isPlaying = false;
   }
   play(){
     this.currRecord2.play();
     this.isPlaying = true;
   }
   cancel(){
    document.getElementById("miniPlayer").style.bottom = "-100px";
    this.currImage2 = "";
    this.currRecordname2 = "";
    this.currArtistname2 = "";
    this.progress = 0;
    this.currRecord2.pause();
    this.isPlaying = false;
  }
  
   touchStart(){
     this.isTouched = true;
     this.currRangeTime2 = Number(this.range.value);
   }
   touchMove(){
     this.currSecsText2 = this.sToTime(this.range.value);
   }
   touchEnd(){
   this.isTouched = false;
   this.currRecord2.currentTime = Number(this.range.value);
   this.currSecsText2 = this.sToTime(this.currRecord2.currentTime)
   this.currRangeTime2 = Number(this.currRecord2.currentTime.toFixed(2).toString().substring(0,  5 ));
   if (this.isPlaying){
     this.currRecord2.play();
   }
  }

  async logout(){
    this.currRecord2.pause();
    await this.afAuth.signOut();
    this.router.navigateByUrl('/view-users3');
  }
}