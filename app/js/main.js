require.config({
  paths: {
    angular: '../../bower_components/angular/angular',
    angularRoute: '../../bower_components/angular-route/angular-route',
    angularMocks: '../../bower_components/angular-mocks/angular-mocks',
    angularResource: '../../bower_components/angular-resource/angular-resource.min',
    angularBootstrap: '../../bower_components/angular-bootstrap/ui-bootstrap-tpls-0.6.0.min',
    text: '../../bower_components/requirejs-text/text'
  },
  baseUrl: 'app/js',
  shim: {
    'angular' : {'exports' : 'angular'},
    'angularRoute': ['angular'],
    'angularMocks': {
      deps:['angular'],
      'exports':'angular.mock'
    }
  },
  priority: [
    "angular"
  ]
});

// hey Angular, we're bootstrapping manually!
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
  'angular',
  'app',
  'routes'
], function(angular, app, routes) {
  'use strict';
  var $html = angular.element(document.getElementsByTagName('html')[0]);

  angular.element().ready(function() {
    $html.addClass('ng-app');
    angular.bootstrap($html, [app['name']]);
  });
});
