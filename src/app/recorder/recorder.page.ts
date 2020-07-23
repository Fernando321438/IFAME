import { Component, OnInit } from '@angular/core';
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { File } from "@ionic-native/file/ngx";
import { AngularFireStorage,AngularFireUploadTask } from "@angular/fire/storage";
import * as firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';
import { Artist, ArtistService } from "../services/artist.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'jquery';


@Component({
  selector: 'app-home',
  templateUrl: 'recorder.page.html',
  styleUrls: ['recorder.page.scss'],
})
export class RecorderPage {
  status: string = "";
  audiofile: MediaObject = this.media.create(this.file.externalRootDirectory + '/audiofile.mp3');
  audio: any = {};
  Uri: any;
  UploadTask: any;
  cb: any;
  url: string;
  blob: any;
  artist: Artist;
  artistCurrent:any={};
  numShards:any;
  count: any;
 

  constructor(private toastCtrl: ToastController, private media: Media, private file: File, private afs: AngularFireStorage, private auth: AngularFireAuth, private artistService: ArtistService, private activatedRoute: ActivatedRoute, private afstore: AngularFirestore, private readonly router: Router,    private authObj : AngularFireAuth, private afStorage:AngularFireStorage,private db:AngularFireDatabase) { }

  



getFiles(){
let ref = this.db.list('fiels');

return ref.snapshotChanges()
.map(changes => {
return changes.map(c=>({key: c.playload.key, ...c.playload.val()})
   );
})
}


UploadToStorage(information): AngularFireUploadTask{
  let newName = '${new Date().getTime()}.tx';


return this.afStorage.ref('files/${neName}').putString(information);
}





StoreInfoToDatabase(metainfo){
  let toSave= {
    created: metainfo.timeCreated,
    url: metainfo.dowloadURLs[0],
    fullPath: metainfo.fullPath
    contentType: metainfo.contentType
  }
  return this.db.list('files').push(toSave);


}
DeleteFile(file)
{
let key = file.key;
let storagePath = file.fullPath;

this.db.list('fiels').remove(key);
//aggiunta di pattttttttt vedere anche sopra 
return this.afStorage.ref(storagePath).delete();

}
}