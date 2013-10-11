define(['angular'], function (angular) {
	'use strict';


	angular.module('myApp.services', ['ngResource'])
			.factory('srvAutocomplete', function ($resource) {

				return $resource('/api/directions', {}, {
					query: {method: 'GET', params: {searchParams: '@params'}, isArray: true}

				});
			})
});