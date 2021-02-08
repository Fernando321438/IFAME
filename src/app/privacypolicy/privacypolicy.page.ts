import { Component, OnInit } from '@angular/core';
import { DocumentViewerOptions,DocumentViewer } from '@ionic-native/document-viewer';
import { NavController } from '@ionic/angular';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/File/ngx';
import { PreviewAnyFile} from '@ionic-native/preview-any-file/ngx';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';



@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.page.html',
  styleUrls: ['./privacypolicy.page.scss'],
})
export class PrivacypolicyPage {


  constructor(private fileOpener:FileOpener,  private platform: Platform,public previewAnyFile:PreviewAnyFile,public alertController: AlertController,public navCtrl: NavController) 
  {

  }
  
  PreviewPdfFile()
  {
    var url = "../../assets/Privacy_Policy_Shoma_APP.pdf";
    this.previewAnyFile.preview(url).then(()=>{

    },(error)=>{
      alert(JSON.stringify(error));
    })
  }
  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Privacy Policy',
      message: 'In Order to proceed click the checkbox below and click Agree',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'I agree the terms ',
          value: 'value1',
          checked: true
        }
      ],
      buttons: [
         {
          text: 'Agree',
          
          handler: () => {this.navCtrl.navigateForward("login-register")
            console.log('Confirm Agree');
          }
        },
        {
          text: 'Disagree',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Disagree');
          }
        }
      ]
    });

    await alert.present();
  }
}


