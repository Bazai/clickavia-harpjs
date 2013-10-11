define(['angular', 'services'], function (angular, services) {
	'use strict';

	angular.module('myApp.directives', ['myApp.services'])

			.directive('autocomplete', ['srvAutocomplete', function (srvAutocomplete) {
				return {
					restrict: 'E',
					replace: true,
					scope: {
						placeholder: "@",
						initialType: "@",
						selectedItem: '='
					},

					templateUrl: '/web-site/app/partials/autocomplete.html',

					controller: function ($scope, $element, $attrs, srvAutocomplete) {

						$scope.searchTerm = "";
						$scope.selectedItem = {};
						$scope.isExistChildren = false;
						$scope.lastSearchTerm = "";
						$scope.isVisible = false;

						$scope.selectMe = function (point) {

							if (!point.exist_flights) {
								return false;
							}

							$scope.selectedItem = point;
							$scope.isExistChildren = false;

							if (point.exist_children && point.type === "country") {
								$scope.isExistChildren = true;
							}

							else {
								$scope.hideAutocomplete();
							}
							$scope.searchTerm = point.title;
						}


						$scope.getInitialCall = function (scale) {
							$scope.getData({initial_type: scale});
							$scope.showAutocomplete();
						}


						$scope.showAutocomplete = function () {
							$scope.isVisible = true;
						}


						$scope.hideAutocomplete = function () {
							$scope.isVisible = false;
						}


						$scope.updateSearch = function () {

							if ($scope.searchTerm.length === 0) {
								if ($scope.lastSearchTerm === "") {
									return false;
								}
								else {
									$scope.getInitialCall($scope.initialType);
								}
							}
							if ($scope.searchTerm == $scope.selectedItem.title && !$scope.isExistChildren) {
								return false;
							}

							var params = {}
							params.term = $scope.searchTerm;

							if ($scope.isExistChildren) {
								params.context_value = $scope.selectedItem.iata
								params.context_type = $scope.selectedItem.type
								params.term = ""
								$scope.isExistChildren = false;
							}

							$scope.getData(params);
						}


						//sample params: {term: "", initial_type: "cities"}
						$scope.getData = function (params) {
							srvAutocomplete.query(params, function (value) {
								$scope.pointsList = value;
								$scope.lastSearchTerm = $scope.searchTerm;
								$scope.showAutocomplete();
							});
						}


						$scope.$watch('searchTerm', $scope.updateSearch);

					},

					link: function (scope, iElement, iAttrs, controller) {


						var searchInput = angular.element(iElement.children()[0]);

						searchInput.parent()

						searchInput.bind("click", function (event) {

							// Don't init if field isn't empty
							if (scope.searchTerm.length > 0) {
								return false;
							}

							scope.getInitialCall(scope.initialType);
							scope.$apply();
						});


						// TODO:: make something more elegant

						angular.element(document).bind("click", function (event) {


							var el = angular.element(event.target);
							var isInputClicked = el.parent().hasClass("dropdown-menu--item");
							var isMenuClicked = el.attr("ng-model") == "searchTerm";

							if (scope.isVisible && !(isInputClicked || isMenuClicked)) {
								console.info("blur");
								scope.hideAutocomplete();
								scope.$apply();
							}
						});

						searchInput.bind("keydown", function (event) {

							switch (event.keyCode) {
								case 38:
									//Up Arrow
									console.log('move up');
									break;
								case 40:
									//Down Arrow                  searchInput
									console.log('move down');
									break;
								case 13:
								//Enter
								case 108:
									//NumKey Enter
									console.log('Enter pressed');
									break;
								case 32:
									//Space
									console.log('Space pressed');
									break;
								case 37:
									//Escape
									console.log('Escape Pressed');
									break;
							}
						});

					}
				}
			}]);

});