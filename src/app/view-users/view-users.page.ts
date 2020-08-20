import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { IonSlides, IonSlide, IonCard } from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireDatabase } from "@angular/fire/database";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import {LivePage} from "../live/live.page";

@Component({
  selector: "app-view-users",
  templateUrl: "./view-users.page.html",
  styleUrls: ["./view-users.page.scss"],
})
export class ViewUsersPage implements OnInit {
  
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
  records: any[0];
  songs: any[0];
  artistCurrent: any[0];
  imgURL:any=[];
  
  live:boolean=true;
  music:boolean=false;
  search:boolean=false;


  constructor(
    public afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private afstore: AngularFirestore,
    private afDB: AngularFireDatabase,
    private authObj: AngularFireAuth,
    private media: Media,
    private readonly router: Router,
    
  ) {
 
 
  
   
     afs.collection('/Live Record').valueChanges()
    .subscribe(records => {
      this.records = records;
      console.log(this.records);

    })  
    
    afs.collection('/Digital Record').valueChanges()
    .subscribe(songs => {
      this.songs = songs;
      console.log(this.songs);

    })  
   }
  async ngOnInit() {
    this.immagineLive();
    this.afStorage.ref('/Live/' + (await this.afAuth.currentUser).uid + this.artistCurrent.recordname).getDownloadURL().subscribe((usersnap: any) => {
      this.user = { 'imgURL': usersnap.imgURL, ...usersnap.payload.val() };
      console.log(this.user);

    })
    this.immagine.push({
      url: this.user.imgURL
    })
    this.immagineDigital();
    this.afStorage.ref('/Digital/' + (await this.afAuth.currentUser).uid + this.artistCurrent.songname).getDownloadURL().subscribe((usersnap: any) => {
      this.user = { 'imgURL': usersnap.imgURL, ...usersnap.payload.val() };
      console.log(this.user);
    })
    this.immagine.push({
      url: this.user.imgURL
    })

  }

  async immagineLive(){
    this.afStorage.ref('/Live/'+ (await this.afAuth.currentUser).uid + this.artistCurrent.recordname)
    .getDownloadURL().subscribe(url=> {
 
      this.artistCurrent.imgURL= url ;
      console.log(this.artistCurrent.imgURL);
    })
  }
  async immagineDigital(){
    this.afStorage.ref('/Digital/'+ (await this.afAuth.currentUser).uid + this.artistCurrent.songname)
    .getDownloadURL().subscribe(url=> {
 
      this.artistCurrent.imgURL= url ;
      console.log(this.artistCurrent.imgURL);
    })
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
    
  async logout(){
    await this.afAuth.signOut();
    this.router.navigateByUrl('/login-register');
  }
}
