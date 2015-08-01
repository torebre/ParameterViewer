angular.module('parameterViewerModule')
  .controller('parameterListController', ['$scope', 'parameterViewer',
    function($scope, parameterViewer) {
      $scope.parameters = [{
        'name': 'Test1',
        'unit': 'testUnit1'
      }, {
        'name': 'Test2',
        'unit': 'testUnit2'
      }]

      $scope.parameterDblClick = function(parameter) {
        // TODO This is a hack until I figure out how to structure the application
        parameterViewer.addParameterTrack(parameter);
      }

    }
  ]);
