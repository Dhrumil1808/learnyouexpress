angular
  .module('ListApp')
  .controller('employeeCtrl', ['$stateParams', '$state', '$scope', '$http', function($stateParams, $state, $scope, $http) {
    $scope.employee = {
      name: '',
      img: '',
      job: ''
    };

    $http({
      method: 'GET',
      url: '/api/employee/' + $stateParams.id
    }).then(function(response) {
        console.log('success')
        console.log(response);
        $scope.employee = response.data.employee;
      }, function(error) {
        console.log('error');
        console.log(error);
      });

    function getAllEmployees(cb) {
      var all = [];
      $http({
        method: 'GET',
        url: '/api/employees'
      }).then(function(response) {
          console.log('success')
          console.log(response);
          all = response.data.employees;
          cb(null, all);
          return;
        }, function(error) {
          console.log('error');
          console.log(error);
          cb(error);
          return;
        });
    }

    $scope.add = function (employee) {

      $http.post('/api/employees', employee)
        .success(function(data) {
          alert(employee.name + ' was successfully added.')
          $state.go('layout.list.employee', {id: employee._id});
          return;
        })
        .error(function(error) {
          throw err;
          return;
        });
    }

    $scope.update = function (employee) {

      $http.put('/api/employees', employee)
        .success(function(data) {
          alert(employee.name + ' was successfully updated.')
          $state.go('layout.list.employee', {id: employee._id});
          return;
        })
        .error(function(error) {
          throw err;
          return;
        });
    }

    $scope.delete = function (employee) {
      console.log(employee);

      $http.delete('/api/employees/' + employee._id)
        .success(function(data) {
          alert(employee.name + ' was successfully deleted.')
          $state.go('layout.list.employee', {id: employee._id});
          return;
        })
        .error(function(error) {
          throw err;
          return;
        });
    }

    return;
  }]);
