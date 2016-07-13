angular.module('parameterViewerModule')
  .factory('backend', [function() {
    var backend = new Backend();
    return backend;
  }]);
