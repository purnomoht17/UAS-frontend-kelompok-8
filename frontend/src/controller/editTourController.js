app.controller("EditTourController", [
    "$scope",
    "$http",
    "$routeParams",
    "$window",
    function ($scope, $http, $routeParams, $window) {
      const tourId = $routeParams.id;
  
      // Inisialisasi data tour
      $scope.tour = {
        name: "",
        description: "",
        price: 0,
        duration: 0,
        max_group_size: 0,
        difficulty: "",
        ratings_average: 0.0,
        ratings_quantity: 0,
        summary: "",
        image_cover: "",
      };
  
      // Mengambil token dari localStorage
      const token = localStorage.getItem("authToken");
  
      // Ambil data tour berdasarkan ID
      $http
        .get(`http://localhost:3000/api/tours/${tourId}`, {
          headers: { Authorization: `Bearer ${token}` }, // Menambahkan token di header
        })
        .then(function (response) {
          $scope.tour = response.data; // Menyimpan data tour yang diterima
        })
        .catch(function (error) {
          alert("Error fetching tour details.");
        });
  
      // Fungsi untuk memperbarui tour
      $scope.updateTour = function () {
        // Mengirimkan data tour untuk update
        $http
          .put(`http://localhost:3000/api/tours/${tourId}`, $scope.tour, {
            headers: { Authorization: `Bearer ${token}` }, // Menambahkan token di header
          })
          .then(function () {
            alert("Tour updated successfully!");
            $window.location.href = "/homeAdmin"; // Kembali ke home admin setelah update
          })
          .catch(function () {
            alert("Failed to update tour. Please try again.");
          });
      };
    },
  ]);
  