"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ViewUsers2Page = void 0;
var core_1 = require("@angular/core");
var ViewUsers2Page = /** @class */ (function () {
    /*   is_playing: boolean = false;
      is_in_play: boolean = false;
      is_ready: boolean = false;
    
      message: any;
    
     //  duration: any = -1; ;
      position: any = 0;
      display_duration:any;
      display_position : any;
      get_duration_interval: any;
      get_position_interval: any;
    
      mp3s: any[0];
      artistCurrent: any = {};
    
    
    
      isPlaying = false;
      isLoading = false;
      currentTime = 0;
      duration = 0;
      audios=[];
      audio:any; */
    function ViewUsers2Page(afs, platform, loadingCtrl, toastCtrl, file, transfer, media, datePipe, afAuth, router, afStorage, authObj) {
        var _this = this;
        this.afs = afs;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.file = file;
        this.transfer = transfer;
        this.media = media;
        this.datePipe = datePipe;
        this.afAuth = afAuth;
        this.router = router;
        this.afStorage = afStorage;
        this.authObj = authObj;
        this.isPlaying = false;
        this.isLoading = false;
        this.currentTime = 0;
        this.duration = 0;
        this.imgURL = [];
        this.platform.ready().then(function () {
            if (_this.platform.is('ios')) {
                _this.storageDirectory = _this.file.dataDirectory;
            }
            else if (_this.platform.is('android')) {
                _this.storageDirectory = _this.file.externalDataDirectory;
            }
            else {
                _this.storageDirectory = _this.file.cacheDirectory;
            }
        });
        afs.collection('/Digital Record').valueChanges()
            .subscribe(function (songs) {
            _this.songs = songs;
            console.log(_this.songs);
        });
        /*  this.audio = new Audio();
         this.audio.src = "https://firebasestorage.googleapis.com/v0/b/registrazione-utenti-2f9ed.appspot.com/o/Digital%2Fy0zPGrxlXIWbYgNPwUxJd2sNdbY2%2FRoads%20Untraveled%2Flinkin-park-roads-untraveled.mp3?alt=media&token=6c0687eb-23fc-46cf-82b5-74d7be14159a";
         this.audio.load(); //Errore : non si può avere una lista di audio se la variabile audio è una stringa ,quindi bisogna vedere di mettere un array per avere una lista di audio
         this.audios=this.songs; */
    }
    ViewUsers2Page.prototype.ngOnInit = function () {
        this.audio = new Audio();
        this.audio.src = "https://firebasestorage.googleapis.com/v0/b/registrazione-utenti-2f9ed.appspot.com/o/Digital%2Fy0zPGrxlXIWbYgNPwUxJd2sNdbY2%2FRoads%20Untraveled%2Flinkin-park-roads-untraveled.mp3?alt=media&token=6c0687eb-23fc-46cf-82b5-74d7be14159a";
        this.audio.load();
    };
    ViewUsers2Page.prototype.playAudio = function () {
        this.audio.play();
        this.audio.loop = true;
    };
    ViewUsers2Page.prototype.stopAudio = function () {
        this.audio.pause();
        this.audio.loop = false;
    };
    ViewUsers2Page.prototype.ngOnDestroy = function () {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
    };
    ViewUsers2Page.prototype.seek = function (_a) {
        var value = _a.detail.value;
        this._player.currentTime = value;
    };
    /* getDuration() {
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


 fmtMSS(s) {
   return this.datePipe.transform(s * 1000, 'mm:ss');


 }   */
    ViewUsers2Page.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afAuth.signOut()];
                    case 1:
                        _a.sent();
                        this.router.navigateByUrl('/view-users');
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Input()
    ], ViewUsers2Page.prototype, "src");
    __decorate([
        core_1.ViewChild('player')
    ], ViewUsers2Page.prototype, "playerElementRef");
    ViewUsers2Page = __decorate([
        core_1.Component({
            selector: 'app-view-users2',
            templateUrl: './view-users2.page.html',
            styleUrls: ['./view-users2.page.scss']
        })
    ], ViewUsers2Page);
    return ViewUsers2Page;
}());
exports.ViewUsers2Page = ViewUsers2Page;
