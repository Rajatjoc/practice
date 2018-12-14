(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["auth-gateway-auth-gateway-module"],{

/***/ "./src/app/auth-gateway/auth-gateway.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/auth-gateway/auth-gateway.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/auth-gateway/auth-gateway.component.ts":
/*!********************************************************!*\
  !*** ./src/app/auth-gateway/auth-gateway.component.ts ***!
  \********************************************************/
/*! exports provided: AuthGatewayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGatewayComponent", function() { return AuthGatewayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuthGatewayComponent = /** @class */ (function () {
    function AuthGatewayComponent() {
    }
    AuthGatewayComponent.prototype.ngOnInit = function () {
    };
    AuthGatewayComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-auth-gateway',
            template: '<router-outlet> </router-outlet>',
            styles: [__webpack_require__(/*! ./auth-gateway.component.scss */ "./src/app/auth-gateway/auth-gateway.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AuthGatewayComponent);
    return AuthGatewayComponent;
}());



/***/ }),

/***/ "./src/app/auth-gateway/auth-gateway.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/auth-gateway/auth-gateway.module.ts ***!
  \*****************************************************/
/*! exports provided: AuthGatewayModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGatewayModule", function() { return AuthGatewayModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_gateway_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-gateway.component */ "./src/app/auth-gateway/auth-gateway.component.ts");
/* harmony import */ var _auth_gatewayRouting_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-gatewayRouting.module */ "./src/app/auth-gateway/auth-gatewayRouting.module.ts");
/* harmony import */ var _common_services_authguard_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/services/authguard.service */ "./src/app/common/services/authguard.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//modules
//components
var AuthGatewayModule = /** @class */ (function () {
    function AuthGatewayModule() {
    }
    AuthGatewayModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"],
                _auth_gatewayRouting_module__WEBPACK_IMPORTED_MODULE_3__["AuthGatewayRoutingModule"]
            ],
            declarations: [
                _auth_gateway_component__WEBPACK_IMPORTED_MODULE_2__["AuthGatewayComponent"]
            ],
            providers: [_common_services_authguard_service__WEBPACK_IMPORTED_MODULE_4__["AlwaysAuthGuard"]]
        })
    ], AuthGatewayModule);
    return AuthGatewayModule;
}());



/***/ }),

/***/ "./src/app/auth-gateway/auth-gatewayRouting.module.ts":
/*!************************************************************!*\
  !*** ./src/app/auth-gateway/auth-gatewayRouting.module.ts ***!
  \************************************************************/
/*! exports provided: routes, AuthGatewayRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGatewayRoutingModule", function() { return AuthGatewayRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_services_authguard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/services/authguard.service */ "./src/app/common/services/authguard.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        canActivate: [_common_services_authguard_service__WEBPACK_IMPORTED_MODULE_2__["AlwaysAuthGuard"]],
        path: "", loadChildren: "../super-admin/super-admin.module#SuperAdminModule",
    }
];
var AuthGatewayRoutingModule = /** @class */ (function () {
    function AuthGatewayRoutingModule() {
    }
    AuthGatewayRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
        })
    ], AuthGatewayRoutingModule);
    return AuthGatewayRoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=auth-gateway-auth-gateway-module.js.map