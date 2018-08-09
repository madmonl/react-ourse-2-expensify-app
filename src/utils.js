console.log('utils');

const square = (x) => x * x; 

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;
//or export default (a, b) => a - b;

export { square, add, subtract as default}; //named exports

//exports - default objects - named exports.