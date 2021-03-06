angular.module('parameterViewerModule')
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/Viewer.html',
        controller: 'parameterViewController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }])
  .controller('parameterViewController', ['$scope', '$log', 'parameterViewer',
    function($scope, $log, parameterViewer) {
      $scope.displayedParameters = [];

      $scope.getElement = function() {
        return $element;
      }

      $scope.addParameter = function(parameter) {
        $log.debug('Adding parameter: ' +parameter);
        parameterViewer.addParameterTrack(parameter);
      };

      $scope.drawParameter = function(parameter, containerId) {
        $log.debug('Drawing parameter: ' +parameter);
        parameterViewer.drawParameter(parameter, containerId);
      };

      $scope.headerDblClick = function(parameter) {
        $log.debug('Removing parameter: ' +parameter);
        parameterViewer.removeParameter(parameter);
      }

      // TODO Could avoid using object equality in the following
      $scope.$watch(parameterViewer.getDisplayedParameters, function() {
        $scope.displayedParameters = parameterViewer.getDisplayedParameters();
      }, true);

      $scope.handleKeyDownOnGraph = function(event) {
        $log.debug('Key down: ' + event);

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
