var parameterViewerController = angular.module('parameterViewerController', []);

parameterViewerController.controller('ParameterListCtrl', function($scope) {
  $scope.parameters = [
    {'name': 'Test1',
    'unit': 'testUnit1'},
    {'name': 'Test2',
    'unit': 'testUnit2'}
  ]

  $scope.parameterDblClick = function(parameter) {
    // TODO This is a hack until I figure out how to structure the application
    parameterViewer.addParameterTrack(parameter);
  }

  $scope.handleKeyDownOnGraph = function(event) {
    console.log('Key down: ' +event);
  }

});
