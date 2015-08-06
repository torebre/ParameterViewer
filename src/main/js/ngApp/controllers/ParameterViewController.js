angular.module('parameterViewerModule')
  .controller('parameterViewController', ['$scope', 'parameterViewer',
    function($scope, parameterViewer) {
      $scope.displayedParameters = [];

      $scope.addParameter = function(parameter) {
        parameterViewer.addParameterTrack(parameter);
      };

      $scope.drawParameter = function(parameter, containerId) {
        parameterViewer.drawParameter(parameter, containerId);
      };

      $scope.headerDblClick = function(parameter) {
        console.log('Removing parameter: ' +parameter);
        parameterViewer.removeParameter(parameter);
      }

      // TODO Could avoid using object equality in the following
      $scope.$watch(parameterViewer.getDisplayedParameters, function() {
        $scope.displayedParameters = parameterViewer.getDisplayedParameters();
      }, true);

      $scope.handleKeyDownOnGraph = function(event) {
        console.log('Key down: ' + event);

        switch (event.keyCode) {
          case 73:
            parameterViewer.zoomIn();
            break;

          case 79:
            parameterViewer.zoomOut();
            break;

          case 40:
            parameterViewer.scrollDown();
            break;

          case 38:
            parameterViewer.scrollUp();
            break;

          default:
            break;
        }
      };

    }
  ]);
