define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	'angularResource',
  'angularBootstrap',

	], function (angular, filters, services, directives, controllers) {
		'use strict';

		return angular.module('myApp', [
			'ngRoute',
			'ngResource',
      'ui.bootstrap',
			'myApp.controllers',
			'myApp.filters',
			'myApp.services',
			'myApp.directives'
		]);
});
