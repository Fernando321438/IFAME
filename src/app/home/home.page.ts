import { Component,OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  paused:any;
  ended:any;
  
heart: any;
shuffle: any;
info: any;
audio:any;
toggle:{};
i:any;

@Input() src: string;

@ViewChild('player') playerElementRef: ElementRef;

isPlaying = false;
isLoading = false;
currentTime = 0;
duration = 0;
position: any = 0;
  storageDirectory: any;

  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = false;

  message: any;

  get_duration_interval: any;
  get_position_interval: any;
private _player: HTMLAudioElement;
/* title = 'I Have a Dream';
filename = 'I_Have_a_Dream.mp3'; */
/* curr_playing_file: MediaObject; */

imgURL:any=[];
songname:any;
songs: any[0];
  constructor(private datePipe: DatePipe, private toastCtrl: ToastController,
    ) {}
  
ngOnInit()
{
this.audio = new Audio();
this.audio.src ="https://firebasestorage.googleapis.com/v0/b/registrazione-utenti-2f9ed.appspot.com/o/Digital%2Fy0zPGrxlXIWbYgNPwUxJd2sNdbY2%2Fsasso%2Ffred-de-palma-una-volta-ancora-feat-ana-mena-official-video.mp3?alt=media&token=1403ded4-1373-4eaa-a193-8cf607694799";
this.audio.load();
}

playAudio() { 
this.audio.play();
this.audio.loop = true;
this.getAndSetCurrentAudioPosition();
}
stopAudio() {
this.audio.pause(); 
this.audio.loop = false;
}
ngOnDestroy() {
if(this.audio) {
this.audio.pause();
this.audio = null;
}
}


getAndSetCurrentAudioPosition() {
  let diff = 1;
  let self = this;
  this.get_position_interval = setInterval(function() {
    let last_position = self.position;
    self.audio.getCurrentPosition().then(position => {
      if (position >= 0 && position < self.duration) {
        if (Math.abs(last_position - position) >= diff) {
          // set position
          self.audio.seekTo(last_position * 1000);
        } else {
          // update position for display
          self.position = position;
        }
      } else if (position >= self.duration) {
        self.stopAudio();
        self.playAudio();
      }
    });
  }, 100);
}


seek({ detail: { value } }: { detail: { value: number } }) {
this._player.currentTime = value;
}

controlSeconds(action) {
  let step = 15;

  let number = this.position;
  switch (action) {
    case 'back':
      this.position = number < step ? 0.001 : number - step;
      this.toastCtrl
        .create({
          message: `Went back ${step} seconds`,
          duration: 2000
        })
        .then(toastEl => toastEl.present());
      break;
    case 'forward':
      this.position =
        number + step < this.duration ? number + step : this.duration;
      this.toastCtrl
        .create({
          message: `Went forward ${step} seconds`,
          duration: 2000
        })
        .then(toastEl => toastEl.present());
      break;
    default:
      break;
  }
}

fmtMSS(s) {
  return this.datePipe.transform(s * 1000, 'mm:ss');

}
  
  }

