var dummyData = require('./DummyData.js');

module.exports = (function() {

  // TODO This class just contains dummy data for now
  function Backend() {

    this.getBlockLength = function() {
      return 32;
    };

    this.getRangeStart = function() {
      return 0;
    };

    this.getBlockIndices = function(rangeStart, rangeEnd) {
      var dataStart = this.getRangeStart();
      var blockLength = this.getBlockLength();

      var current = rangeStart - dataStart;

      var firstBlock = Math.floor(rangeStart / blockLength);
      var prefix = rangeStart % blockLength;

      var lastBlock = Math.floor(rangeEnd / blockLength);
      var postfix = rangeEnd % blockLength;

      return {
        firstBlock: firstBlock,
        prefix: prefix,
        lastBlock: lastBlock,
        postfix: postfix
      };

    };


    this.getRangeEnd = function() {
      return dummyData.values.length - 1;
    };

    this.getMin = function(parameter) {
      return -1;
    };

    this.getMax = function(parameter) {
      return 1;
    };

    // Calculates the minimum, maximum and average for the
    // parameter within the range [start, stop]. The start
    // and stop values are integers that represent a range
    // of index points
    this.getValue = function(parameter, start, stop) {
      var average = 0;

      // console.log('Parameter: ' +parameter +'. Start: ' +start +'. Stop: ' +stop);

      // TODO Add some more parameters in the dummy data
      var min = dummyData.values[start];
      var max = dummyData.values[start];

      for (var index = start; index <= stop; ++index) {
        average += dummyData.values[index];

        if (min < dummyData.values[index]) {
          min = dummyData.values[index];
        }
        if (max > dummyData.values[index]) {
          max = dummyData.values[index];
        }
      }
      average /= (stop - start + 1);

      // console.log('Average: ' +average +'. Min: ' +min +'. Max: ' +max);

      return {
        average: average,
        min: min,
        max: max
      };
    }
  }

  return Backend;
})();
