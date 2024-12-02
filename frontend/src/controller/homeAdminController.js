// Mendeklarasikan controller HomeAdminController
app.controller("HomeAdminController", [
    "$scope",
    "$http",
    "$window",
    function ($scope, $http, $window) {
      // Inisialisasi variabel
      $scope.newTour = {
        name: "",
        description: "",
        price: 0,
      };
      $scope.tours = []; // Array untuk menyimpan daftar tours
      $scope.isLoading = true; // Indikator pemuatan data
      $scope.errorMessage = ""; // Pesan error untuk ditampilkan jika ada masalah
  
      // Fungsi untuk mengambil daftar tours
      $scope.getTours = function () {
        $scope.isLoading = true; // Set loading ke true sebelum memuat data
        $http
          .get("http://localhost:3000/api/tours/")
          .then(function (response) {
            // Validasi struktur respons
            if (response.data && response.data.data) {
              $scope.tours = response.data.data; // Ambil daftar tours dari respons
            } else {
              $scope.tours = []; // Jika struktur tidak sesuai, kosongkan daftar
              $scope.errorMessage = "Unexpected response structure.";
            }
          })
          .catch(function (error) {
            console.error("Failed to fetch tours:", error);
            $scope.tours = []; // Kosongkan daftar jika terjadi error
            $scope.errorMessage = error.data?.message || "Failed to load tours. Please try again.";
          })
          .finally(function () {
            $scope.isLoading = false; // Set loading ke false setelah selesai
          });
      };
  
      // Fungsi untuk menambah tour baru
      $scope.addTour = function () {
        const newTourData = {
          name: $scope.newTour.name,
          description: $scope.newTour.description,
          price: $scope.newTour.price,
        };
  
        $http
          .post("http://localhost:3000/api/tours", newTourData)
          .then(function (response) {
            alert("Tour added successfully!");
            $scope.getTours(); // Refresh daftar tours
            $scope.newTour = { name: "", description: "", price: 0 }; // Reset form
          })
          .catch(function (error) {
            console.error("Failed to add tour:", error);
            alert(error.data?.message || "Failed to add tour. Please try again.");
          });
      };
  
      // Fungsi untuk menghapus tour
      $scope.deleteTour = function (tourId) {
        if (confirm("Are you sure you want to delete this tour?")) {
          $http
            .delete(`http://localhost:3000/api/tours/${tourId}`)
            .then(function (response) {
              alert("Tour deleted successfully!");
              $scope.getTours(); // Refresh daftar tours
            })
            .catch(function (error) {
              console.error("Failed to delete tour:", error);
              alert(error.data?.message || "Failed to delete tour. Please try again.");
            });
        }
      };
  
      // Fungsi untuk mengedit tour
      $scope.editTour = function (tour) {
        $window.location.href = `/editTour/${tour.id}`; // Arahkan ke halaman edit tour
      };
  
      // Panggil fungsi untuk mendapatkan daftar tours saat controller dimuat
      $scope.getTours();
    },
  ]);
  