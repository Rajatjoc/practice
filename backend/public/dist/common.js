(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/common/services/authguard.service.ts":
/*!******************************************************!*\
  !*** ./src/app/common/services/authguard.service.ts ***!
  \******************************************************/
/*! exports provided: AlwaysAuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlwaysAuthGuard", function() { return AlwaysAuthGuard; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! .././../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AlwaysAuthGuard = /** @class */ (function () {
    function AlwaysAuthGuard(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].API_ENDPOINT;
    }
    AlwaysAuthGuard.prototype.canActivate = function () {
        return true;
        //  let authorised = this.checkauth().subscribe(res=>{
        //     if(res.code == 200){
        //     return true;
        //   }else{
        //     console.log("Herer")
        //     this.router.navigate(['login'])      
        //     return false;
        //   }
        //   })
        //   if(authorised)
        //   return true;
        //   else{
        //     console.log("Inside logout")
        //     this.router.navigate(['login'])
        //     return false;
        //   }
        // if (localStorage.getItem("token")) {
        //   return true;
        // }
        // else {
        //   this.router.navigate(["login"]);
        // }
    };
    AlwaysAuthGuard.prototype.checkauth = function () {
        return this.httpClient.get(this.apiUrl + "users/checkauth");
    };
    AlwaysAuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]])
    ], AlwaysAuthGuard);
    return AlwaysAuthGuard;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map