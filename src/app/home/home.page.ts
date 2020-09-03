import { Component,OnInit, ElementRef, ViewChild, Input } from '@angular/core';

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

private _player: HTMLAudioElement;
/* title = 'I Have a Dream';
filename = 'I_Have_a_Dream.mp3'; */
/* curr_playing_file: MediaObject; */
storageDirectory: any;
imgURL:any=[];
songname:any;
songs: any[0];
  constructor() {}
  
ngOnInit()
{
this.audio = new Audio();
this.audio.src ="https://firebasestorage.googleapis.com/v0/b/registrazione-utenti-2f9ed.appspot.com/o/Digital%2Fy0zPGrxlXIWbYgNPwUxJd2sNdbY2%2Fsasso%2Ffred-de-palma-una-volta-ancora-feat-ana-mena-official-video.mp3?alt=media&token=1403ded4-1373-4eaa-a193-8cf607694799";
this.audio.load();
}

playAudio() { 
this.audio.play();
this.audio.loop = true;
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
seek({ detail: { value } }: { detail: { value: number } }) {
this._player.currentTime = value;
}
  
  }

