module Backend {

    export interface IBackend {

        getBlockLengthfunction():number

        getRangeStart():number

        getBlockIndices(rangeStart:number, rangeEnd:number):number

        getRangeEnd():number

        getMin(parameter:number):number

        getMax(parameter:number):number

// Calculates the minimum, maximum and average for the
// parameter within the range [start, stop]. The start
// and stop values are integers that represent a range
// of index points
        getValue(parameter:number, start:number, stop:number):ValueSummary

//{
//    var average = 0;
//
//    // console.log('Parameter: ' +parameter +'. Start: ' +start +'. Stop: ' +stop);
//
//    // TODO Add some more parameters in the dummy data
//    var min = dummyData.values[start];
//    var max = dummyData.values[start];
//
//    for (var index = start; index <= stop; ++index) {
//        average += dummyData.values[index];
//
//        if (min < dummyData.values[index]) {
//            min = dummyData.values[index];
//        }
//        if (max > dummyData.values[index]) {
//            max = dummyData.values[index];
//        }
//    }
//    average /= (stop - start + 1);
//
//    // console.log('Average: ' +average +'. Min: ' +min +'. Max: ' +max);
//
//}


    }


}