import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonSlides, IonSlide } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: ['./view-users.page.scss'],
})
export class ViewUsersPage implements OnInit {
  selectedSlide: any;
  segment = 0;
  sliderOptions={
    initialSlide:0,
    slidesPerView: 1,
    speed: 400
  }
  /* slideOpts = {
    initialSlide: 0,
    speed: 400 */
  
    records:any[0];
    artistCurrent: any[0];
  constructor(
    public  afAuth: AngularFireAuth,
    private afStorage:AngularFireStorage,
    private afs: AngularFirestore,
    private readonly router: Router,
  ) {
 
 
  
   
     afs.collection('/artist/').valueChanges()
    .subscribe(records => {
      this.records = records;
      console.log(this.records);

    }) 
   }
  async ngOnInit() {
    this.afStorage.ref('LiveImage'+ (await this.afAuth.currentUser).uid)
    .getDownloadURL().subscribe(url=> {
 
      this.artistCurrent.imgURL= url ;
      console.log(url);
    })


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
