'use strict';

angular.module('smarterPlanetApp.auth', [
  'smarterPlanetApp.constants',
  'smarterPlanetApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
