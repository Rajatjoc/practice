(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../super-admin/super-admin.module": [
		"./src/app/super-admin/super-admin.module.ts",
		"common-signup-signin-signup-signin-module~super-admin-super-admin-module",
		"common",
		"super-admin-super-admin-module"
	],
	"./auth-gateway/auth-gateway.module": [
		"./src/app/auth-gateway/auth-gateway.module.ts",
		"common",
		"auth-gateway-auth-gateway-module"
	],
	"./common/signup-signin/signup-signin.module": [
		"./src/app/common/signup-signin/signup-signin.module.ts",
		"common-signup-signin-signup-signin-module~super-admin-super-admin-module",
		"common",
		"common-signup-signin-signup-signin-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _super_admin_services_profileservice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./super-admin/services/profileservice.service */ "./src/app/super-admin/services/profileservice.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(router, ProfileserviceService) {
        this.router = router;
        this.ProfileserviceService = ProfileserviceService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem("token")) {
            this.ProfileserviceService.getProfile().subscribe(function (res) {
                if (res['code'] == 200) {
                    // this.userName = res.data.firstName;
                    // localStorage.setItem("userName", this.userName);
                }
                else if (!res.status && res.code == 401) {
                    localStorage.removeItem("token");
                    _this.router.navigate(["login"]);
                }
            });
            // this.router.navigate(["auth"]);
        }
        this.router.events.subscribe(function (evt) {
            if (!(evt instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"])) {
                return;
            }
            window.scrollTo(0, 0);
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            // tslint:disable-next-line
            selector: 'body',
            template: " <block-ui>\n       <router-outlet></router-outlet>\n  </block-ui>"
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _super_admin_services_profileservice_service__WEBPACK_IMPORTED_MODULE_2__["ProfileserviceService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _coreui_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @coreui/angular */ "./node_modules/@coreui/angular/fesm5/coreui-angular.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var ng_treetable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-treetable */ "./node_modules/ng-treetable/ng-treetable.es5.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _common_interceptor_interceptor_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common/interceptor/interceptor.service */ "./src/app/common/interceptor/interceptor.service.ts");
/* harmony import */ var _common_message_reset_password_message_reset_password_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./common/message-reset-password/message-reset-password.component */ "./src/app/common/message-reset-password/message-reset-password.component.ts");
/* harmony import */ var ng_block_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-block-ui */ "./node_modules/ng-block-ui/fesm5/ng-block-ui.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



 // <-- import the module








// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_11__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
                _coreui_angular__WEBPACK_IMPORTED_MODULE_8__["AppBreadcrumbModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_9__["ToastrModule"].forRoot(),
                ng_block_ui__WEBPACK_IMPORTED_MODULE_14__["BlockUIModule"].forRoot(),
                ng_treetable__WEBPACK_IMPORTED_MODULE_10__["TreeTableModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_3__["NgxPaginationModule"],
            ],
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"], _common_message_reset_password_message_reset_password_component__WEBPACK_IMPORTED_MODULE_13__["MessageResetPasswordComponent"]],
            providers: [{
                    provide: _angular_common__WEBPACK_IMPORTED_MODULE_4__["LocationStrategy"],
                    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_4__["HashLocationStrategy"],
                },
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"],
                    useClass: _common_interceptor_interceptor_service__WEBPACK_IMPORTED_MODULE_12__["MyInterceptor"],
                    multi: true
                }],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: routes, AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _common_message_reset_password_message_reset_password_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/message-reset-password/message-reset-password.component */ "./src/app/common/message-reset-password/message-reset-password.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    { path: "login", loadChildren: "./common/signup-signin/signup-signin.module#SignupSigninMoudle" },
    {
        path: "auth", loadChildren: "./auth-gateway/auth-gateway.module#AuthGatewayModule",
        data: {
            title: ''
        },
    },
    {
        path: "message_resetpassword", component: _common_message_reset_password_message_reset_password_component__WEBPACK_IMPORTED_MODULE_2__["MessageResetPasswordComponent"]
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { useHash: false })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/common/interceptor/interceptor.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/common/interceptor/interceptor.service.ts ***!
  \***********************************************************/
/*! exports provided: MyInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyInterceptor", function() { return MyInterceptor; });
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

var MyInterceptor = /** @class */ (function () {
    function MyInterceptor() {
    }
    MyInterceptor.prototype.intercept = function (request, next) {
        this.setUser();
        if (this.token) {
            var req_with_token = request.clone({
                setHeaders: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.token
                }
            });
            return next.handle(req_with_token);
        }
        else {
            console.log('Not Authorised');
            return next.handle(request);
        }
    };
    MyInterceptor.prototype.setUser = function () {
        this.token = localStorage.getItem('token');
    };
    MyInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], MyInterceptor);
    return MyInterceptor;
}());



/***/ }),

/***/ "./src/app/common/message-reset-password/message-reset-password.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/common/message-reset-password/message-reset-password.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\"style=\"padding-top:40px\">\n\n \n  <div class=\"col-sm-1\">\n  </div>\n  <div class=\"col-sm-11\" style=\"color: black;\n  height: 500px;\n  border: groove;\n  text-align: center;\n  padding-top: 40px;\n  background-color: cadetblue;\n\">\n    <h1 style=\"color:red\">Thank You!!</h1>\n    <h3>Your Reset password link has been sent to your Registered email address.</h3>\n    <a class=\" btn btn-link\" style=\"color:blue; padding-right:10px\" [routerLink]=\"['/login']\">\n      Click here to return to login page\n     </a>\n  </div>\n</div>\n</div>"

/***/ }),

/***/ "./src/app/common/message-reset-password/message-reset-password.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/common/message-reset-password/message-reset-password.component.scss ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/common/message-reset-password/message-reset-password.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/common/message-reset-password/message-reset-password.component.ts ***!
  \***********************************************************************************/
/*! exports provided: MessageResetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageResetPasswordComponent", function() { return MessageResetPasswordComponent; });
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

var MessageResetPasswordComponent = /** @class */ (function () {
    function MessageResetPasswordComponent() {
    }
    MessageResetPasswordComponent.prototype.ngOnInit = function () {
    };
    MessageResetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-message-reset-password',
            template: __webpack_require__(/*! ./message-reset-password.component.html */ "./src/app/common/message-reset-password/message-reset-password.component.html"),
            styles: [__webpack_require__(/*! ./message-reset-password.component.scss */ "./src/app/common/message-reset-password/message-reset-password.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MessageResetPasswordComponent);
    return MessageResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/super-admin/services/profileservice.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/super-admin/services/profileservice.service.ts ***!
  \****************************************************************/
/*! exports provided: ProfileserviceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileserviceService", function() { return ProfileserviceService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .././../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileserviceService = /** @class */ (function () {
    function ProfileserviceService(httpClient) {
        this.httpClient = httpClient;
        this.setImage = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.setName = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].API_ENDPOINT;
        this.newHeaders = {
            'Accept': 'application/json'
        };
    }
    ProfileserviceService.prototype.getProfile = function () {
        return this.httpClient.get(this.apiUrl + "users/getProfile");
    };
    // setProfileImage(profileImage) {
    //   console.log(">>>>>>>>>> himani///////", profileImage)
    //   // this.userData =  JSON.parse(localStorage.getItem('userName'));
    //   this.setImage.next({ profileImage: profileImage });
    //   console.log(">>>>>>>>>>>", profileImage)
    //   this.setImage.next({ profileImage: localStorage.getItem("image") 
    //   ,username: localStorage.getItem("headerName")});
    //   // this.setImage.next({ username: localStorage.getItem("headerName")});
    // }
    // getProfileImage(): Observable<any> {
    //   console.log(this.setImage);
    //    this.setImage.next({ profileImage: localStorage.getItem("image") ,username: localStorage.getItem("headerName")});
    //   //  this.setImage.next({ username: localStorage.getItem("headerName")});
    //   return this.setImage.asObservable();
    // }
    ProfileserviceService.prototype.setProfileImage = function (profileImage) {
        console.log("hello i am here");
        this.setImage.next({ profileImage: profileImage });
    };
    ProfileserviceService.prototype.getProfileImage = function () {
        return this.setImage.asObservable();
    };
    ProfileserviceService.prototype.setProfileName = function (name) {
        console.log("hello i am here");
        this.setName.next({ name: name });
    };
    ProfileserviceService.prototype.getProfileName = function () {
        return this.setName.asObservable();
    };
    ProfileserviceService.prototype.updateProfile = function (data) {
        return this.httpClient.post(this.apiUrl + "users/updateProfile", { data: data });
    };
    ProfileserviceService.prototype.uploadImage = function (formData) {
        var requestData = { 'profileData': formData };
        return this.httpClient.post(this.apiUrl + "users/uploadProfilePic", formData);
    };
    ProfileserviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ProfileserviceService);
    return ProfileserviceService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    // API_ENDPOINT: 'http://localhost:3503/' //local
    API_ENDPOINT: 'http://54.71.18.74:3503/' // staging URL
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/rajatjoshi/Documents/printgenie/admin/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map