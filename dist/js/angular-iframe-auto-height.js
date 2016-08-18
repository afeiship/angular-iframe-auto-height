(function () {
  'use strict';

  angular.module('nx.widget', []);

})();

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
          window.onload=window.onresize=function(){
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

(function () {
  'use strict';

  /**
   * @Template service code:
   */

  var extend = angular.extend;
  var jqLite = angular.element;

  angular.module('nx.widget').factory('nxIframeAutoHeight', [
    '$rootScope',
    '$timeout',
    '$compile',
    '$sce',
    function ($rootScope, $timeout, $compile, $sce) {

      var scope, element;
      var defaults = {
        interval: 2000,
        cssClass: '',
        msg: _trustAsHtml('You toast <b>msg</b>!'),
        visible: false
      };
      initial();

      return {
        init: initial,
        show: Toast,
        destroy: destroy
      };

      function initial() {
        scope = extend($rootScope.$new(true), defaults);

        element = scope.element = $compile('<toast></toast>')(scope);
        jqLite(document.body).append(element);
      }

      function Toast(inOptions) {

        //init default options:
        var options = extend(scope, inOptions || {});
        scope.show = function () {
          scope.msg = _trustAsHtml(options.msg);
          scope.visible = true;
          scope.close();
        };

        scope.close = function () {
          $timeout(function () {
            scope.visible = false;
          }, options.interval);
        };


        scope.show();
      }

      function destroy() {
        scope.$destroy();
        element.remove();
      }

      /**@private**/
      function _trustAsHtml(inHtml) {
        return $sce.trustAsHtml(inHtml);
      }

    }]);
})();
