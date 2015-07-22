var parameterViewerController = angular.module('parameterViewerController', []);

parameterViewerController.controller('ParameterListCtrl', function($scope) {
  $scope.parameters = [
    {'name': 'Test1',
    'unit': 'testUnit1'},
    {'name': 'Test2',
    'unit': 'testUnit2'}
  ]
});
