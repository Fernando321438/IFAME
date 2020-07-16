import { Component } from '@angular/core';
import {Media,MediaObject} from "@ionic-native/media/ngx";
import {File} from "@ionic-native/file/ngx";
import {AngularFireStorage} from "@angular/fire/storage";
import * as firebase from 'firebase/app';
@Component({
selector: 'app-home',
templateUrl: 'recorder.page.html',
styleUrls: ['recorder.page.scss'],
})
export class RecorderPage {
status:string="";
audiofile:MediaObject= this.media.create(this.file.externalRootDirectory+'/audiofile.mp3');
audio : any;
Uri:any;
    UploadTask: any;
constructor(private media:Media,private file:File,private afs:AngularFireStorage) {



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
upload1(){firebase.storage().ref('audio');}

upload(){

// File or Blob
/* var file = this.afs.ref("audio"); */

// Create the file metadata
var metadata = this.afs.ref.apply(this.audiofile)
        .setContentType("audio/mpeg")
        .build();
this.audio = this.audiofile;
// Upload file and metadata to the path 'audio/audio.mp3'
 this.afs.ref("audio/"+this.audio).put(metadata);

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