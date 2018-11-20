import Vec from './classes/Vec';

let vec = new Vec(1, 2);

console.log(vec.len);

vec.len = 42;

console.log(vec.len);