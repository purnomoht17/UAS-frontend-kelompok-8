angular.module("myApp").controller("LoginController", [
  "$scope",
  "$http",
  function ($scope, $http) {
      // Inisialisasi objek user dan pesan
      $scope.user = {
          email: "",
          password: "",
      };
      $scope.errorMessage = "";
      $scope.successMessage = "";

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

                      // Tampilkan pesan sukses
                      $scope.successMessage = `Login Successful! Welcome, ${response.data.loginSuccess.name}`;
                      
                      // Redirect setelah beberapa detik
                      setTimeout(() => {
                          window.location.href = "dashboard/overview";
                      }, 1000);
                  })
                  .catch(function (error) {
                      // Set pesan error dari server ke errorMessage
                      $scope.errorMessage = error.data.message || "An error occurred during login.";
                  });
          } else {
              // Set pesan error untuk validasi
              $scope.errorMessage = "Please fill in both fields!";
          }
      };
  },
]);
