angular
  .module('ListApp')
  .config(($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) => {
    // Clean Url
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('layout', {
        url: '',
        abstract: true,
        views: {
          'nav': {
            templateUrl: '/tpl/layout/navView.html'
          }
        }
      })
      .state('layout.home', {
        url: '/',
        views: {
          'main@': {
            templateUrl: '/tpl/layout/home/mainView.html',
            controller: 'homeCtrl',
          }
        }
      })
      .state('layout.about', {
        url: '/about',
        views: {
          'main@': {
            templateUrl: '/tpl/layout/about/mainView.html',
            controller: 'aboutCtrl',
          }
        }
      })
      .state('layout.list', {
        url: '/list',
        views: {
          'main@': {
            templateUrl: '/tpl/layout/list/mainView.html',
            controller: 'listCtrl',
          }
        }
      })
      .state('layout.list.employee', {
        url: '/employee/:id',
        views: {
          'listSub@layout.list': {
            templateUrl: '/tpl/layout/list/employee/listSubView.html',
            controller: 'employeeCtrl',
          }
        }
      })
      .state('layout.list.editEmployee', {
        url: '/employee/:id/edit',
        views: {
          'listSub@layout.list': {
            templateUrl: '/tpl/layout/list/editEmployee/listSubView.html',
            controller: 'employeeCtrl',
          }
        }
      })
      .state('layout.list.addEmployee', {
        url: '/employee/:id/add',
        views: {
          'listSub@layout.list': {
            templateUrl: '/tpl/layout/list/addEmployee/listSubView.html',
            controller: 'employeeCtrl',
          }
        }
      });
});
