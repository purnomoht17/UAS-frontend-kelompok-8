angular.module("myApp").controller("AboutController", [
  "$scope",
  "$http",
  "$window",
  function ($scope, $http, $window) {
    // Variabel untuk subscribe form
    $scope.newSubscriber = {
      firstName: "",
      email: "",
    };

    // Variabel lainnya
    $scope.subscribers = [];
    $scope.isLoading = false;
    $scope.errorMessage = "";
    $scope.successMessage = "";

    // Fungsi untuk mengambil daftar subscribers
    $scope.getSubscribers = function () {
      $scope.isLoading = true;
      $http
        .get("http://localhost:3000/api/subscribe")
        .then(function (response) {
          if (response.data && response.data.data) {
            $scope.subscribers = response.data.data;
          } else {
            $scope.subscribers = [];
            $scope.errorMessage = "Unexpected response structure.";
          }
        })
        .catch(function (error) {
          console.error("Failed to fetch subscribers:", error);
          $scope.subscribers = [];
          $scope.errorMessage = error.data?.message || "Failed to load subscribers.";
        })
        .finally(function () {
          $scope.isLoading = false;
        });
    };

    $scope.addSubscriber = function () {
      if (!$scope.newSubscriber.firstName || !$scope.newSubscriber.email) {
        $scope.errorMessage = "Missing required fields. Please fill in all fields.";
        return;
      }

      // Siapkan payload sesuai format backend
      const subscriberPayload = {
        first_name: $scope.newSubscriber.firstName, // Konversi firstName ke first_name
        email: $scope.newSubscriber.email,
      };

      $scope.isLoading = true; // Set loading state
      $http
        .post("http://localhost:3000/api/subscribe", subscriberPayload)
        .then(function (response) {
          $scope.successMessage = "You have successfully subscribed!";
          $scope.errorMessage = "";
          $scope.newSubscriber = { firstName: "", email: "" }; // Reset form
          $scope.subscribers.push(response.data.data); // Tambahkan ke daftar
        })
        .catch(function (error) {
          console.error("Error adding subscriber:", error);
          $scope.errorMessage = error.data?.message || "An unexpected error occurred.";
          $scope.successMessage = ""; // Hapus pesan sukses jika ada
        })
        .finally(function () {
          $scope.isLoading = false; // Reset loading state
        });
    };

    // Panggil fungsi untuk mendapatkan daftar subscribers saat controller dimuat
    $scope.getSubscribers();
  },
]);