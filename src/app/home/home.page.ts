import { Component } from '@angular/core';
import {Media,MediaObject} from "@ionic-native/media/ngx";
import {File} from "@ionic-native/file/ngx";
import {FileTransfer,FileUploadOptions,FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx'; 
import {FilePath} from '@ionic-native/file-path/ngx';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
uploadText:any;
dowloadText:any;
fileTransfer:FileTransferObject;

status:string="";
audiofile:MediaObject= this.media.create(this.file.externalRootDirectory+'/audiofile.mp3');

  constructor(private media:Media,private file:File, private transfer:FileTransfer,private filePath:FilePath,private fileChooser:FileChooser) {

    this.uploadText ="";
    this.dowloadText="";



  }
  UploadFile(){
    this.fileChooser.open().then((uri)=>{
    this.filePath.resolveNativePath(uri).then((nativepath)=>{
    this.fileTransfer = this.transfer.create(); 
    let options:FileUploadOptions= {
      fileKey:'videofile',
      fileName:'video.mp4',
      chunkedMode:false,
      headers:{},
      mimeType:'video/mp4'
    }
    this.uploadText ="uploading";
    this.fileTransfer.upload(nativepath,'your endpoint api url',options).then((data)=>{
      alert("transfer done ="+ JSON.stringify(data));
      this.uploadText="";
    },(err)=>{
      this.uploadText="";
    })
    },(err)=>{
      alert(JSON.stringify(err));
    })
    },(err)=>{
      alert(JSON.stringify(err));
    }
    
    )
  }
    RecordAudio(){
      this.audiofile.startRecord();
      this.status = "recording";
    

    }
  StopRecording(){
    this.audiofile.stopRecord();
    this.status = "stopped";
  }

  AbortUpload(){
    this.fileTransfer.abort();
    alert("upload cancel");
  }
}
