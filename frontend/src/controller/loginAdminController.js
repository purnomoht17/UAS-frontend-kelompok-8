// Mendeklarasikan controller LoginAdminController
app.controller("LoginAdminController", [
    "$scope",
    "$http",
    function ($scope, $http) {
      $scope.admin = {
        username: "",
        password: "",
      };
  
      $scope.login = function () {
        // Validasi input
        if ($scope.admin.username && $scope.admin.password) {
            const loginData = {
                username: $scope.admin.username, 
                password: $scope.admin.password,
            };
    
            // Log data yang dikirim
            console.log("Login data sent:", loginData);
    
            // Kirim request POST ke server untuk login
            $http
                .post("http://localhost:3000/api/authAdmin/login", loginData)
                .then(function (response) {
                    // Jika login berhasil, simpan token dan data admin di localStorage
                    const token = response.data.token;
                    localStorage.setItem("authToken", token);
                    localStorage.setItem("adminName", response.data.admin.username);  // Gunakan username dari respons
                    localStorage.setItem("adminEmail", response.data.admin.email);  // Gunakan email dari respons
    
                    // Tampilkan pesan sukses dan redirect ke halaman homeAdmin.html
                    alert(`Login Successful! Welcome, ${response.data.admin.username}`);
                    window.location.href = "/homeAdmin";  // Redirect ke halaman home admin setelah login berhasil
                })
                .catch(function (error) {
                    console.error("Login error:", error);
                    alert(error.data.message || "An error occurred while logging in.");
                });
        } else {
            alert("Please fill in both fields!");
        }
    };    
    },
  ]);
  