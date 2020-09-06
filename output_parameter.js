var outputTestFunc = function(output) {
  output.name = 'Steve'
}

function slowFunc(name, outputTestFunc){
  var variable={}
  outputTestFunc(variable);
};

var some={name:'Tom'};
slowFunc('Steve', function(some){
  console.log(some);
})

// function primitiveFunc(text, callback) {
//   if(text === 'name') {
//     callback
//   }
// }

// primitiveFunc('name', outputTestFunc(some){
//   console
// })