angular.module('parameterViewerModule')
  .directive('parameterTable', ['parameterViewer', function(parameterViewer) {
    return {
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        this.getParameterTableElement = function() {
          return $element;
        }
      }]
    }
  }]);
