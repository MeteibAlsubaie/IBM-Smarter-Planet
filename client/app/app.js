'use strict';

angular.module('smarterPlanetApp', [
  'smarterPlanetApp.auth',
  'smarterPlanetApp.admin',
  'smarterPlanetApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
