require('jasmine-node');


//console.log(Math.floor(34.5));

describe("A suite is just a function", function() {
  var a;

console.log("Test");

  it("and so is a spec", function() {
    a = true;

console.log("Test2");
    expect(a).toBe(true);
  });
  });


var jasmineEnv = jasmine.getEnv();
//var htmlReporter = new jasmine.TapReporter(); // HtmlReporter();
//jasmineEnv.addReporter(htmlReporter);
jasmineEnv.execute();
