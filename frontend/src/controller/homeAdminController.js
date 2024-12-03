app.controller("HomeAdminController", [
    "$scope",
    "$http",
    "$window",
    function ($scope, $http, $window) {
      // Inisialisasi variabel
      $scope.newTour = {
        name: "",
        duration: 0,
        max_group_size: 0,
        difficulty: "",
        price: 0,
        summary: "",
        description: "",
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
            if (response.data && response.data.data) {
              $scope.tours = response.data.data; // Ambil daftar tours dari respons
            } else {
              $scope.tours = []; // Jika struktur tidak sesuai, kosongkan daftar
              $scope.errorMessage = "Unexpected response structure.";
            }
          })
          .catch(function (error) {
            console.error("Failed to fetch tours:", error);
            $scope.tours = [];
            $scope.errorMessage = error.data?.message || "Failed to load tours.";
          })
          .finally(function () {
            $scope.isLoading = false; // Set loading ke false setelah selesai
          });
      };
  
      // Fungsi untuk menambahkan tour baru
      $scope.addTour = function () {
        const formData = new FormData();
        formData.append("name", $scope.newTour.name);
        formData.append("duration", $scope.newTour.duration);
        formData.append("max_group_size", $scope.newTour.max_group_size);
        formData.append("difficulty", $scope.newTour.difficulty);
        formData.append("price", $scope.newTour.price);
        formData.append("summary", $scope.newTour.summary);
        formData.append("description", $scope.newTour.description);
  
        // Menambahkan file gambar jika ada
        if ($scope.newTour.imageCover) {
          formData.append("imageCover", $scope.newTour.imageCover);
        }
  
        const token = localStorage.getItem("authToken");
  
        $http
          .post("http://localhost:3000/api/tours", formData, {
            headers: {
              "Content-Type": undefined,
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response) {
            console.log("Tour added:", response.data);
            $scope.tours.push(response.data);
            $scope.newTour = {}; // Reset form setelah data berhasil dikirim
          })
          .catch(function (error) {
            console.error("Error adding tour:", error);
            $scope.errorMessage = error.data?.message || "Failed to add tour.";
          });
      };
  
      // Fungsi untuk menghapus tour
      $scope.deleteTour = function (tourId) {
        if (confirm("Are you sure you want to delete this tour?")) {
          const token = localStorage.getItem("authToken");
  
          $http
            .delete(`http://localhost:3000/api/tours/${tourId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(function () {
              alert("Tour deleted successfully!");
              $scope.getTours(); // Refresh daftar tours
            })
            .catch(function (error) {
              console.error("Failed to delete tour:", error);
              alert(error.data?.message || "Failed to delete tour.");
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
  