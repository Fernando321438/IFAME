import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { data } from 'jquery';

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.page.html',
  styleUrls: ['./myfiles.page.scss'],
})
export class MyfilesPage implements OnInit {
  files: Observable<any[]>;
  constructor(private iab: InAppBrowser, public navCtrl: NavController, private dataProvider: DataProvider, private alertCtrl:AlertController,private toastCtrl:ToastController) { 
this.files = this.dataProvider.getFiles();
  }
  async addFile(){
let inputAlert = this.alertCtrl.create({
title: 'Store new information',
inputs: [

  {
    name:'info',
    placeholder: 'lorem ipsum dolor...'
  }
],
buttons: [
  {
    text: 'Cancel',
    role: 'cancel'
  },
  {
    text:'Store',
    handler: data=> {
      this.uploadInformation(data.info);
    }
  }
]


  
});
  (await inputAlert).present();
}
uploadInformation(text){
let upload= this.dataProvider.uploadToStorage(text);
upload.then().then(res =>{
this.dataProvider.storeInfoToDatabase(res.metadata).then(()=>{
  let toast = this.toastCtrl.create({

    message: 'new File added:',
    duration: 3000
    
  });
  toast.present();
});

});
  
}
deleteFile(file){
this.dataProvider.deleteFile(file).subscribe(()=>{
  let toast = this.toastCtrl.create({

    message: 'remove',
    duration: 3000
    
  });
  toast.present();
});

}
viewFile(url){

this.iab.create(url);
}

  

}
