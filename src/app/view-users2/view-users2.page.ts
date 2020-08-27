import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController,Platform,ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

import { FileTransfer,FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-view-users2',
  templateUrl: './view-users2.page.html',
  styleUrls: ['./view-users2.page.scss'],
})
export class ViewUsers2Page implements OnInit {
  title = 'I Have a Dream';
  filename = 'I_Have_a_Dream.mp3';
  curr_playing_file: MediaObject;
  storageDirectory: any;
  imgURL:any=[];
  songname:any;

  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = false;

  message: any;

 /*  duration: any = -1; */
  position: any = 0;
  display_duration:any;
  display_position : any;
  get_duration_interval: any;
  get_position_interval: any;
  songs: any[0];
  mp3s: any[0];
  artistCurrent: any = {};



  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;
  audios=[]; 
  audio:any;

  constructor(private afs:AngularFirestore,private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private file: File,
    private transfer: FileTransfer,
    private media: Media,
    private datePipe: DatePipe, 
    private afAuth: AngularFireAuth,
    private router: Router,
    private afStorage:AngularFireStorage,
    private authObj: AngularFireAuth)
     {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.dataDirectory;
      } else if (this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      } else {
        this.storageDirectory = this.file.cacheDirectory;
      }
    });
    afs.collection('/Digital Record').valueChanges()
    .subscribe(songs => {
      this.songs = songs;
      console.log(this.songs);

    })  
    
    this.audio = new Audio();
    this.audio.src = "https://firebasestorage.googleapis.com/v0/b/registrazione-utenti-2f9ed.appspot.com/o/Digital%2Fy0zPGrxlXIWbYgNPwUxJd2sNdbY2%2FRoads%20Untraveled%2Flinkin-park-roads-untraveled.mp3?alt=media&token=6c0687eb-23fc-46cf-82b5-74d7be14159a";
    this.audio.load(); //Errore : non si può avere una lista di audio se la variabile audio è una stringa ,quindi bisogna vedere di mettere un array per avere una lista di audio
    this.audios=this.songs;
  }
  
  ngOnInit() { 
 
  /*  this.prepareAudioFile();  */
  }
  getDuration() {
    this.curr_playing_file = this.media.create(this.songs);
    // On occassions, the plugin only gives duration of the file if the file is played
    // at least once
    this.curr_playing_file.play();
    this.curr_playing_file.setVolume(0.0);  // you don't want users to notice that you are playing the file
    const self = this;
    // The plugin does not  give the correct duration on playback start
    // need to check for duration repeatedly
    let temp_duration = self.duration;
    this.get_duration_interval = setInterval(() => {
      if (self.duration === -1 || !self.duration) {
        self.duration = ~~(self.curr_playing_file.getDuration());  // make it an integer
      } else {
        if (self.duration !== temp_duration) {
          temp_duration = self.duration;
        }
        else {
          self.curr_playing_file.stop();
          self.curr_playing_file.release();
          clearInterval(self.get_duration_interval);
          this.display_duration = this.fmtMSS(self.duration);
          self.playRecording();
        }
      }
    }, 100);
  }
  getAndSetCurrentAudioPosition() {
    const diff = 1;
    const self = this;
    this.get_position_interval = setInterval(() => {
      const last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then((position) => {
        if (position >= 0 && position < self.duration) {
          if (Math.abs(last_position - position) >= diff) {
            // set position
            self.curr_playing_file.seekTo(last_position * 1000);
          } else {
            // update position for display
            self.position = position;
            this.display_position = this.fmtMSS(self.position);
          }
        } else if (position >= self.duration) {
          self.stopPlayRecording();
          self.playRecording();
        }
      });
    }, 100);
  }

  controlSeconds(action) {
    const step = 5;
    const numberRange = this.position;
    switch (action) {
      case 'back':
        this.position = numberRange < step ? 0.001 : numberRange - step;
        break;
      case 'forward':
        this.position = numberRange + step < this.duration ? numberRange + step : this.duration;
        break;
      default:
        break;
    }
  }
  onStatusUpdate(){
  this.curr_playing_file.onStatusUpdate.subscribe(status => {
    switch (status) {
      case 1: // 1. Starting
        break;
      case 2:   // 2: playing
        this.is_playing = true;
        break;
      case 3:   // 3: pause
        this.is_playing = false;
        break;
      case 4:   // 4: stop
      default:
        this.is_playing = false;
        break;
    }
  });
}
playRecording() {
  /* this.curr_playing_file.play(); */
  this.audio.play();
   this.audio.loop = true;
  this.toastCtrl
    .create({
      message: `Start playing from ${this.fmtMSS(this.position)}`,
      duration: 2000
    })
    .then(toastEl => toastEl.present());
}

pausePlayRecording() {
  /* this.curr_playing_file.pause(); */
  this.audio.pause(); 
  this.audio.loop = false; 
  this.toastCtrl
    .create({
      message: `Paused at ${this.fmtMSS(this.position)}`,
      duration: 2000
    })
    .then(toastEl => toastEl.present());
}

stopPlayRecording() {
  this.curr_playing_file.stop();
  this.curr_playing_file.release();
  clearInterval(this.display_position);
  this.position = 0;
}

  /*  prepareAudioFile() {
  
   
    this.platform.ready().then(() => {
      this.file
        .resolveDirectoryUrl(this.storageDirectory)
        .then(resolvedDirectory => {
          // inspired by: https://github.com/ionic-team/ionic-native/issues/1711
          console.log('resolved  directory: ' + resolvedDirectory.nativeURL);
          this.file
            .checkFile(resolvedDirectory.nativeURL, this.filename)
            .then(data => {
              if (data == true) {
                // exist
                this.getDurationAndSetToPlay();
              } else {
                // not sure if File plugin will return false. go to download
                console.log('not found!');
                throw { code: 1, message: 'NOT_FOUND_ERR' };
              }
            })
            .catch(async err => {
              console.log('Error occurred while checking local files:');
              console.log(err);
              if (err.code == 1) {
                // not found! download!
                console.log('not found! download!');
                let loadingEl = await this.loadingCtrl.create({
                  message: 'Downloading the song from the web...'
                });
                loadingEl.present();
                const fileTransfer: FileTransferObject = this.transfer.create();
                fileTransfer
                  .download(this.songs, this.storageDirectory + this.filename)
                  .then(entry => {
                    console.log('download complete' + entry.toURL());
                    loadingEl.dismiss();
                    this.getDurationAndSetToPlay();
                  })
                  .catch(err_2 => {
                    console.log('Download error!');
                    loadingEl.dismiss();
                    console.log(err_2);
                  });
              }
            });
        });
    });
  }

  createAudioFile(pathToDirectory, filename): MediaObject {
    if (this.platform.is('ios')) {
      //ios
      return this.media.create(
        pathToDirectory.replace(/^file:\/\//, '') + '/' + filename
      );
    } else {
      // android
      return this.media.create(pathToDirectory + filename);
    }
  }

  getDurationAndSetToPlay() {
    this.curr_playing_file = this.createAudioFile(
      this.storageDirectory,
      this.filename
    );

    this.curr_playing_file.play();
    this.curr_playing_file.setVolume(0.0); // you don't want users to notice that you are playing the file
    let self = this;
    this.get_duration_interval = setInterval(function () {
      if (self.duration == -1) {
        self.duration = ~~self.curr_playing_file.getDuration(); // make it an integer
      } else {
        self.curr_playing_file.stop();
        self.curr_playing_file.release();
        self.setRecordingToPlay();
        clearInterval(self.get_duration_interval);
      }
    }, 100);
  }

  getAndSetCurrentAudioPosition() {
    let diff = 1;
    let self = this;
    this.get_position_interval = setInterval(function () {
      let last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then(position => {
        if (position >= 0 && position < self.duration) {
          if (Math.abs(last_position - position) >= diff) {
            // set position
            self.curr_playing_file.seekTo(last_position * 1000);
          } else {
            // update position for display
            self.position = position;
          }
        } else if (position >= self.duration) {
          self.stopPlayRecording();
          self.setRecordingToPlay();
        }
      });
    }, 100);
  }

  setRecordingToPlay() {
    this.curr_playing_file = this.createAudioFile(
      this.storageDirectory,
      this.filename
    );
    this.curr_playing_file.onStatusUpdate.subscribe(status => {
      // 2: playing
      // 3: pause
      // 4: stop
      this.message = status;
      switch (status) {
        case 1:
          this.is_in_play = false;
          break;
        case 2: // 2: playing
          this.is_in_play = true;
          this.is_playing = true;
          break;
        case 3: // 3: pause
          this.is_in_play = true;
          this.is_playing = false;
          break;
        case 4: // 4: stop
        default:
          this.is_in_play = false;
          this.is_playing = false;
          break;
      }
    });
    console.log('audio file set');
    this.message = 'audio file set';
    this.is_ready = true;
    this.getAndSetCurrentAudioPosition();
  }

  playRecording() {
    this.curr_playing_file.play();
    this.toastCtrl
      .create({
        message: `Start playing from ${this.fmtMSS(this.position)}`,
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }

  pausePlayRecording() {
    this.curr_playing_file.pause();
    this.toastCtrl
      .create({
        message: `Paused at ${this.fmtMSS(this.position)}`,
        duration: 2000
      })
      .then(toastEl => toastEl.present());
  }

  stopPlayRecording() {
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    clearInterval(this.get_position_interval);
    this.position = 0;
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
*/
  fmtMSS(s) {
    return this.datePipe.transform(s * 1000, 'mm:ss');


  }  
  async logout() {
    await this.afAuth.signOut();
    this.router.navigateByUrl('/view-users');
  }
}
