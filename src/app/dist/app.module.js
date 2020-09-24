"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var ngx_1 = require("@ionic-native/splash-screen/ngx");
var ngx_2 = require("@ionic-native/status-bar/ngx");
var storage_1 = require("@angular/fire/storage");
var fire_1 = require("@angular/fire");
var auth_1 = require("@angular/fire/auth");
var database_1 = require("@angular/fire/database");
var firestore_1 = require("@angular/fire/firestore");
var environment_1 = require("../environments/environment");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var http_1 = require("@angular/common/http");
var ngx_3 = require("@ionic-native/geolocation/ngx");
var ngx_4 = require("@ionic-native/media/ngx");
var ngx_5 = require("@ionic-native/file/ngx");
var animations_1 = require("@angular/platform-browser/animations");
var animations_2 = require("@angular/platform-browser/animations");
var ngx_6 = require("@ionic-native/file-transfer/ngx");
var common_1 = require("@angular/common");
var angular_2 = require("@ionic/angular");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            entryComponents: [],
            imports: [platform_browser_1.BrowserModule, angular_1.IonicModule.forRoot(), app_routing_module_1.AppRoutingModule, http_1.HttpClientModule,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebase),
                auth_1.AngularFireAuthModule,
                database_1.AngularFireDatabaseModule,
                firestore_1.AngularFirestoreModule,
                storage_1.AngularFireStorageModule,
                animations_2.NoopAnimationsModule,
                animations_1.BrowserAnimationsModule,
            ],
            providers: [
                ngx_3.Geolocation,
                firestore_1.AngularFirestoreModule,
                ngx_2.StatusBar,
                ngx_1.SplashScreen,
                ngx_4.Media,
                ngx_5.File,
                animations_1.BrowserAnimationsModule,
                animations_2.NoopAnimationsModule,
                ngx_6.FileTransfer,
                ngx_6.FileTransferObject,
                common_1.DatePipe,
                angular_2.LoadingController,
                angular_2.Platform,
                angular_2.ToastController,
                { provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
