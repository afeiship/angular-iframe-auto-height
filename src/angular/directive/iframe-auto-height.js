(function () {
  'use strict';

  angular.module('nx.widget')
    .directive('nxIframeAutoHeight', ['$timeout',function ($timeout) {
      return {
        restrict: 'E',
        scope: {
          cssClass: '@',
          value: '='
        },
        link:function(scope,elem,attrs,vm){
          //code goes herer!
        },
        controller: ['$scope', function ($scope) {
          $scope.plus = plus;
          $scope.minus = minus;
          $scope.value = $scope.value || 0;

          function plus() {
            $scope.value++;
          }

          function minus() {
            $scope.value--;
          }
        }],
        template: '<div class="nx-widget-iframe-auto-height {{cssClass}}">' +
        '<button class="btn plus" ng-click="plus()">+</button>' +
        '<input class="value" ng-model="value" type="tel">' +
        '<button class="btn minus" ng-click="minus()">-</button>' +
        '</div>'
      };

    }]);


})();
