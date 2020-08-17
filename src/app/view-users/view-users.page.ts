import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { IonSlides, IonSlide } from "@ionic/angular";
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
  selectedSlide: any;
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
 
  records: any[0];
  
  imgURL:any=[];

  constructor(

    public afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private afDB: AngularFireDatabase,
    private authObj: AngularFireAuth,
    private media: Media,
    private readonly router: Router,
    
  ) {
   
   }

  async ngOnInit() {
  this.immagineLive();
  
   
    
  /*  this.afs.collection('/artist/').doc ('/' +(await this.afAuth.currentUser).uid).snapshotChanges().subscribe((usersnap: any) => {
      this.user = { 'imgURL': usersnap.imgURL, ...usersnap.payload.val() };

    })
    this.immagine.push({
      url: this.user.imgURL,
      
    }) 
   */
  }

  async immagineLive(){
    this.afs.collection('/artist/').valueChanges()
    .subscribe(records => {
      this.records = records;
      console.log(this.records);

    })  
  /*   this.afStorage.ref('/Live/'+ (await this.afAuth.currentUser).uid + this.artistCurrent.recordname)
    .getDownloadURL().subscribe(url=> {
 
      this.artistCurrent.imgURL= url ;
      console.log(this.artistCurrent.imgURL);
    }) */
  }

  async segmentChanged(ev){
    await this.selectedSlide.slideTo(this.segment);
  }

  async slideShanged(slides : IonSlides){

  this.selectedSlide = slides;
  slides.getActiveIndex().then(selectedIndex =>{
    this.segment = selectedIndex;
  })
 }





  async logout(){
    await this.afAuth.signOut();
    this.router.navigateByUrl('/login-register');
  }
}
