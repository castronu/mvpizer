(function() {
  'use strict';

  angular
    .module('mvpizerAdmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('project/:projectName', {
        url: '/project/:projectName',
        templateUrl: 'app/project/project.html',
        controller: 'ProjectController',
        controllerAs: 'project'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
