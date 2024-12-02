angular.module("myApp").controller("ContactController", [
    "$scope",
    "$http",
    function ($scope, $http) {
      $scope.name = "Guest"; // Default username
  
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("id");
  
      if (token && userId) {
        $http
          .get(`http://localhost:3000/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(function (response) {
            $scope.name = response.data.name || "Guest"; // Update username jika ada
          })
          .catch(function (error) {
            console.error("Failed to fetch user data:", error);
            $scope.name = "Guest"; // Jika gagal fetch data user, tetap Guest
          });
      } else {
        $scope.name = "Guest";
      }
    },
]);