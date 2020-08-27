import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.page.html',
  styleUrls: ['./audio-player.page.scss'],
})
export class AudioPlayerPage implements OnInit, AfterViewInit {
  @Input() src: string;

  @ViewChild('player') playerElementRef: ElementRef;

  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;
  audio:any;

  private _player: HTMLAudioElement;

  constructor() { }

  
  ngOnInit() {
    this.audio = new Audio();
    this.audio.src = "https://firebasestorage.googleapis.com/v0/b/registrazione-utenti-2f9ed.appspot.com/o/Digital%2Fy0zPGrxlXIWbYgNPwUxJd2sNdbY2%2FRoads%20Untraveled%2Flinkin-park-roads-untraveled.mp3?alt=media&token=6c0687eb-23fc-46cf-82b5-74d7be14159a";
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
 
   ngAfterViewInit() {
      this._player = this.playerElementRef.nativeElement;
      this._bindPlayerEvents();
  }

  async play() {
      this._player.paused ? this._player.play() : this._player.pause();
  }

  seek({ detail: { value } }: { detail: { value: number } }) {
      this._player.currentTime = value;
  }

   _bindPlayerEvents() {
      this._player.addEventListener('playing', () => {
          this.isPlaying = true;
      });

      this._player.addEventListener('pause', () => {
          this.isPlaying = false;
      });

      this._player.addEventListener('timeupdate', () => {
          this.currentTime = Math.floor(this._player.currentTime);
      });

      this._player.addEventListener('seeking', () => {
          this.isLoading = true;
      });

      this._player.addEventListener('seeked', () => {
          this.isLoading = false;
      });

      this._player.addEventListener('loadstart', () => {
          this.isLoading = true;
      });

      this._player.addEventListener('loadeddata', () => {
          this.isLoading = false;
          this.duration = Math.floor(this._player.duration);
      });
  } 
}
