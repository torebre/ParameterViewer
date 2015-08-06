angular.module('parameterViewerModule')
  .directive('parameterTrack', ['$compile', 'parameterViewer',
    function($compile, parameterViewer) {
      return {
        link: function(scope, element, attrs) {
          parameterViewer.drawParameter(element[0], attrs['parameter']);
          $compile(element.contents())(scope);
        }
      };
    }
  ]);
