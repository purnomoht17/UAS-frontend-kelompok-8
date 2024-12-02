angular.module("myApp").controller("LoginController", [
    "$scope",
    "$http",
    function ($scope, $http) {
      // Inisialisasi objek user
      $scope.user = {
        email: "",
        password: "",
      };
  
      $scope.login = function () {
        if ($scope.user.email && $scope.user.password) {
          const loginData = {
            email: $scope.user.email,
            password: $scope.user.password,
          };
  
          $http
            .post("http://localhost:3000/api/auth/login/", loginData)
            .then(function (response) {
              const token = response.data.loginSuccess.token;
              localStorage.setItem("authToken", token);
              localStorage.setItem("name", response.data.loginSuccess.name);
              localStorage.setItem("id", response.data.loginSuccess.user_id);
              alert(
                `Login Successful! Welcome, ${response.data.loginSuccess.name}`
              );
              window.location.href = "dashboard/overview";
            })
            .catch(function (error) {
              alert(`${error.data.message}`);
            });
        } else {
          alert("Please fill in both fields!");
        }
      };
    },
  ]);
  