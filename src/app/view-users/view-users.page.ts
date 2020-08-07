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
  
    musics: any[0];

  constructor(
    public  afAuth: AngularFireAuth,
    private afStorage:AngularFireStorage,
    private readonly router: Router,
  ) {
    const ref = this.afStorage.ref('upload/'+ (await this.afAuth.currentUser).uid);
 
 
      ref.listAll().subscribe(mpeg => {
 
        this.musics.mpeg = mpeg;
        console.log(mpeg)
      })
   
   /*  afStorage.ref('/upload').listAll()
    .subscribe(musics => {
      this.musics = musics;
      console.log(this.musics);

    }) */
   }
  ngOnInit() {
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
