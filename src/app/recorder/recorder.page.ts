import { Component } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular'; 
import { 
MediaCapture,
MediaFile,
CaptureError
} from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx'
const MEDIA_FOLDER_NAME = 'my_media';

@Component({
selector: 'app-home',
templateUrl: 'recorder.page.html',
styleUrls: ['recorder.page.scss'],
})
export class RecorderPage {
files = [];
constructor(
private mediaCapture: MediaCapture,
private file: File,
private media: Media,
private actionSheetController: ActionSheetController,
private plt: Platform
) {}
ngOnInit() {
this.plt.ready().then(() => {
let path = this.file.dataDirectory;
this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
() => {
this.loadFiles();
},
err => {
this.file.createDir(path, MEDIA_FOLDER_NAME, false);
}
);
});
}
loadFiles() {
this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
res => {
this.files = res;
},
err => console.log('error loading files: ', err)
);
}
async selectMedia() {
const actionSheet = await this.actionSheetController.create({
header: 'What would you like to add?',
buttons: [
{
text: 'Record Audio',
handler: () => {
this.recordAudio();
}
},
{
text: 'Cancel',
role: 'cancel'
}
]
});
await actionSheet.present();
}
// If you get problems on Android, try to ask for Permission first
// this.imagePicker.requestReadPermission().then(result => {
// console.log('requestReadPermission: ', result);
// this.selectMultiple();
// });
recordAudio() {
this.mediaCapture.captureAudio().then(
(data: MediaFile[]) => {
if (data.length > 0) {
this.copyFileToLocalDir(data[0].fullPath);
}
},)
/* (err: CaptureError) => console.error(err)
); */

}
copyFileToLocalDir(fullPath) {
let myPath = fullPath;
// Make sure we copy from the right location
if (fullPath.indexOf('file://') < 0) {
myPath = 'file://' + fullPath;
}
const ext = myPath.split('.').pop();
const d = Date.now();
const newName = `${d}.${ext}`;
const name = myPath.substr(myPath.lastIndexOf('/') + 1);
const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;
this.file.copyFile(copyFrom, name, copyTo, newName).then(
success => {
this.loadFiles();
},
error => {
console.log('error: ', error);
}
);
}
openFile(f: FileEntry) {
if (f.name.indexOf('.wav') > -1) {
// We need to remove file:/// from the path for the audio plugin to work
const path = f.nativeURL.replace(/^file:\/\//, '');
const audioFile: MediaObject = this.media.create(path);
audioFile.play();
} 
}
deleteFile(f: FileEntry) {
const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
this.file.removeFile(path, f.name).then(() => {
this.loadFiles();
}, err => console.log('error remove: ', err));
}}