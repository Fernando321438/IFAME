import { Component, OnInit } from '@angular/core';
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { File } from "@ionic-native/file/ngx";
import { AngularFireStorage } from "@angular/fire/storage";
import * as firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';
import { Artist, ArtistService } from "../services/artist.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from "@angular/fire/firestore";


@Component({
  selector: 'app-home',
  templateUrl: 'recorder.page.html',
  styleUrls: ['recorder.page.scss'],
})
export class RecorderPage {
  status: string = "";
  audiofile: MediaObject = this.media.create(this.file.externalRootDirectory + '/audiofile.mp3');
  audio: any = {};
  /*  Uri: any;
   UploadTask: any;
   cb: any;
   url: string;
   blob: any; */
  artist: Artist;
  artistCurrent: any = {};
  /*  numShards:any;
    aux:File;  */
  count: any;

  constructor(private toastCtrl: ToastController, private media: Media, private file: File, private afs: AngularFireStorage, private auth: AngularFireAuth, private artistService: ArtistService, private activatedRoute: ActivatedRoute, private afstore: AngularFirestore, private readonly router: Router, private authObj: AngularFireAuth) { }

  ngOnInit() {

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.artistService.getArtist(id).subscribe(artist => {
        this.artist = artist;
      });
    }
  }

  async createCounter() {
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(1);
    const storyRef = firebase.firestore().collection('artist').doc(((await this.authObj.currentUser).uid + '/Recorders/' + 'Record' + this.count));
    const batch = db.batch();
    batch.set(storyRef, { record: increment });
    batch.commit();

  }





  async SaveNameRecord() {
    if (this.artistCurrent.recordname) {
      const datages = {
        Recordname: this.artistCurrent.recordname,

      };

      const artistFire1 = this.afstore.collection('artist');
      const artistFire2 = artistFire1.ref.doc((await this.authObj.currentUser).uid);
      artistFire2.collection('Recorders').doc('/' + this.artistCurrent.recordname).set(datages).then(() => { //(await this.auth.currentUser).uid
        this.showToast('Record Added');
      }, err => {
        this.showToast('Record Not Added');

      }).catch(e => {
        console.log(e);
      })
    } else {
      this.showToast('Empty Record Field ');
    }


  }

  

  RecordAudio() {
    this.audiofile.startRecord();
    this.status = "recording...";

  }
  StopRecording() {
    this.audiofile.stopRecord();
    this.status = "stopped";
    /*     this.afs.ref("music/sound/").put(this.audiofile);
     */
  }


  async upload2(file: any[]): Promise<any> {
    if (file && file.length) {
      try {
        file = this.audio;
        const task = await this.afs.ref('Audio').child((await this.authObj.currentUser).uid).put(file);
        this.afs.ref('Audio' + (await this.authObj.currentUser).uid).getDownloadURL().toPromise();
      } catch (error) { console.log(error); }

    }

  }

  //FUNZIONANTE
  async uploadfile() {

    console.dir(this.file.externalDataDirectory);
    
/*     var artistCurrent = {name:`${this.audiofile}.mp3`};
 */    
    const fileName = { name: `${this.file.externalDataDirectory}/${this.artistCurrent}.mp3` };
    const metadata = {contentType: 'audio/mp3',
 };

    var blob = new Blob([fileName.name], { type: 'audio/mp3' }); // pass a useful mime type here
    const uploadAudio = this.afs.storage.ref('Audio/' + (await this.authObj.currentUser).uid + '/' + this.artistCurrent.recordname)
      .put(blob, metadata);
    // Listen for state changes, errors, and completion of the upload.
    return uploadAudio.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
      }, (error) => {
        console.dir(error);
      }, () => {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadAudio.snapshot.downloadURL;
        console.dir(downloadURL);
        return new Promise((resolve, reject) => {
          resolve(downloadURL);
        });
      });

  }
  //


  async uploadToStorage() {

    var file = this.getFileBlob();
    this.audio = this.audiofile;
    this.afs.ref('Audio' + (await this.authObj.currentUser).uid + '/' + this.audiofile).put(file);
    console.log('Uploaded a blob or file!');


  }

  getFileBlob() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.audio);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function () {

    });
    xhr.send();
  };

  //--------------------------
  async sendAudio1() {

    let file = (<HTMLInputElement>document.getElementById('id')).files[0];

    let ref = this.afs.ref('upload/' + (await this.authObj.currentUser).uid + '/' + file.name);

    ref.put(file).then(res => {

      ref.getDownloadURL().subscribe(url => {

        this.artistCurrent.song = url;

      })
    }).catch(e => {
      console.log(e);
    })
  }
  async sendAudio() {
    const file = (<HTMLInputElement>document.getElementById('avatar')).files[0];
    new Blob([JSON.stringify(file, null, 2)], { type: 'audio/mp3' }); // usa l'API BLOB o File
    this.afs.ref('Audio/' + (await this.authObj.currentUser).uid + '/' + this.artistCurrent.recordname + '/').put(file);
    console.log('Uploaded a blob or file!');

    /*  this.getFileBlob();
     this. uploadToStorage(); 
 */
  }



  async sendAudioToSomewhere() {
    const base64 = await this.getAudio();
    const blob = this.b64toBlob(base64, 'audio/mp3', 512);
    await this.sendRemotely(blob);
    alert('done');
  }

  async getAudio() {
    var base64 = this.audio;
    await this.afs.storage.ref('Audio').list().then(record => { this.audio = record });

    this.audio = this.audiofile;
    /*  this.afs.ref(base64.name).getMetadata().subscribe(mp3 => {

        this.audio = mp3;

    }) */

    return base64;
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    this.audio = b64Data;
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = btoa(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  async sendRemotely(blob: Blob) {
    let traccia = this.audio;
    let ref = this.afs.ref('Audio/' + (await this.auth.currentUser).uid + '/' + this.audiofile);

    ref.put(traccia).then(res => {

      ref.getDownloadURL().subscribe(mp3 => {

        this.audiofile = mp3;

      })
    }).catch(e => {
      console.log(e);
    })


  }


  /*   upload() {
 
     // File or Blob
    var file = this.afs.ref("audio"); 
 
     // Create the file metadata
     var metadata = this.afs.ref.apply(this.audiofile)
       .setContentType("audio/mpeg")
       .build();
     this.audio = this.audiofile;
     // Upload file and metadata to the path 'audio/audio.mp3'
     this.afs.ref("audio/" + this.audio).put(metadata);
 
     // Listen for state changes, errors, and completion of the upload.
     this.UploadTask.addOnProgressListener(this.UploadTask.TaskSnapshot()({
 
       onProgress(taskSnapshot: { getBytesTransferred: () => number; getTotalByteCount: () => number; }) {
         const progress = (100.0 * taskSnapshot.getBytesTransferred()) / taskSnapshot.getTotalByteCount();
         this.System.out.println("Upload is " + progress + "% done");
       }
     }).addOnPausedListener(this.UploadTask.TaskSnapshot()({
 
       onPaused() {
         this.System.out.println("Upload is paused");
       }
     }).addOnFailureListener()({
 
       onFailure() {
         // Handle unsuccessful uploads
       }
     }).addOnSuccessListener(this.UploadTask.TaskSnapshot())({
 
       onSuccess() {
         // Handle successful uploads on complete
         this.Uri.downloadUrl = this.taskSnapshot.getMetadata().getDownloadUrl();
       }
     })))
   }*/
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
  async logout(){
    await this.authObj.signOut();
    this.router.navigateByUrl('/view-artist');
  }
}