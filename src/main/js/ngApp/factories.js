angular.module('dataFactory', [])
.factory('data', function($http){
  return {
    getData: function (parameter, callback){
      $http({
        method: 'GET',
        url: 'dummyData.js',
        cache: true
      }).success(callback);
    }
  };
});
