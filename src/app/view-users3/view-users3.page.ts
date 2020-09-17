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
  @Input() src: string;

  @ViewChild("range", {static:false}) range: IonRange;

  currRecordname;
  currSubtitle;
  currImage;

  progress= 0;
  isPlaying =false;
  
  isTouched = false;

  currSecsText;
  durationText;

  currRangeTime;
  maxRangeValue;

  currRecord: HTMLAudioElement;

  upNextImg;
  upNextRecordname;
  upNextSubtitle;
  upNextDigitalaudio;

  upPrevImg;
  upPrevTitle;
  upPrevSubtitle;
  upPrevLiveaudio;

  audio:any;

  records:any;
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

  playSong(Recordname, subTitle, imgURL, record) {
    if(this.currRecord !=null){
      this.currRecord.pause(); 
     }
   
   
     document.getElementById("fullPlayer").style.bottom = "0px";
     this.currRecordname = Recordname;
     this.currSubtitle = subTitle;
     this.currImage = imgURL;
     
    
     this.currRecord = new Audio(record);
     
     this.currRecord.play().then(() => {
     this.durationText = this.sToTime(this.currRecord.duration);
     this.maxRangeValue = Number(this.currRecord.duration.toFixed(2).toString().substring(0, 5));
   
     var index= this.records.findIndex(x => x.Recordname == this.currRecordname);
     
   
     if((index +1) == this.records.length) {
       this.upNextImg = this.records[0].imgURL;
       this.upNextRecordname = this.records[0].Recordname;
       this.upNextSubtitle = this.records[0].subTitle;
       this.upNextDigitalaudio = this.records[0].liveaudio;
     }
     else{
       this.upNextImg = this.records[index +1].imgURL;
       this.upNextRecordname = this.records[index +1].Recordname;
       this.upNextSubtitle = this.records[index +1].subTitle;
       this.upNextDigitalaudio = this.records[index +1].liveaudio;
     }
     this.isPlaying = true;

})
     

     
     this.currRecord.addEventListener("timeupdate", () => {
      if(!this.isTouched){
     this.currRangeTime = Number(this.currRecord.currentTime.toFixed(2).toString().substring(0,  5));
     this.currSecsText = this.sToTime(this.currRecord.currentTime);
     this.progress = (Math.floor(this.currRecord.currentTime) / Math.floor(this.currRecord.duration));
   
   
     if (this.currRecord.currentTime == this.currRecord.duration) {
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
     
    
     var index = this.records.findIndex(x => x.Recordname == this.currRecordname);
   
     if ((index + 1 )== this.records.length){
       this.playSong(this.records[0].Recordname, this.records[0].subTitle,this.records[0].imgURL,this.records[0].liveaudio);
     }
     else {
       var nextIndex = index +1;
       this.playSong(this.records[nextIndex].Songname, this.records[nextIndex].subTitle,this.records[nextIndex].imgURL,this.records[nextIndex].liveaudio);
   
     }
   
   }
   
   playPrev(){
     var index = this.records.findIndex(x => x.Recordname == this.currRecordname);
   
     if (index == 0) {
      var lastIndex = this.records.length - 1;
       this.playSong(this.records[lastIndex].Recordname, this.records[lastIndex].subTitle,this.records[lastIndex].imgURL, this.records[lastIndex].liveaudio);
   
   }
   
   else {
     var prevIndex = index -1;
     this.playSong(this.records[prevIndex].Recordname, this.records[prevIndex].subTitle,this.records[prevIndex].imgURL, this.records[prevIndex].liveaudio);
   
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
     this.currRecord.pause();
     this.isPlaying = false;
   }
   play(){
     this.currRecord.play();
     this.isPlaying = true;
   }
   cancel(){
    document.getElementById("miniPlayer").style.bottom = "-100px";
    this.currImage = "";
    this.currRecordname = "";
    this.currSubtitle = "";
    this.progress = 0;
    this.currRecord.pause();
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
   this.currRecord.currentTime = Number(this.range.value);
   this.currSecsText = this.sToTime(this.currRecord.currentTime)
   this.currRangeTime = Number(this.currRecord.currentTime.toFixed(2).toString().substring(0,  5 ));
   if (this.isPlaying){
     this.currRecord.play();
   }
  }
  async logout(){
    await this.afAuth.signOut();
    this.router.navigateByUrl('/view-users');
  }
}