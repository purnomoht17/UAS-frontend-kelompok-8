angular.module("myApp").controller("ContactController", [
  "$scope",
  "$http",
  "$window",
  function ($scope, $http, $window) {
    // Variabel untuk form kontak baru
    $scope.newContact = {
      firstName: "",
      email: "",
      message: "",
    };

    // Variabel lainnya
    $scope.contacts = [];
    $scope.isLoading = false;
    $scope.errorMessage = "";
    $scope.successMessage = "";
    const token = localStorage.getItem("authToken");

    // Fungsi untuk mengambil daftar kontak
    $scope.getContacts = function () {
      $scope.isLoading = true;
      $http
        .get("http://localhost:3000/api/contact")
        .then(function (response) {
          if (response.data && response.data.data) {
            $scope.contacts = response.data.data;
          } else {
            $scope.contacts = [];
            $scope.errorMessage = "Unexpected response structure.";
          }
        })
        .catch(function (error) {
          console.error("Failed to fetch contacts:", error);
          $scope.contacts = [];
          $scope.errorMessage =
            error.data?.message || "Failed to load contacts.";
        })
        .finally(function () {
          $scope.isLoading = false;
        });
    };

    // Fungsi untuk menambahkan kontak baru
    $scope.addContact = function () {
      // Validasi input
      if (
        !$scope.newContact.firstName ||
        !$scope.newContact.email ||
        !$scope.newContact.message
      ) {
        $scope.errorMessage =
          "Missing required fields. Please fill in all fields.";
        return;
      }

      // Validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test($scope.newContact.email)) {
        $scope.errorMessage = "Invalid email format.";
        return;
      }

      // Siapkan payload sesuai format backend
      const contactPayload = {
        first_name: $scope.newContact.firstName,
        email: $scope.newContact.email,
        text_message: $scope.newContact.message,
      };

      // Melakukan request untuk menambahkan kontak
      $http
        .post("http://localhost:3000/api/contact", contactPayload)
        .then(function (response) {
          $scope.successMessage = "Contact added successfully!";
          $scope.errorMessage = "";
          $scope.newContact = { firstName: "", email: "", message: "" }; // Reset form
          $scope.contacts.push(response.data.data); // Tambahkan ke daftar
        })
        .catch(function (error) {
          console.error("Error adding contact:", error);
          $scope.errorMessage =
            error.data?.message || "An unexpected error occurred.";
          $scope.successMessage = ""; // Hapus pesan sukses jika ada
        });
    };

    // Panggil fungsi untuk mendapatkan daftar kontak saat controller dimuat
    $scope.getContacts();
  },
]);
