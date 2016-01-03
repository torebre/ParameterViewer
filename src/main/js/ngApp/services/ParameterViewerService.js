angular.module('parameterViewerModule')
  .factory('parameterViewer', ['backend', function(backend) {
    // TODO Do not hardcode dimensions
    return new ParameterTable(400, 800, backend);
  }]);
