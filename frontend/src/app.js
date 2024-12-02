var app = angular.module("myApp", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  // Atur default route jika tidak ada route yang cocok
  $urlRouterProvider.otherwise("/home");

  // Definisikan state hanya untuk signup
    $stateProvider
    .state("signup", {
      url: "/signup",
      templateUrl: "views/signup.html",  // Pastikan path template sesuai
      controller: "SignupController",  // Controller untuk signup
    });

    $stateProvider
    .state("signupAdmin", {
      url: "/signupAdmin",
      templateUrl: "views/signupAdmin.html",  // Pastikan path template sesuai
      controller: "SignupAdminController",    // Pastikan controller sesuai
    });
    
    $stateProvider
    .state("login", {
      url: "/login",
      templateUrl: "views/login.html",  // Pastikan path template sesuai
      controller: "LoginController",  // Controller untuk signup
    });

    $stateProvider
    .state("loginAdmin", {
      url: "/loginAdmin",
      templateUrl: "views/loginAdmin.html",  // Pastikan path template sesuai
      controller: "LoginAdminController",  // Controller untuk signup
    });

    $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "views/home.html",  // Pastikan path template sesuai
      controller: "HomeController",  // Controller untuk signup
    });

    $stateProvider
    .state("homeAdmin", {
      url: "/homeAdmin",
      templateUrl: "views/homeAdmin.html",  // Path template homeAdmin
      controller: "HomeAdminController"  // Controller untuk homeAdmin
  });

    $stateProvider
    .state("about", {
      url: "/about",
      templateUrl: "views/about.html",  // Pastikan path template sesuai
      controller: "AboutController",  // Controller untuk signup
    });

    $stateProvider
    .state("contact", {
      url: "/contact",
      templateUrl: "views/contact.html",  // Pastikan path template sesuai
      controller: "ContactController",  // Controller untuk signup
    });

    $stateProvider
    .state("subscribe", {
      url: "/subscribe",
      templateUrl: "views/subscribe.html",  // Pastikan path template sesuai
      controller: "SubscribeController",  // Controller untuk signup
    });

    $stateProvider
    .state("article", {
      url: "/article/:id",  // Menambahkan parameter :id pada URL
      templateUrl: "views/article.html",  // Path template sesuai
      controller: "HomeController",  // Controller untuk artikel
    });
});
