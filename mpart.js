// Assigning to exports will not modify module, must use module.exports
// module.exports = class Square {
//   constructor(width) {
//     this.width = width;
//   }

//   name = 'Steve';

//   area() {
//     return this.width ** 2;
//   }
// };

const { PI } = Math;

exports.area = (r) => PI * r ** 2;

exports.circumference = (r) => 2 * PI * r;