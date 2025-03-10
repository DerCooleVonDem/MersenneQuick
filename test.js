import MersenneQuick from './index.js';

const mt = new MersenneQuick(1234);

console.log("Random number:", mt.random());
console.log("Random integer:", mt.genrand_int32());