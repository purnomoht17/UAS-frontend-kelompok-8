angular.module("myApp").controller("HomeController", [
    "$scope",
    "$http",
    "$window", // Import $window untuk navigasi
    "$stateParams", // Untuk mengambil parameter dari URL
    function ($scope, $http, $window, $stateParams) {
        // Data untuk user
        $scope.name = "Guest"; // Default username
        $scope.isLoggedIn = false; // Status login
        $scope.errorMessage = ''; // Menyimpan pesan error umum
        $scope.isLoading = true; // Menandakan data sedang dimuat

        // Data untuk tour
        $scope.tour = {}; // Objek untuk menyimpan data tour spesifik
        $scope.tours = []; // Array untuk menyimpan data tours

        // Mendapatkan id tour dari URL (hanya untuk detail tour)
        const tourId = $stateParams.id;  

        const token = localStorage.getItem("authToken"); // Mengambil token dari localStorage
        const userId = localStorage.getItem("id"); // Mengambil userId dari localStorage

        // Mengecek login status
        if (token && userId) {
            $scope.isLoggedIn = true;
            // Mendapatkan data user berdasarkan userId
            $http
                .get(`http://localhost:3000/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(function (response) {
                    $scope.name = response.data.name || "Guest"; // Update username jika ada
                })
                .catch(function (error) {
                    console.error("Failed to fetch user data:", error);
                    $scope.name = "Guest"; // Tetap Guest jika gagal fetch data user
                });
        } else {
            $scope.isLoggedIn = false;
            $scope.name = "Guest"; // Nama user jika belum login
        }

        // Jika ada id tour di URL, ambil detail tour spesifik
        if (tourId) {
            // Mengambil data tour berdasarkan id
            $http
                .get(`http://localhost:3000/api/tours/${tourId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(function (response) {
                    // Pastikan data yang diterima sesuai dengan yang diharapkan
                    if (response.data && response.data.data) {
                        $scope.tour = response.data.data; // Menyimpan data tour ke dalam scope
                    } else {
                        $scope.tour = response.data; // Jika tidak ada data dalam `data`, simpan langsung
                    }
                })
                .catch(function (error) {
                    console.error("Failed to fetch tour details:", error);
                    $scope.tour = {}; // Kosongkan data tour jika gagal
                    $scope.errorMessage = "Failed to load tour details. Please try again later."; // Set pesan error
                })
                .finally(function () {
                    $scope.isLoading = false; // Set loading menjadi false setelah proses selesai
                });
        } else {
            // Jika tidak ada id tour (halaman utama)
            $http
                .get("http://localhost:3000/api/tours/")
                .then(function (response) {
                    // Pastikan struktur data yang diterima adalah yang diharapkan
                    if (response.data && response.data.data) {
                        $scope.tours = response.data.data;  // Menyimpan data tour
                    } else {
                        $scope.tours = response.data; // Jika response tidak memiliki `data`, coba akses langsung
                    }
                })
                .catch(function (error) {
                    console.error("Failed to fetch tours:", error);
                    $scope.tours = []; // Jika gagal mengambil data tours, kosongkan array
                    $scope.errorMessage = "Failed to load tours. Please try again later."; // Set pesan error
                })
                .finally(function () {
                    $scope.isLoading = false; // Setelah semua data selesai diambil, set loading menjadi false
                });
        }

        // Fungsi untuk memeriksa login sebelum mengakses link "Learn More"
        $scope.checkLogin = function() {
            if (!token) {
                // Menampilkan peringatan jika belum login
                alert("You need to login first to view this page.");
                // Redirect ke halaman login
                $window.location.href = '/login';
            }
        };

        // Fungsi untuk logout
        $scope.logout = function() {
            // Menghapus token dan userId dari localStorage untuk logout
            localStorage.removeItem("authToken");
            localStorage.removeItem("id");
            $scope.name = "Guest"; // Mengubah nama user menjadi Guest
            $window.location.href = '/'; // Redirect ke home page setelah logout
        };
    }
]);
