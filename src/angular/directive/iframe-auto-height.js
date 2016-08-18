(function () {
  'use strict';

  angular.module('nx.widget')
    .directive('nxIframeAutoHeight', ['$timeout',function ($timeout) {
      return {
        restrict: 'A',
        scope: {
          value: '='
        },
        link:function(scope,elem,attrs,vm){
          var iframDom=elem[0];
          window.onload=function(){
            scope.setHeight(iframDom);
          };
          window.onresize=function(){
            scope.setHeight(iframDom);
          };
        },
        controller:function($scope) {
          $scope.setHeight=setHeight;
          function setHeight(inIframeEl) {
            var iframeWin = inIframeEl.contentWindow || inIframeEl.contentDocument.parentWindow;
            if (iframeWin.document.body) {
              inIframeEl.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
            }
          }
        }
      };

    }]);


})();
