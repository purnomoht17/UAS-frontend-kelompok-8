// Mendeklarasikan controller SignupAdminController
app.controller("SignupAdminController", [
    "$scope",
    "$http",
    "$window",
    function ($scope, $http, $window) {
      $scope.admin = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
  
      // Fungsi signup untuk admin
      $scope.signup = function () {
        // Validasi password dan konfirmasi password
        if ($scope.admin.password !== $scope.admin.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
  
        // Persiapkan data untuk request signup admin
        const requestBody = {
          username: $scope.admin.username,
          email: $scope.admin.email,
          password: $scope.admin.password,
        };
  
        // Kirim HTTP POST request
        $http
          .post("http://localhost:3000/api/admins", requestBody)
          .then(
            function (response) {
              alert("Signup Successful!");
              $window.location.href = "loginAdmin";  // Arahkan ke halaman login admin setelah sukses
            },
            function (error) {
              const errCode = error.data.error.code;
              if (errCode == 23505) {
                // Tangani error jika email atau username sudah terdaftar
                const email = error.config.data.email;
                alert(`Email: ${email} or Username already exists!`);
              } else {
                alert("Signup Failed, please try again!");
              }
            }
          );
      };
    }
  ]);
  