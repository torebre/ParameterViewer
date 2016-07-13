angular.module('parameterViewerModule')
  .directive('colResizeable', ['$timeout', 'parameterViewer', function($timeout, parameterViewer) {
    return {
      require: '^parameterTable',
      template: '{{ parameter}} <div class="col-resize" ng-mousedown="resizing($event)"></div>',

      link: function postLink($scope, element, attrs, parameterTableController) {
        $timeout(function() {
          // http://stackoverflow.com/questions/11125078/is-there-a-post-render-callback-for-angular-js-directive
          moveResizeMarkers(element);
        });

        $scope.resizing = function(e) {
          var parameterTableElement = parameterTableController.getParameterTableElement();
          var screenOffset = parameterTableElement.scrollLeft();
          var resizeElement = angular.element(e.target);
          var tableHeader = resizeElement.parent();
          var startPoint = e.pageX;
          var myDocument = angular.element(document);
          var selectedElementIndex = 0;
          var headerWidths = [];
          parameterTableElement.find('.col-resize').each(function(index, myElement) {
            headerWidths[index] = angular.element(myElement).parent().width();
            if (e.target == myElement) {
              selectedElementIndex = index;
            }
          });

          var tableHeaderInitialWidth = tableHeader.width();
          myDocument.bind('mousemove', function(e) {
            var offset = e.pageX - startPoint;

            e.preventDefault();
            if (offset < 0 && (tableHeaderInitialWidth + offset) <= 0) {
              return;
            }
          });

          myDocument.bind('mouseup', function(e) {
            e.preventDefault();
            myDocument.unbind('mousemove');
            myDocument.unbind('mouseup');

            var offset = e.pageX - startPoint;
            var newWidth = offset + tableHeaderInitialWidth;
            var minWidth = 10;

            // TODO This can be done better
            var cumulativeWidth = 0;
            parameterTableElement.find('th').each(function(index, myElement) {
              if (index == selectedElementIndex) {
                cumulativeWidth += Math.max(minWidth, newWidth);
              } else {
                cumulativeWidth += headerWidths[index];
              }
            });

            parameterTableElement.css('width', cumulativeWidth);

            parameterTableElement.find('th').each(function(index, myElement) {
              if (index == selectedElementIndex) {
                angular.element(myElement).css('width', Math.max(minWidth, newWidth));
              } else {
                angular.element(myElement).css('width', headerWidths[index]);
              }
            });

            $timeout(function() {
              moveResizeMarkers(element);

              var tableElement = parameterTableController.getParameterTableElement();
              var newWidths = [];
              tableElement.find('th').each(function(index, el) {
                var myElement = angular.element(el);

                console.log("Table header width: " +myElement.width());

                newWidths.push(myElement.width());
              });
              parameterViewer.setColumnWidths(newWidths);

              console.log("Column heights:")
              tableElement.find('td').each(function(index, el) {
                var myElement = angular.element(el);
                console.log("Column height: " +myElement.height());

              });


            });
          });
        }

        function moveResizeMarkers(element) {
          var tableElement = parameterTableController.getParameterTableElement();
          var currentXPos = 0;
          tableElement.find('.col-resize').each(function(index, el) {
            var myElement = angular.element(el);
            var width = myElement.width();
            var parentWidth = myElement.parent().width();
            currentXPos += parentWidth;
            myElement.css('left', currentXPos);
          });
        }
      }
    }
  }]);
