import { Component, OnInit } from '@angular/core';
import { NavController, Platform} from '@ionic/angular';
import { SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef} from '@angular/core';

@Component({
selector: 'app-recorder',
templateUrl: './recorder.page.html',
styleUrls: ['./recorder.page.scss'],
})
export class RecorderPage implements OnInit {
matches: string[];
isRecording = false;

constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition, private plt: Platform, private cd : ChangeDetectorRef ) {

}

ngOnInit() {
}
startListening(){
    let options = {
        language: 'en-US'
    
    }
    this.speechRecognition.startListening(options).subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
}

stopListening(){
  this.speechRecognition.stopListening().then(() => {
   this.isRecording = false;
  });
}

getPermission(){
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) =>{
        if(!hasPermission) {
            this.speechRecognition.requestPermission();
        }
    });

  

}

/* isIos(){
    return this.plt.is('ios');
} */

}
 