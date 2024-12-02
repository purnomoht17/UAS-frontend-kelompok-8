app.controller("EditTourController", [
    "$scope",
    "$http",
    "$routeParams",
    "$window",
    function ($scope, $http, $routeParams, $window) {
      const tourId = $routeParams.id;
  
      // Ambil data tour berdasarkan ID
      $http.get(`http://localhost:3000/api/tours/${tourId}`)
        .then(function (response) {
          $scope.tour = response.data;  // Menyimpan data tour yang diterima
        })
        .catch(function (error) {
          alert("Error fetching tour details.");
        });
  
      // Fungsi untuk memperbarui tour
      $scope.updateTour = function () {
        $http.put(`http://localhost:3000/api/tours/${tourId}`, $scope.tour)
          .then(function (response) {
            alert("Tour updated successfully!");
            $window.location.href = "/homeAdmin";  // Kembali ke home admin setelah update
          })
          .catch(function (error) {
            alert("Failed to update tour. Please try again.");
          });
      };
    },
  ]);
  