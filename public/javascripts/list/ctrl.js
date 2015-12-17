angular
  .module('ListApp')
  .controller('listCtrl', ['$scope', '$http', function($scope, $http) {
    console.log('list');
    $scope.employees = [];

    $http({
      method: 'GET',
      url: '/api/employees'
    }).then(function(response) {
      console.log(response.data);
        $scope.employees = response.data.employees;
      }, function(error) {
        console.log(error);
      });

    return;
  }]);
