(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common-signup-signin-signup-signin-module"],{

/***/ "./src/app/common/signup-signin/forgetpassword/forgetpassword.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/common/signup-signin/forgetpassword/forgetpassword.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-body\">\n  <main class=\"main d-flex align-items-center\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-5 mx-auto\">\n          <div class=\"card-group\">\n            <div class=\"card p-4\">\n              <div class=\"card-body\">\n                <form [formGroup]=\"forgetPasswordForm\"(ngSubmit)=\"forgetpassword()\">\n                  <h1>Forget Password</h1>\n                  <p class=\"text-muted\">Enter your email</p>\n                  <div class=\"input-group mb-3\">\n                    <div class=\"input-group-prepend\">\n                      <span class=\"input-group-text\"><i class=\"fa fa-envelope-o\"></i></span>\n                    </div>\n                    <input type=\"text\" class=\"form-control\" formControlName = \"userEmail\"placeholder=\"User Email\" autocomplete=\"username\" required>\n                  \n                  </div>\n                  <p  style=\"color:red; font-size:12px\" class=\"error\" *ngIf=\"forgetPasswordForm.controls['userEmail'].hasError('required') && isSubmited\">\n                    Email required\n                  </p>\n                  <p  style=\"color:red; font-size:12px\" class=\"error\" *ngIf=\"forgetPasswordForm.controls['userEmail'].hasError('pattern')\">\n                    Invalid Email\n                  </p>\n                  \n                 \n                    <div class=\"col-sm-12\">\n                      <button type=\"submit\" class=\"btn btn-primary px-4\" >Send mail</button>\n                    </div>\n  \n              \n                </form>\n              </div>\n            </div>\n            <!-- <div class=\"card text-white bg-primary py-5 d-md-down-none\" style=\"width:44%\">\n              <div class=\"card-body text-center\">\n                <div>\n                  <h2>Sign up</h2>\n                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n                  <button type=\"button\" class=\"btn btn-primary active mt-3\">  <a routerLink=\"registration\" >Register Now!</a></button>\n                </div>\n              </div>\n            </div> -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n</div>\n\n"

/***/ }),

/***/ "./src/app/common/signup-signin/forgetpassword/forgetpassword.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/common/signup-signin/forgetpassword/forgetpassword.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/common/signup-signin/forgetpassword/forgetpassword.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/common/signup-signin/forgetpassword/forgetpassword.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ForgetpasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgetpasswordComponent", function() { return ForgetpasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/login.service */ "./src/app/common/signup-signin/services/login.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgetpasswordComponent = /** @class */ (function () {
    function ForgetpasswordComponent(formbuilder, LoginService, toastr, router) {
        this.formbuilder = formbuilder;
        this.LoginService = LoginService;
        this.toastr = toastr;
        this.router = router;
        this.isSubmited = false;
        this.forgetPasswordForm = this.formbuilder.group({
            userEmail: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
        });
    }
    ForgetpasswordComponent.prototype.ngOnInit = function () {
    };
    ForgetpasswordComponent.prototype.forgetpassword = function () {
        var _this = this;
        if (this.forgetPasswordForm.invalid) {
            this.isSubmited = true;
            this.toastr.error("Invalid Credentials");
            return;
        }
        console.log(this.forgetPasswordForm.value);
        this.LoginService.forgetpassword(this.forgetPasswordForm.value).subscribe(function (res) {
            if (res.code === 200) {
                _this.toastr.success(res.message);
                _this.router.navigate(['message_resetpassword']);
                //model.open()
            }
            else if (res.code === 202) {
                _this.toastr.warning(res.message);
            }
            console.log(res);
        });
    };
    ForgetpasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-forgetpassword',
            template: __webpack_require__(/*! ./forgetpassword.component.html */ "./src/app/common/signup-signin/forgetpassword/forgetpassword.component.html"),
            styles: [__webpack_require__(/*! ./forgetpassword.component.scss */ "./src/app/common/signup-signin/forgetpassword/forgetpassword.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _services_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], ForgetpasswordComponent);
    return ForgetpasswordComponent;
}());



/***/ }),

/***/ "./src/app/common/signup-signin/login/login.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/common/signup-signin/login/login.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-body\">\n  <main class=\"main d-flex align-items-center\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-5 mx-auto\">\n          <div class=\"card-group\">\n            <div class=\"card p-4\">\n              <div class=\"card-body\">\n                <form [formGroup]=\"loginForm\"(ngSubmit)=\"login()\">\n                  <h1>Login</h1>\n                  <p class=\"text-muted\">Sign In to your account</p>\n                  <div class=\"input-group mb-3\">\n                    <div class=\"input-group-prepend\">\n                      <span class=\"input-group-text\"><i class=\"fa fa-envelope-o\"></i></span>\n                    </div>\n                    <input type=\"text\" class=\"form-control\" formControlName = \"userEmail\"placeholder=\"User Email\" autocomplete=\"username\" required>\n                  \n                  </div>\n                  <p  style=\"color:red; font-size:12px\" class=\"error\" *ngIf=\"loginForm.controls['userEmail'].hasError('required') && isSubmited\">\n                    Email required\n                  </p>\n                  <p  style=\"color:red; font-size:12px\" class=\"error\" *ngIf=\"loginForm.controls['userEmail'].hasError('pattern')\">\n                    Invalid Email\n                  </p>\n                  <div class=\"input-group mb-4\">\n                    <div class=\"input-group-prepend\">\n                      <span class=\"input-group-text\"><i class=\"icon-lock\"></i></span>\n                    </div>\n                    <input type=\"password\" class=\"form-control\" formControlName= \"userPassword\" placeholder=\" UserPassword\" autocomplete=\"current-password\" required>\n                  </div>\n                  <p style=\"color:red; font-size:12px\" class=\"error\" *ngIf=\"loginForm.controls['userPassword'].hasError('pattern')  && isSubmited\">\n                    Password should be at least 8 characters long and should contain one number,one character and one special character\n                  </p>\n                  <div class=\"row\">\n                    <div class=\"col-6\">\n                      <button type=\"submit\" class=\"btn btn-primary px-4\">Login</button>\n                    </div>\n                    <div class=\"col-6 text-right\">\n                      <a [routerLink]=\"['/login/forgetpassword']\" class=\"btn btn-link px-0\">Forgot password?</a>\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n            <!-- <div class=\"card text-white bg-primary py-5 d-md-down-none\" style=\"width:44%\">\n              <div class=\"card-body text-center\">\n                <div>\n                  <h2>Sign up</h2>\n                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n                  <button type=\"button\" class=\"btn btn-primary active mt-3\">  <a routerLink=\"registration\" >Register Now!</a></button>\n                </div>\n              </div>\n            </div> -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n</div>\n\n"

/***/ }),

/***/ "./src/app/common/signup-signin/login/login.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/common/signup-signin/login/login.component.ts ***!
  \***************************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/login.service */ "./src/app/common/signup-signin/services/login.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(formbuilder, router, LoginService, toastr) {
        this.formbuilder = formbuilder;
        this.router = router;
        this.LoginService = LoginService;
        this.toastr = toastr;
        this.user = {};
        this.isSubmited = false;
        this.loginForm = this.formbuilder.group({
            userEmail: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            userPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})')]],
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem("token")) {
            this.router.navigate(["auth/superadmin"]);
        }
        else {
            this.router.navigate(["login"]);
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.loginForm.invalid) {
            this.isSubmited = true;
            this.toastr.error("Invalid Credentials");
            return;
        }
        var loginData = {
            userEmail: this.loginForm.controls.userEmail.value,
            userPassword: this.loginForm.controls.userPassword.value
        };
        this.LoginService.login(loginData).subscribe(function (res) {
            console.log(res);
            if (res.code === 200) {
                localStorage.token = res.data.token;
                // localStorage.setItem(token,res.data.token);
                _this.toastr.success(res.message);
                _this.router.navigate(["auth/superadmin"]);
            }
            else if (res.code == 201) {
                _this.toastr.warning(res.message);
            }
            else {
                _this.toastr.warning(res.message);
            }
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/common/signup-signin/login/login.component.html")
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/common/signup-signin/register/register.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/common/signup-signin/register/register.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-body\">\n  <main class=\"main d-flex align-items-center\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-6 mx-auto\">\n          <div class=\"card mx-4\">\n            <div class=\"card-body p-4\">\n              <form [formGroup] = \"userRegistation\" (ngSubmit)= \"saveUserData()\">\n                <h1>Register</h1>\n                <p class=\"text-muted\">Create your account</p>\n                <div class=\"input-group mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"icon-user\"></i></span>\n                  </div>\n                  <input type=\"text\" formControlName=\"userName\" for class=\"form-control\" placeholder=\"Username\" autocomplete=\"username\" required>\n                </div>\n                <div class=\"input-group mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">@</span>\n                  </div>\n                  <input type=\"text\" formControlName=\"userEmail\" class=\"form-control\" placeholder=\"Email\" autocomplete=\"email\" required>\n                </div>\n                <div class=\"input-group mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"icon-lock\"></i></span>\n                  </div>\n                  <input type=\"password\" formControlName=\"userPassword\" class=\"form-control\" placeholder=\"Password\" autocomplete=\"new-password\" required>\n                </div>\n                <div class=\"input-group mb-4\">\n                  <input type=\"file\" name=\"file\" class=\"form-control\" (change)=\"getFileData($event)\" required>\n                </div>\n                <button type=\"submit\" class=\"btn btn-block btn-success\">Create Account</button>\n              </form>\n            </div>\n            <!-- <div class=\"card-footer p-4\">\n              <div class=\"row\">\n                <div class=\"col-6\">\n                  <button class=\"btn btn-block btn-facebook\" type=\"button\"><span>facebook</span></button>\n                </div>\n                <div class=\"col-6\">\n                  <button class=\"btn btn-block btn-twitter\" type=\"button\"><span>twitter</span></button>\n                </div>\n              </div>\n            </div> -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n</div>\n"

/***/ }),

/***/ "./src/app/common/signup-signin/register/register.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/common/signup-signin/register/register.component.ts ***!
  \*********************************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_register_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/register.service */ "./src/app/common/signup-signin/services/register.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(RegistationService, FormBuilder, Router) {
        this.RegistationService = RegistationService;
        this.FormBuilder = FormBuilder;
        this.Router = Router;
        this.userRegistation = this.FormBuilder.group({
            userName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(12)]],
            userEmail: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(12)]],
            userPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(12)]],
        });
    }
    RegisterComponent.prototype.getFileData = function (e) {
        this.selectedFile = e.target.files[0];
        console.log(this.selectedFile);
    };
    RegisterComponent.prototype.saveUserData = function () {
        var _this = this;
        var data = {
            userName: this.userRegistation.controls.userName.value,
            userEmail: this.userRegistation.controls.userEmail.value,
            userPassword: this.userRegistation.controls.userPassword.value,
        };
        var _formData = new FormData();
        _formData.append('file', this.selectedFile);
        _formData.append('userName', data.userName);
        _formData.append('userEmail', data.userEmail);
        _formData.append('userPassword', data.userPassword);
        console.log("data>>", data);
        this.RegistationService.register(_formData).subscribe(function (res) {
            console.log(">>>", res[status]);
            if (res[status] === 200) {
                _this.Router.navigate(["/login"]);
            }
        });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/common/signup-signin/register/register.component.html")
        }),
        __metadata("design:paramtypes", [_services_register_service__WEBPACK_IMPORTED_MODULE_3__["RegistationService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/common/signup-signin/reset-password/reset-password.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/common/signup-signin/reset-password/reset-password.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app-body\">\n    <main class=\"main d-flex align-items-center\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-5 mx-auto\">\n            <div class=\"card-group\">\n              <div class=\"card p-4\">\n                <div class=\"card-body\">\n                  <form [formGroup]=\"ResetPasswordForm\"(ngSubmit)=\"resetPassword()\">\n                    <h1>Reset Password</h1>\n                    <p class=\"text-muted\">New Password</p>\n                    <div class=\"input-group mb-3\">\n                      <div class=\"input-group-prepend\">\n                        <span class=\"input-group-text\"><i class=\"icon-lock\"></i></span>\n                      </div>\n                      <input type=\"text\" class=\"form-control\" formControlName = \"password\" placeholder=\"Password\" autocomplete=\"username\" required>\n                    \n                    </div>\n                    <p style=\"color:red; font-size:12px\" class=\"error\" *ngIf=\"ResetPasswordForm.controls['password'].hasError('pattern')\">\n                      Password should be at least 8 characters long and should contain one number,one character and one special character\n                    </p> \n                    <p class=\"text-muted\">Confirm_Password</p>\n                    <div class=\"input-group mb-3\">\n                      <div class=\"input-group-prepend\">\n                        <span class=\"input-group-text\"><i class=\"icon-lock\"></i></span>\n                      </div>\n                      <input type=\"text\" class=\"form-control\" formControlName = \"confirm_password\"placeholder=\"ConfirmPassword\" autocomplete=\"username\" required>\n                    \n                    </div>\n                    <p style=\"color:red; font-size:12px\" class=\"error\" *ngIf=\"ResetPasswordForm.controls['confirm_password'].hasError('pattern')\">\n                      Password should be at least 8 characters long and should contain one number,one character and one special character\n                    </p> \n                    <!-- <p style='color:red' *ngIf=\"ResetPasswordForm.get(['passwords','password']).value != ResetPasswordForm.get(['passwords','confirm_password']).value && ResetPasswordForm.get(['passwords','confirm_password']).value != null\">\n                      Password does not match</p> -->\n                    <!-- <p  style=\"color:red; font-size:12px\" class=\"error\" *ngIf=\"forgetPasswordForm.controls['userEmail'].hasError('required') && isSubmited\">\n                      Email required\n                    </p>\n                    <p  style=\"color:red; font-size:12px\" class=\"error\" *ngIf=\"forgetPasswordForm.controls['userEmail'].hasError('pattern')\">\n                      Invalid Email\n                    </p> -->\n                    \n                   \n                      <div class=\"col-sm-12\">\n                        <button type=\"submit\" class=\"btn btn-primary px-4\">Submit</button>\n                      </div>\n    \n                \n                  </form>\n                </div>\n              </div>\n              <!-- <div class=\"card text-white bg-primary py-5 d-md-down-none\" style=\"width:44%\">\n                <div class=\"card-body text-center\">\n                  <div>\n                    <h2>Sign up</h2>\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n                    <button type=\"button\" class=\"btn btn-primary active mt-3\">  <a routerLink=\"registration\" >Register Now!</a></button>\n                  </div>\n                </div>\n              </div> -->\n            </div>\n          </div>\n        </div>\n      </div>\n    </main>\n  </div>\n  \n  "

/***/ }),

/***/ "./src/app/common/signup-signin/reset-password/reset-password.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/common/signup-signin/reset-password/reset-password.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/common/signup-signin/reset-password/reset-password.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/common/signup-signin/reset-password/reset-password.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ResetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordComponent", function() { return ResetPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/login.service */ "./src/app/common/signup-signin/services/login.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(formbuilder, LoginService, toastr, route, router) {
        this.formbuilder = formbuilder;
        this.LoginService = LoginService;
        this.toastr = toastr;
        this.route = route;
        this.router = router;
        this.isSubmited = false;
        this.ResetPasswordForm = this.formbuilder.group({
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})')]],
            confirm_password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})')]]
        }, { validator: this.passwordConfirming });
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.pageSlug = this.route.snapshot.queryParams;
        console.log(this.pageSlug);
    };
    ResetPasswordComponent.prototype.passwordConfirming = function (c) {
        if (c.get('password').value !== c.get('confirm_password').value) {
            return { invalid: true };
        }
        else {
            return { invalid: false };
        }
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        if (this.ResetPasswordForm.invalid) {
            this.isSubmited = true;
            this.toastr.error("Invalid Credentials");
            return;
        }
        console.log("reset password", this.ResetPasswordForm.value);
        var resetData = {
            value: this.ResetPasswordForm.value,
            data: this.pageSlug
        };
        this.LoginService.ResetPassword(resetData).subscribe(function (res) {
            if (res.code === 200) {
                _this.toastr.success(res.message);
                _this.router.navigate(['message_resetpassword']);
                //model.open()
            }
            else if (res.code === 202) {
                _this.toastr.warning(res.message);
            }
        });
    };
    ResetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__(/*! ./reset-password.component.html */ "./src/app/common/signup-signin/reset-password/reset-password.component.html"),
            styles: [__webpack_require__(/*! ./reset-password.component.scss */ "./src/app/common/signup-signin/reset-password/reset-password.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _services_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/common/signup-signin/services/register.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/common/signup-signin/services/register.service.ts ***!
  \*******************************************************************/
/*! exports provided: RegistationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistationService", function() { return RegistationService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RegistationService = /** @class */ (function () {
    function RegistationService(httpClient) {
        this.httpClient = httpClient;
    }
    RegistationService.prototype.register = function (fileData) {
        console.log("file data at service ", fileData);
        return this.httpClient.post("http://localhost:3000/api/uploadFile", fileData);
    };
    RegistationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], RegistationService);
    return RegistationService;
}());



/***/ }),

/***/ "./src/app/common/signup-signin/signup-signin.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/common/signup-signin/signup-signin.component.ts ***!
  \*****************************************************************/
/*! exports provided: SignupSigninComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupSigninComponent", function() { return SignupSigninComponent; });
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

var SignupSigninComponent = /** @class */ (function () {
    function SignupSigninComponent() {
    }
    SignupSigninComponent.prototype.ngOnInit = function () {
    };
    SignupSigninComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-signup-signin',
            template: '<router-outlet></router-outlet>',
        }),
        __metadata("design:paramtypes", [])
    ], SignupSigninComponent);
    return SignupSigninComponent;
}());



/***/ }),

/***/ "./src/app/common/signup-signin/signup-signin.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/common/signup-signin/signup-signin.module.ts ***!
  \**************************************************************/
/*! exports provided: SignupSigninMoudle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupSigninMoudle", function() { return SignupSigninMoudle; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _forgetpassword_forgetpassword_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forgetpassword/forgetpassword.component */ "./src/app/common/signup-signin/forgetpassword/forgetpassword.component.ts");
/* harmony import */ var _signup_signin_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./signup-signin.component */ "./src/app/common/signup-signin/signup-signin.component.ts");
/* harmony import */ var _signup_signinRouting_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./signup-signinRouting.module */ "./src/app/common/signup-signin/signup-signinRouting.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login/login.component */ "./src/app/common/signup-signin/login/login.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./register/register.component */ "./src/app/common/signup-signin/register/register.component.ts");
/* harmony import */ var _services_register_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/register.service */ "./src/app/common/signup-signin/services/register.service.ts");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/login.service */ "./src/app/common/signup-signin/services/login.service.ts");
/* harmony import */ var _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./reset-password/reset-password.component */ "./src/app/common/signup-signin/reset-password/reset-password.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var SignupSigninMoudle = /** @class */ (function () {
    function SignupSigninMoudle() {
    }
    SignupSigninMoudle = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"],
                _signup_signinRouting_module__WEBPACK_IMPORTED_MODULE_6__["SignupSigninRoutingMoudle"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"]
            ],
            declarations: [_signup_signin_component__WEBPACK_IMPORTED_MODULE_5__["SignupSigninComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"],
                _register_register_component__WEBPACK_IMPORTED_MODULE_9__["RegisterComponent"],
                _forgetpassword_forgetpassword_component__WEBPACK_IMPORTED_MODULE_4__["ForgetpasswordComponent"],
                _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_12__["ResetPasswordComponent"]
            ],
            providers: [_services_register_service__WEBPACK_IMPORTED_MODULE_10__["RegistationService"], _services_login_service__WEBPACK_IMPORTED_MODULE_11__["LoginService"]]
        })
    ], SignupSigninMoudle);
    return SignupSigninMoudle;
}());



/***/ }),

/***/ "./src/app/common/signup-signin/signup-signinRouting.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/common/signup-signin/signup-signinRouting.module.ts ***!
  \*********************************************************************/
/*! exports provided: SignupSigninRoutingMoudle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupSigninRoutingMoudle", function() { return SignupSigninRoutingMoudle; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "./src/app/common/signup-signin/login/login.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./register/register.component */ "./src/app/common/signup-signin/register/register.component.ts");
/* harmony import */ var _forgetpassword_forgetpassword_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forgetpassword/forgetpassword.component */ "./src/app/common/signup-signin/forgetpassword/forgetpassword.component.ts");
/* harmony import */ var _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reset-password/reset-password.component */ "./src/app/common/signup-signin/reset-password/reset-password.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    {
        path: "", component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"],
    },
    {
        path: "registration", component: _register_register_component__WEBPACK_IMPORTED_MODULE_3__["RegisterComponent"]
    },
    {
        path: "forgetpassword", component: _forgetpassword_forgetpassword_component__WEBPACK_IMPORTED_MODULE_4__["ForgetpasswordComponent"]
    },
    {
        path: "resetpassword", component: _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_5__["ResetPasswordComponent"]
    }
];
var SignupSigninRoutingMoudle = /** @class */ (function () {
    function SignupSigninRoutingMoudle() {
    }
    SignupSigninRoutingMoudle = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
        })
    ], SignupSigninRoutingMoudle);
    return SignupSigninRoutingMoudle;
}());



/***/ })

}]);
//# sourceMappingURL=common-signup-signin-signup-signin-module.js.map