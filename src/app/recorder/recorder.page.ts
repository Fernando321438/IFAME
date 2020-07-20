import { Component } from '@angular/core';
import {Media,MediaObject} from "@ionic-native/media/ngx";
import {File} from "@ionic-native/file/ngx";
import {AngularFireStorage} from "@angular/fire/storage";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
selector: 'app-home',
templateUrl: 'recorder.page.html',
styleUrls: ['recorder.page.scss'],
})
export class RecorderPage {
status:string="";
audiofile:MediaObject= this.media.create(this.file.externalRootDirectory+'/audiofile.mp3');
audio: any = {};
Uri:any;
UploadTask: any;
cb:any;
url:string;
blob:any;
constructor(private media:Media,private file:File,private afs:AngularFireStorage,private auth:AngularFireAuth) {



}
RecordAudio(){
this.audiofile.startRecord();
this.status = "recording...";

}
StopRecording(){
this.audiofile.stopRecord();
this.status = "stopped";
/* this.afs.ref("music/sound/").put(this.audiofile);
 */
} 
   //FUNZIONANTE
    async uploadfile() {
    let file = (<HTMLInputElement>document.getElementById('avatar')).files[0];
    let ref = this.afs.ref('Audio/' + (await this.auth.currentUser).uid + '/' + file.name);

    ref.put(file).then(res => {

      ref.getDownloadURL().subscribe(mp3 => {

        this.audio = mp3;

      })
    }).catch(e => {
      console.log(e);
    })

  }

  async uploadToStorage() {

    this.getFileBlob();
    this.audio=this.audiofile;
       this.afs.ref('Audio'+(await this.auth.currentUser).uid + '/' + this.audiofile).put(this.blob);
          console.log('Uploaded a blob or file!');
       
   
}
 
  getFileBlob() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.audio);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function() {
    
    });
    xhr.send();
  };
 
  async sendAudio() {
    this.getFileBlob();
    this. uploadToStorage();
    
  }



  async sendAudioToSomewhere() {
    const base64 =  await this.getAudio();
   const blob = this.b64toBlob(base64, 'audio/mp3', 512); 
    await this.sendRemotely(blob);
    alert('done');
  }

  async getAudio() {
   var base64=this.audio;
   await this.afs.storage.ref('Audio').list().then(record => {this.audio=record});
  
   this.audio = this.audiofile;
    /*  this.afs.ref(base64.name).getMetadata().subscribe(mp3 => {

        this.audio = mp3;

    }) */
/*     var base64 = await this.file.getFile.apply(this.audiofile);
 */
    return base64;
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    this.audio=b64Data;
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

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

  async sendRemotely(blob:Blob) {
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











 
    async upload1(){
    let traccia = (document.getElementById('avatar'));
    let ref = this.afs.ref('Locali/' + (await this.auth.currentUser).uid + '/' + this.audiofile);

    ref.put(traccia).then(res => {

      ref.getDownloadURL().subscribe(mp3 => {

        this.audiofile = mp3;

      })
    }).catch(e => {
      console.log(e);
    })
}
/* upload1(){
    this.audio = this.audiofile;
    firebase.storage().ref('audio');
    this.afs.storage.ref('audio').listAll().then(result => {
        result.items.forEach(async ref => {
          this.audio.push({
            name: ref.name,
            full: ref.fullPath,
            url: await ref.getDownloadURL(),
            ref: ref
          });
        });
      });
}
*/

upload(){

// File or Blob
/* var file = this.afs.ref("audio"); */

// Create the file metadata
var metadata = this.afs.upload.apply(this.audiofile)
        .setContentType("audio/mpeg")
        .build();
this.audio = this.audiofile;
// Upload file and metadata to the path 'audio/audio.mp3'
 this.afs.upload.apply("audio/"+this.audio).put(metadata);

// Listen for state changes, errors, and completion of the upload.
 this.UploadTask.addOnProgressListener( this.UploadTask.TaskSnapshot() ({
   
  onProgress( taskSnapshot: { getBytesTransferred: () => number; getTotalByteCount: () => number; }) {
    const progress = (100.0 * taskSnapshot.getBytesTransferred()) / taskSnapshot.getTotalByteCount();
        this.System.out.println("Upload is " + progress + "% done");
    }
}).addOnPausedListener(this.UploadTask.TaskSnapshot() ({
    
    onPaused() {
        this.System.out.println("Upload is paused");
    }
}).addOnFailureListener() ({
   
    onFailure() {
        // Handle unsuccessful uploads
    }
}).addOnSuccessListener(this.UploadTask.TaskSnapshot())({
  
    onSuccess() {
        // Handle successful uploads on complete
    this.Uri.downloadUrl = this.taskSnapshot.getMetadata().getDownloadUrl();
   }
})))
}}