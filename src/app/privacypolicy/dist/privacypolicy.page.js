"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PrivacypolicyPage = void 0;
var core_1 = require("@angular/core");
var PrivacypolicyPage = /** @class */ (function () {
    function PrivacypolicyPage(navCtrl, platform, document, file, transfer) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.document = document;
        this.file = file;
        this.transfer = transfer;
    }
    PrivacypolicyPage.prototype.ngOnInit = function () {
    };
    PrivacypolicyPage.prototype.openLocalpdf = function () {
        var options = {
            title: 'Privacypolicy'
        };
        this.document.viewDocument('/IFAME-ModificheGrafiche/src/assets/Privacy_Policy_Shoma_APP.pdf', options);
    };
    PrivacypolicyPage.prototype.downloadAndOpenPdf = function () {
        var _this = this;
        var path = null;
        if (this.platform.is('ios')) {
            path = this.file.documentsDirectory;
        }
        else {
            path = this.file.dataDirectory;
        }
        var transfer = this.transfer.create();
        transfer.download('IFAME-ModificheGrafiche/src/assets/Privacy_Policy_Shoma_APP.pdf', path + 'myfile.pdf').then(function (entry) {
            var url = entry.toURL();
            _this.document.viewDocument(url, 'IFAME-ModificheGrafiche/src/assets/Privacy_Policy_Shoma_APP.pdf', {});
        });
    };
    PrivacypolicyPage = __decorate([
        core_1.Component({
            selector: 'app-privacypolicy',
            templateUrl: './privacypolicy.page.html',
            styleUrls: ['./privacypolicy.page.scss']
        })
    ], PrivacypolicyPage);
    return PrivacypolicyPage;
}());
exports.PrivacypolicyPage = PrivacypolicyPage;
