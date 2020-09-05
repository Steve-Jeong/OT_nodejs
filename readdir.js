var fs = require('fs')
var testFolder = 'data'

var argv = process.argv
var listNo=0

if(argv[2]!== null) {
  listNo = parseInt(argv[2])
} else
  listNo = 0

var filelistOutside=null;
fs.readdir(testFolder, (err, filelist)=> {
  console.log(argv.length)
  filelistOutside = filelist;
  if(argv.length > 2) {
    console.log(filelist[listNo])
  } else {
    console.log(filelist)
  }
})
console.log('outside of readdir : ', filelistOutside);