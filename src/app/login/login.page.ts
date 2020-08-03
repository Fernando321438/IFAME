import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  artist: any = {};
  ct1: number;
  ct2: number;
  ct3: number;
  ct4: number;
  id: any = {};

  constructor(
    private readonly authObj: AngularFireAuth,
    private readonly router: Router,
    public loadingCtrl: LoadingController,
    private readonly toastCtrl: ToastController,
    private readonly afs: AngularFirestore,
    public  afAuth: AngularFireAuth,

  ) { }

  async ngOnInit() {}

  async loginArtist() {


    if (this.artist.email && this.artist.password) {

      this.authObj.signInWithEmailAndPassword(this.artist.email, this.artist.password).then(async (res) => {
        console.log(res);

        const snapshot2 = await artistFire.ref.where('email', '==', this.artist.email).get();
        //verifica artist
        if (snapshot2.empty) {
          console.log('artist non presente')
        } else {
          console.log('artist :' , snapshot2.docs)
          this.router.navigateByUrl('/view-artist');
        }

        const snapshot = await usersFire.ref.where('email', '==', this.artist.email).get();
        //verifica users
        if (snapshot.empty) {
          console.log('users non presente')
        } else {
          console.log('users :' , snapshot.docs)
          this.router.navigateByUrl('/view-users');
        }

        const snapshot3 = await musiccreators.ref.where('email', '==', this.artist.email).get();
        //verifica music.creators
        if (snapshot3.empty) {
          console.log('musiccreators non presente')
        } else {
          console.log('musiccreators :' , snapshot3.docs)
          this.router.navigateByUrl('/view-musiccreators');
        }

        const snapshot4 = await cryptoFire.ref.where('email', '==', this.artist.email).get();
        //verifica crypto
        if (snapshot4.empty) {
          console.log('crypto non presente')
        } else {
          console.log('crypto :' , snapshot4.docs)
          this.router.navigateByUrl('/view-crypto');
        }
      }).catch(e => {
        console.log(e);
      })

      const artistFire = this.afs.collection('artist');
      const usersFire = this.afs.collection('users');
      const cryptoFire = this.afs.collection('crypto');
      const musiccreators = this.afs.collection('music-creators');

      //leggo tutti i artist 
      const snapshotAll = await artistFire.ref.get();
      this.ct1 = 0;
      snapshotAll.forEach(doc => {
        this.ct1++;
        console.log('ARTIST' , this.ct1 , ':');
        console.log(doc.id, '=>', doc.data());

      });

      //leggo tutti i users
      const snapshotAll1 = await usersFire.ref.get();
      this.ct2 = 0;
      snapshotAll1.forEach(doc => {
        this.ct2++;
        console.log('USERS' , this.ct2 , ':');
        console.log(doc.id, '=>', doc.data());

      });
      const snapshotAll2 = await cryptoFire.ref.get();
      this.ct3 = 0;
      snapshotAll2.forEach(doc => {
        this.ct3++;
        console.log('CRYPTO' , this.ct3 , ':');
        console.log(doc.id, '=>', doc.data());

      });

      const snapshotAll3 = await musiccreators.ref.get();
      this.ct4 = 0;
      snapshotAll3.forEach(doc => {
        this.ct4++;
        console.log('MUSICCREATORS' , this.ct4 , ':');
        console.log(doc.id, '=>', doc.data());

      });
    }
    else {
      this.showToast('Email o password errati!')
    }
  }
  showloading() {
    this.loadingCtrl.create({
      message: "Loading..."
    }).then((loading) => {
      loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 3000)
    })
  }
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 4000
    }).then(toast => toast.present());
  }
  async logout(){
    await this.afAuth.signOut();
    this.router.navigateByUrl('/login-register');
  }
}