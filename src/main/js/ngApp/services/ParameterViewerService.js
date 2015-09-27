angular.module('parameterViewerModule')
  .factory('parameterViewer', ['backend', function(backend) {
    // TODO Do not hardcode dimensions
    return new ParameterViewer(400, 800, backend);
  }]);
