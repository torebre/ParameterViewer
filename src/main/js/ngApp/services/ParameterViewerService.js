angular.module('parameterViewerModule')
  .factory('parameterViewer', ['backend', function(backend) {
    // TODO Do not hardcode dimensions
    return new ParameterViewer(800, 600, 'parameter-view', backend);
  }]);
