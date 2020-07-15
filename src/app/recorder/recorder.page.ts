import { Component, OnInit } from '@angular/core';
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { File } from "@ionic-native/file/ngx";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { AngularFireAuth} from "@angular/fire/auth";
import { Base64 } from 'js-base64';
import { Observable } from 'rxjs';


@Component({
selector: 'app-recorder',
templateUrl: './recorder.page.html',
styleUrls: ['./recorder.page.scss'],
})
export class RecorderPage implements OnInit {
audio:any=[];

status: String ="";
audioFile : MediaObject;
recording: boolean;
constructor(private media:Media,private file: File, private auth : AngularFireAuth,private afStorage : AngularFireStorage,private base64:Base64) {

}

ngOnInit() {
}

async RecordAudio(){
/* this.audioFile = this.media.create(this.file + 'audiofile.mp3')
*/
let filePath: string = 'this.file.mp3';
this.base64.encodeFile(filePath).then((base64File: string) => {
console.log(base64File);
}, (err) => {
console.log(err);
});
this.recording = true;
this.file.createFile(this.file.tempDirectory, 'my_file.m4a', true);
this.audio=this.audioFile;
this.audioFile.startRecord();
this.status= "recording...";

}


async StopRecording(){
this.recording = false;
this.audioFile.stopRecord();
this.status= "Stopped";

}
async UploadRecord(){
this.storeRecord().subscribe((downloadURL) => {
console.log("Finished storing record");
console.log("Download URL is " + downloadURL);
this.audioFile= downloadURL;
});
/* let file = (document.getElementById(this.audio));
let ref = this.afStorage.ref('Record/' + this.auth.currentUser.uid + '/' + this.audio);

ref.put(file).then(res => {

ref.getDownloadURL().subscribe(mp3 => {

this.audio.audioFile= mp3;

})
}) */
}
storeRecord() {
return Observable.create((observer) => {
console.log('Saving record');
const filePath = ${this.file.tempDirectory}my_file.m4a;
console.log("Path to record is " + filePath);
const readFile: any = window['resolveLocalFileSystemURL'];
return readFile(filePath, (fileEntry) => {
return fileEntry.file((file) => {
const fileReader = new FileReader();
fileReader.onloadend = (result: any) => {
let arrayBuffer = result.target.result;
let blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'audio/m4a' });
console.log("Blob is ");
console.log(blob);
var storageRef = this.afStorage.ref('Record/' + this.audio.uid + '/my-file.m4a');
console.log("Storage reference is " + storageRef);
console.log('Upload started:');
}}
)})
})
}

}