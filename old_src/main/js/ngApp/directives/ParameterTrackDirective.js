angular.module('parameterViewerModule')
  .directive('parameterTrack', ['$compile', '$timeout', 'parameterViewer',
      function($compile, $timeout, parameterViewer) {
        return {
      require: '^parameterTable',

          link: function postLink(scope, element, attrs, parameterTableController) {
            parameterViewer.drawParameter(element[0], attrs['parameter']);
            $compile(element.contents())(scope);

            // TODO Figure out if this can be done better
            // TODO Should add method to parameter viewer to set all dimensions
            $timeout(function() {
              var tableElement = parameterTableController.getParameterTableElement();
              var newWidths = [];
              tableElement.find('th').each(function(index, el) {
                var myElement = angular.element(el);
                newWidths.push(myElement.width());
              });
              parameterViewer.setColumnWidths(newWidths);

              var newHeights = [];
              tableElement.find('td').each(function(index, el) {
                var myElement = angular.element(el);
                newHeights.push(myElement.height());
              });
              parameterViewer.setColumnHeights(newHeights);
            });

          }
        }
      }
      ]);
