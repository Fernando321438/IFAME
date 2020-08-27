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
exports.AudioPlayerPage = void 0;
var core_1 = require("@angular/core");
var AudioPlayerPage = /** @class */ (function () {
    function AudioPlayerPage() {
        this.isPlaying = false;
        this.isLoading = false;
        this.currentTime = 0;
        this.duration = 0;
    }
    AudioPlayerPage.prototype.ngOnInit = function () {
        this.audio = new Audio();
        this.audio.src = "https://firebasestorage.googleapis.com/v0/b/registrazione-utenti-2f9ed.appspot.com/o/Digital%2Fy0zPGrxlXIWbYgNPwUxJd2sNdbY2%2FRoads%20Untraveled%2Flinkin-park-roads-untraveled.mp3?alt=media&token=6c0687eb-23fc-46cf-82b5-74d7be14159a";
        this.audio.load();
    };
    AudioPlayerPage.prototype.playAudio = function () {
        this.audio.play();
        this.audio.loop = true;
    };
    AudioPlayerPage.prototype.stopAudio = function () {
        this.audio.pause();
        this.audio.loop = false;
    };
    AudioPlayerPage.prototype.ngOnDestroy = function () {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
    };
    AudioPlayerPage.prototype.ngAfterViewInit = function () {
        this._player = this.playerElementRef.nativeElement;
        this._bindPlayerEvents();
    };
    AudioPlayerPage.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._player.paused ? this._player.play() : this._player.pause();
                return [2 /*return*/];
            });
        });
    };
    AudioPlayerPage.prototype.seek = function (_a) {
        var value = _a.detail.value;
        this._player.currentTime = value;
    };
    AudioPlayerPage.prototype._bindPlayerEvents = function () {
        var _this = this;
        this._player.addEventListener('playing', function () {
            _this.isPlaying = true;
        });
        this._player.addEventListener('pause', function () {
            _this.isPlaying = false;
        });
        this._player.addEventListener('timeupdate', function () {
            _this.currentTime = Math.floor(_this._player.currentTime);
        });
        this._player.addEventListener('seeking', function () {
            _this.isLoading = true;
        });
        this._player.addEventListener('seeked', function () {
            _this.isLoading = false;
        });
        this._player.addEventListener('loadstart', function () {
            _this.isLoading = true;
        });
        this._player.addEventListener('loadeddata', function () {
            _this.isLoading = false;
            _this.duration = Math.floor(_this._player.duration);
        });
    };
    __decorate([
        core_1.Input()
    ], AudioPlayerPage.prototype, "src");
    __decorate([
        core_1.ViewChild('player')
    ], AudioPlayerPage.prototype, "playerElementRef");
    AudioPlayerPage = __decorate([
        core_1.Component({
            selector: 'app-audio-player',
            templateUrl: './audio-player.page.html',
            styleUrls: ['./audio-player.page.scss']
        })
    ], AudioPlayerPage);
    return AudioPlayerPage;
}());
exports.AudioPlayerPage = AudioPlayerPage;
