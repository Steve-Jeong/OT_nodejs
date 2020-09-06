var name = 'Steve'

function scopeFunc() {
  name = 'Tom'
  console.log('in the function : ', name)
}
scopeFunc();
console.log('outside function : ', name);