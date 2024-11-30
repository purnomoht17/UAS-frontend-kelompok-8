// signupController.js
app.controller("SignupController", function ($scope, $http, $window) {
    $scope.user = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  
    // Validasi password dan konfirmasi password
    $scope.signup = function () {
      if ($scope.user.password !== $scope.user.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      const requestBody = {
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password,
      };
  
      // Kirim permintaan HTTP untuk signup
      $http
        .post("http://localhost:3000/api/users/", requestBody)  // Endpoint sesuai dengan yang sebelumnya
        .then(
          function (response) {
            alert("Signup Successful!");
            $window.location.href = "login"; // Arahkan ke halaman login setelah signup berhasil
          },
          function (error) {
            const errCode = error.data.error.code;
            if (errCode == 23505) {
              // Error jika email sudah terdaftar (kode error database)
              const email = error.config.data.email;
              alert(`Email: ${email} already exists!`);
            } else {
              alert("Signup Failed, please try again!");
            }
          }
        );
    };
  });
  