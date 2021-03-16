import { Component, OnInit } from "@angular/core";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { File } from "@ionic-native/file/ngx";
import { AngularFireStorage } from "@angular/fire/storage";
import * as firebase from "firebase/app";
import { ToastController } from "@ionic/angular";
import { Artist, ArtistService } from "../services/artist.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-home",
  templateUrl: "live.page.html",
  styleUrls: ["live.page.scss"],
})
export class LivePage {
  status: string = "";
  audiofile: MediaObject;
  audio: any = {};
  /*  Uri: any;
   UploadTask: any;
   cb: any;
   url: string;
   blob: any; */
  artist: Artist;
  artistCurrent: any = {};
  count: any;

  constructor(
    private toastCtrl: ToastController,
    private media: Media,
    private file: File,
    private afs: AngularFireStorage,
    private auth: AngularFireAuth,
    private artistService: ArtistService,
    private activatedRoute: ActivatedRoute,
    private afstore: AngularFirestore,
    private readonly router: Router,
    private authObj: AngularFireAuth
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.artistService.getArtist(id).subscribe((artist) => {
        this.artist = artist;
      });
    }
  }

  async createCounter() {
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(1);
    const storyRef = firebase
      .firestore()
      .collection("artist")
      .doc(
        (await this.authObj.currentUser).uid +
          "/Recorders/" +
          "Record" +
          this.count
      );
    const batch = db.batch();
    batch.set(storyRef, { record: increment });
    batch.commit();
  }

  async SaveNameRecord() {
    if (this.artistCurrent.recordname && this.artistCurrent.imgURL2 && this.artistCurrent.liveaudio && this.artistCurrent.artistname2 ) {
      const datages = {
        Recordname: this.artistCurrent.recordname,
        artistname2:this.artistCurrent.artistname2,
        imgURL2: this.artistCurrent.imgURL2,
        liveaudio: this.artistCurrent.liveaudio,
           createdAt: Date.now(),
      };
      

      const artistFire1 = this.afstore.collection("Live Record");
      const artistFire2 = artistFire1.ref.doc(
        (await this.authObj.currentUser).uid + this.artistCurrent.recordname
      ).set(datages)
     /*  artistFire2
        .collection(this.artistCurrent.recordname)
        .add(datages) */
        .then(
          () => {
            //(await this.auth.currentUser).uid
            this.showToast("Song Title Added");
          },
          (err) => {
            this.showToast("Song Title Not Added");
          }
        )
        .catch((e) => {
          console.log(e);
        });
    }  else {
      this.showToast("Empty Record Field ");
    }
  }
 
  RecordAudio() {
    this.audiofile = this.media.create
    (this.file.externalRootDirectory + this.artistCurrent.recordname + ".mp3"
    );
    this.audiofile.startRecord();
    this.status = "recording...";
  }
  StopRecording() {

    this.audiofile.stopRecord();
    this.status = "stopped";
    
    this.showToast("Record Added");
    (err) => {
      this.showToast("Record Not Added");
    };
    /*     this.afs.ref("music/sound/").put(this.audiofile);
     */
  }





  //FUNZIONANTE
  async uploadfile() {
    const file = (<HTMLInputElement>document.getElementById("id")).files[0];
    
    const ref = this.afs.ref('Live' +'/'+(await this.authObj.currentUser).uid+ '/' + this.artistCurrent.recordname + '/'  + file.name);

    ref.put(file).then(res => {
        ref.getDownloadURL().subscribe(url => {
          this.artistCurrent.liveaudio = url;
          this.showToast("Live added");
        })
   }).catch((e) => {
        console.log(e);
      });
    }
    /*     var artistCurrent = {name:`${this.audiofile}.mp3`};
     */

   

   
    
     
    /*   const uri = await firebase
        .storage()
        .ref("fileName.audio/mp3")
        .getDownloadURL();
  
      console.log("uri:", uri); */
  
    // Listen for state changes, errors, and completion of the upload.
    /* return uploadAudio.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {},
      (error) => {
        console.dir(error);
        
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadAudio.snapshot;
        console.dir(downloadURL);
        return new Promise((resolve, reject) => {
          resolve(downloadURL);

        
        });
      }
    );
     */
   
  
  
 
  //------------------------------------
  async uploadLiveImage(){
    const file = (<HTMLInputElement>document.getElementById('id2')).files[0];
 
    const ref = this.afs.ref('Live' +'/'+(await this.authObj.currentUser).uid+ '/' + this.artistCurrent.recordname +'/' + file.name);
 
    ref.put(file).then(res => {
 
      ref.getDownloadURL().subscribe(url => {
 
        this.artistCurrent.imgURL2 = url;
 
      })
    }).catch(e => {
      console.log(e);
    })
 
  }
   //------------------------------------
  showToast(msg) {
    this.toastCtrl
      .create({
        message: msg,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }
  async logout() {
    await this.authObj.signOut();
    this.router.navigateByUrl("/view-artist");
  }
}
