import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { MusiccreatorsService, Musiccreators } from '../services/musiccreators.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-view-musiccreators',
  templateUrl: './view-musiccreators.page.html',
  styleUrls: ['./view-musiccreators.page.scss'],
})
export class ViewMusiccreatorsPage implements OnInit {
  musiccreators: Musiccreators;
  musiccreatorsCurrent: any = {};
  
  constructor(
    private toastCtrl: ToastController,
    private musiccreatorsService: MusiccreatorsService, 
    private activatedRoute: ActivatedRoute, 
    private afstore: AngularFirestore,
     private readonly router: Router, 
     private authObj: AngularFireAuth
  ) { }
  ngOnInit() {

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.musiccreatorsService.getMusiccreators(id).subscribe(musiccreators => {
        this.musiccreators = musiccreators;
      });
    }
  }
  async SaveNameRecord() {
    if (this.musiccreators.songname + this.musiccreators.textsongname + this.musiccreators.songwriter + this.musiccreators.producer) {
      const datages = {
        Songname: this.musiccreators.songname,
        Textsongname: this.musiccreators.textsongname,
        songwriter: this.musiccreators.songwriter,
       producer: this.musiccreators.producer,

      };

      const artistFire1 = this.afstore.collection('artist');
      const artistFire2 = artistFire1.ref.doc((await this.authObj.currentUser).uid);
      artistFire2.collection('Recorders').doc('/' + this.musiccreatorsCurrent.recordname).set(datages).then(() => { //(await this.auth.currentUser).uid
        this.showToast('Song Title Added');
      }, err => {
        this.showToast('Song Title Not Added');

      }).catch(e => {
        console.log(e);
      })
    } else {
      this.showToast('Empty Record Field ');
    }


  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
  async logout(){
    await this.authObj.signOut();
    this.router.navigateByUrl('/view-musiccreators');
  }
}
