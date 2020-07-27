import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { data } from 'jquery';
import { InAppBrowserEvent, InAppBrowserOriginal } from '@ionic-native/in-app-browser';
import { DataService } from '../data.service';
import { title } from 'process';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.page.html',
  styleUrls: ['./my-files.page.scss'],
})
export class MyFilesPage implements OnInit {

  files: Observable<any[]>;
  constructor(private iab: InAppBrowserOriginal,public navCtrl: NavController, private dataService: DataService, private alertCtrl:AlertController,private toastCtrl:ToastController ) { 
    this.files = this.dataService.getFiles();
  }

  ngOnInit() {
  
  }
  async addFile(){
 let inputAlert = this.alertCtrl.create({
/*    title : "Store new information",
 */
   inputs: [
     {
       name:'info',
       placeholder:'lorem ipsum dolor...'
     }
   ],
   buttons: [{
     text: 'Cancel',
     role: 'cancel',
   },
  {
    text: 'Store',
    handler: data => {
      this.uploadInformation(data.info);
    
    }
  } 
 ]
     

     }); 
     (await inputAlert).present();
}

uploadInformation(text){
let upload = this.dataService.uploadToStorage(text);

upload.then().then(res =>{
  console.log('res',res);
  this.dataService.storeInfoToDatabase(res.metadata).then(async ()=>{
    let toast = this.toastCtrl.create({
      message: 'New File added!',
      duration: 3000
    });
    //aggiunto await toast.present
    (await toast).present();
  })
});

}

deleteFile(file){
  this.dataService.deleteFile(file).subscribe(()=>{
let toast = this.toastCtrl.create({
  message: 'File removed',
  duration: 3000
});
  });



}

viewFile(url){
this.iab.create(url);

  
}
}
