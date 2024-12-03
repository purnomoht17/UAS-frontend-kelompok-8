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
    })
    .state("signupAdmin", {
      url: "/signupAdmin",
      templateUrl: "views/signupAdmin.html",  // Pastikan path template sesuai
      controller: "SignupAdminController",    // Pastikan controller sesuai
    })
    .state("login", {
      url: "/login",
      templateUrl: "views/login.html",  // Pastikan path template sesuai
      controller: "LoginController",  // Controller untuk signup
    })
    .state("loginAdmin", {
      url: "/loginAdmin",
      templateUrl: "views/loginAdmin.html",  // Pastikan path template sesuai
      controller: "LoginAdminController",  // Controller untuk signup
    })
    .state("home", {
      url: "/home",
      templateUrl: "views/home.html",  // Pastikan path template sesuai
      controller: "HomeController",  // Controller untuk signup
    })
    .state("homeAdmin", {
      url: "/homeAdmin",
      templateUrl: "views/homeAdmin.html",  // Path template homeAdmin
      controller: "HomeAdminController",  // Controller untuk homeAdmin
    })
    .state("about", {
      url: "/about",
      templateUrl: "views/about.html",  // Pastikan path template sesuai
      controller: "AboutController",  // Controller untuk signup
    })
    .state("contact", {
      url: "/contact",
      templateUrl: "views/contact.html",  // Pastikan path template sesuai
      controller: "ContactController",  // Controller untuk signup
    })
    .state("subscribe", {
      url: "/subscribe",
      templateUrl: "views/subscribe.html",  // Pastikan path template sesuai
      controller: "SubscribeController",  // Controller untuk signup
    })
    .state("article", {
      url: "/article/:id",  // Menambahkan parameter :id pada URL
      templateUrl: "views/article.html",  // Path template sesuai
      controller: "HomeController",  // Controller untuk artikel
    })
    .state("editTour", {
      url: "/editTour/:id", // URL dengan parameter :id untuk editTour
      templateUrl: "views/editTour.html", // Path ke template editTour
      controller: "EditTourController", // Controller untuk editTour
    });
});
