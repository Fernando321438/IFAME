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
exports.RecorderPage = void 0;
var core_1 = require("@angular/core");
var firebase = require("firebase/app");
var RecorderPage = /** @class */ (function () {
    function RecorderPage(toastCtrl, media, file, afs, auth, artistService, activatedRoute, afstore, router, authObj) {
        this.toastCtrl = toastCtrl;
        this.media = media;
        this.file = file;
        this.afs = afs;
        this.auth = auth;
        this.artistService = artistService;
        this.activatedRoute = activatedRoute;
        this.afstore = afstore;
        this.router = router;
        this.authObj = authObj;
        this.status = "";
        this.audiofile = this.media.create(this.file.externalRootDirectory + "/audiofile.mp3");
        this.audio = {};
        this.artistCurrent = {};
        this.records = [];
    }
    RecorderPage.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.activatedRoute.snapshot.paramMap.get("id");
        if (id) {
            this.artistService.getArtist(id).subscribe(function (artist) {
                _this.artist = artist;
            });
        }
    };
    RecorderPage.prototype.createCounter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, increment, storyRef, _a, _b, batch;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        db = firebase.firestore();
                        increment = firebase.firestore.FieldValue.increment(1);
                        _b = (_a = firebase
                            .firestore()
                            .collection("artist")).doc;
                        return [4 /*yield*/, this.authObj.currentUser];
                    case 1:
                        storyRef = _b.apply(_a, [(_c.sent()).uid +
                                "/Recorders/" +
                                "Record" +
                                this.count]);
                        batch = db.batch();
                        batch.set(storyRef, { record: increment });
                        batch.commit();
                        return [2 /*return*/];
                }
            });
        });
    };
    RecorderPage.prototype.SaveNameSong = function () {
        return __awaiter(this, void 0, void 0, function () {
            var datages, artistFire1, artistFire2, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.artistCurrent.songname && this.artistCurrent.imgURL && this.artistCurrent.digitalaudio)) return [3 /*break*/, 2];
                        datages = {
                            Songname: this.artistCurrent.songname,
                            imgURL: this.artistCurrent.imgURL,
                            digitalaudio: this.artistCurrent.digitalaudio,
                            createdAt: Date.now()
                        };
                        artistFire1 = this.afstore.collection("Digital Record/");
                        _b = (_a = artistFire1.ref).doc;
                        return [4 /*yield*/, this.authObj.currentUser];
                    case 1:
                        artistFire2 = _b.apply(_a, [(_c.sent()).uid + this.artistCurrent.songname]).set(datages)
                            /* artistFire2
                              .collection("Digital Record")
                              .doc("/" + this.artistCurrent.songname)
                              .set(datages) */
                            .then(function () {
                            //(await this.auth.currentUser).uid
                            _this.showToast("Song Title Added");
                        }, function (err) {
                            _this.showToast("Song Title Not Added");
                        })["catch"](function (e) {
                            console.log(e);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        this.showToast("Empty Record Field ");
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecorderPage.prototype.RecordAudio = function () {
        this.audiofile.startRecord();
        this.status = "recording...";
    };
    RecorderPage.prototype.StopRecording = function () {
        var _this = this;
        this.audiofile.stopRecord();
        this.status = "stopped";
        this.showToast("Record Added");
        (function (err) {
            _this.showToast("Record Not Added");
        });
        /*     this.afs.ref("music/sound/").put(this.audiofile);
         */
    };
    RecorderPage.prototype.upload2 = function (file) {
        return __awaiter(this, void 0, Promise, function () {
            var task, _a, _b, _c, _d, _e, error_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!(file && file.length)) return [3 /*break*/, 6];
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 5, , 6]);
                        file = this.audio;
                        _b = (_a = this.afs
                            .ref("Audio")).child;
                        return [4 /*yield*/, this.authObj.currentUser];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_f.sent()).uid])
                            .put(file)];
                    case 3:
                        task = _f.sent();
                        _d = (_c = this.afs).ref;
                        _e = "Audio";
                        return [4 /*yield*/, this.authObj.currentUser];
                    case 4:
                        _d.apply(_c, [_e + (_f.sent()).uid])
                            .getDownloadURL()
                            .toPromise();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _f.sent();
                        console.log(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //FUNZIONANTE
    RecorderPage.prototype.uploadfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, metadata, blob, uploadAudio, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.dir(this.file.externalDataDirectory);
                        fileName = {
                            name: this.file.externalDataDirectory + "/" + this.artistCurrent + ".mp3"
                        };
                        metadata = { contentType: "audio/mp3" };
                        blob = new Blob([fileName.name], { type: "audio/mp3" });
                        _b = (_a = this.afs.storage).ref;
                        _c = "Audio/";
                        return [4 /*yield*/, this.authObj.currentUser];
                    case 1:
                        uploadAudio = _b.apply(_a, [_c +
                                (_d.sent()).uid +
                                "/" +
                                this.artistCurrent.recordname])
                            .put(blob, metadata);
                        // Listen for state changes, errors, and completion of the upload.
                        return [2 /*return*/, uploadAudio.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                            function (snapshot) { }, function (error) {
                                console.dir(error);
                            }, function () {
                                // Upload completed successfully, now we can get the download URL
                                var downloadURL = uploadAudio.snapshot.downloadURL;
                                console.dir(downloadURL);
                                return new Promise(function (resolve, reject) {
                                    resolve(downloadURL);
                                });
                            })];
                }
            });
        });
    };
    RecorderPage.prototype.uploadToStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        file = this.getFileBlob();
                        this.audio = this.audiofile;
                        _b = (_a = this.afs).ref;
                        _c = "Audio";
                        return [4 /*yield*/, this.authObj.currentUser];
                    case 1:
                        _b.apply(_a, [_c + (_d.sent()).uid + "/" + this.audiofile])
                            .put(file);
                        console.log("Uploaded a blob or file!");
                        return [2 /*return*/];
                }
            });
        });
    };
    RecorderPage.prototype.getFileBlob = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.audio);
        xhr.responseType = "blob";
        xhr.addEventListener("load", function () { });
        xhr.send();
    };
    //--------------------------
    RecorderPage.prototype.sendAudio1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, ref, _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        file = document.getElementById("id").files[0];
                        _b = (_a = this.afs).ref;
                        _c = 'Digital/';
                        return [4 /*yield*/, this.authObj.currentUser];
                    case 1:
                        ref = _b.apply(_a, [_c + (_d.sent()).uid + '/' + this.artistCurrent.songname + '/' + file.name]);
                        ref.put(file).then(function (res) {
                            ref.getDownloadURL().subscribe(function (url) {
                                _this.artistCurrent.digitalaudio = url;
                                _this.showToast("Song added");
                            });
                        })["catch"](function (e) {
                            console.log(e);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //------------------------------------
    RecorderPage.prototype.uploadSongImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, ref, _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        file = document.getElementById('id2').files[0];
                        _b = (_a = this.afs).ref;
                        _c = 'Digital/';
                        return [4 /*yield*/, this.authObj.currentUser];
                    case 1:
                        ref = _b.apply(_a, [_c + (_d.sent()).uid + '/' + this.artistCurrent.songname + '/' + file.name]);
                        ref.put(file).then(function (res) {
                            ref.getDownloadURL().subscribe(function (url) {
                                _this.artistCurrent.imgURL = url;
                                _this.showToast("Song Image Added");
                            });
                        })["catch"](function (e) {
                            console.log(e);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    RecorderPage.prototype.sendAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        file = document.getElementById("avatar").files[0];
                        new Blob([JSON.stringify(file, null, 2)], { type: "audio/mp3" }); // usa l'API BLOB o File
                        _b = (_a = this.afs).ref;
                        _c = "Audio/";
                        return [4 /*yield*/, this.authObj.currentUser];
                    case 1:
                        _b.apply(_a, [_c +
                                (_d.sent()).uid +
                                "/" +
                                this.artistCurrent.recordname +
                                "/"])
                            .put(file);
                        console.log("Uploaded a blob or file!");
                        return [2 /*return*/];
                }
            });
        });
    };
    RecorderPage.prototype.sendAudioToSomewhere = function () {
        return __awaiter(this, void 0, void 0, function () {
            var base64, blob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAudio()];
                    case 1:
                        base64 = _a.sent();
                        blob = this.b64toBlob(base64, "audio/mp3", 512);
                        return [4 /*yield*/, this.sendRemotely(blob)];
                    case 2:
                        _a.sent();
                        alert("done");
                        return [2 /*return*/];
                }
            });
        });
    };
    RecorderPage.prototype.getAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            var base64;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base64 = this.audio;
                        return [4 /*yield*/, this.afs.storage
                                .ref("Audio")
                                .list()
                                .then(function (record) {
                                _this.audio = record;
                            })];
                    case 1:
                        _a.sent();
                        this.audio = this.audiofile;
                        /*  this.afs.ref(base64.name).getMetadata().subscribe(mp3 => {
                    
                            this.audio = mp3;
                    
                        }) */
                        return [2 /*return*/, base64];
                }
            });
        });
    };
    RecorderPage.prototype.b64toBlob = function (b64Data, contentType, sliceSize) {
        this.audio = b64Data;
        contentType = contentType || "";
        sliceSize = sliceSize || 512;
        var byteCharacters = btoa(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };
    RecorderPage.prototype.sendRemotely = function (blob) {
        return __awaiter(this, void 0, void 0, function () {
            var traccia, ref, _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        traccia = this.audio;
                        _b = (_a = this.afs).ref;
                        _c = "Audio/";
                        return [4 /*yield*/, this.auth.currentUser];
                    case 1:
                        ref = _b.apply(_a, [_c + (_d.sent()).uid + "/" + this.audiofile]);
                        ref
                            .put(traccia)
                            .then(function (res) {
                            ref.getDownloadURL().subscribe(function (mp3) {
                                _this.audiofile = mp3;
                            });
                        })["catch"](function (e) {
                            console.log(e);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /*   upload() {
   
       // File or Blob
      var file = this.afs.ref("audio");
   
       // Create the file metadata
       var metadata = this.afs.ref.apply(this.audiofile)
         .setContentType("audio/mpeg")
         .build();
       this.audio = this.audiofile;
       // Upload file and metadata to the path 'audio/audio.mp3'
       this.afs.ref("audio/" + this.audio).put(metadata);
   
       // Listen for state changes, errors, and completion of the upload.
       this.UploadTask.addOnProgressListener(this.UploadTask.TaskSnapshot()({
   
         onProgress(taskSnapshot: { getBytesTransferred: () => number; getTotalByteCount: () => number; }) {
           const progress = (100.0 * taskSnapshot.getBytesTransferred()) / taskSnapshot.getTotalByteCount();
           this.System.out.println("Upload is " + progress + "% done");
         }
       }).addOnPausedListener(this.UploadTask.TaskSnapshot()({
   
         onPaused() {
           this.System.out.println("Upload is paused");
         }
       }).addOnFailureListener()({
   
         onFailure() {
           // Handle unsuccessful uploads
         }
       }).addOnSuccessListener(this.UploadTask.TaskSnapshot())({
   
         onSuccess() {
           // Handle successful uploads on complete
           this.Uri.downloadUrl = this.taskSnapshot.getMetadata().getDownloadUrl();
         }
       })))
     }*/
    RecorderPage.prototype.showToast = function (msg) {
        this.toastCtrl
            .create({
            message: msg,
            duration: 2000
        })
            .then(function (toast) { return toast.present(); });
    };
    RecorderPage.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authObj.signOut()];
                    case 1:
                        _a.sent();
                        this.router.navigateByUrl("/view-artist");
                        return [2 /*return*/];
                }
            });
        });
    };
    RecorderPage = __decorate([
        core_1.Component({
            selector: "app-home",
            templateUrl: "recorder.page.html",
            styleUrls: ["recorder.page.scss"]
        })
    ], RecorderPage);
    return RecorderPage;
}());
exports.RecorderPage = RecorderPage;
