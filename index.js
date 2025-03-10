'use strict';

class MersenneQuick {
  constructor(seed) {
    // Constants
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;
    this.UPPER_MASK = 0x80000000;
    this.LOWER_MASK = 0x7fffffff;

    // Initialize state array
    this.mt = new Uint32Array(this.N);
    this.mti = this.N;

    // Seed with provided value or current time
    this.init_genrand(seed !== undefined ? seed : Date.now());
  }

  init_genrand(s) {
    const mt = this.mt;
    mt[0] = s >>> 0;
    for (let i = 1; i < this.N; i++) {
      mt[i] = Math.imul(1812433253, mt[i - 1] ^ (mt[i - 1] >>> 30)) + i;
      mt[i] = mt[i] >>> 0;
    }
  }

  genrand_int32() {
    let y;
    // Define constants locally for efficiency
    const N = this.N,
          M = this.M,
          UPPER_MASK = this.UPPER_MASK,
          LOWER_MASK = this.LOWER_MASK,
          MATRIX_A = this.MATRIX_A;

    if (this.mti >= N) {
      const mt = this.mt;
      let kk = 0;

      // First twist loop: kk from 0 to N - M - 1 (0 to 226)
      for (; kk < N - M; kk++) {
        y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
        mt[kk] = mt[kk + M] ^ (y >>> 1) ^ ((y & 1) * MATRIX_A);
      }

      // Second twist loop: kk from 227 to N - 2 (622)
      for (; kk < N - 1; kk++) {
        y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
        mt[kk] = mt[kk + (M - N)] ^ (y >>> 1) ^ ((y & 1) * MATRIX_A);
      }

      // Final twist step for kk = N - 1 (623)
      y = (mt[N - 1] & UPPER_MASK) | (mt[0] & LOWER_MASK);
      mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ ((y & 1) * MATRIX_A);

      this.mti = 0;
    }

    // Extract and temper the number
    y = this.mt[this.mti++];
    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;

    return y >>> 0; // Ensure unsigned 32-bit integer
  }

  random() {
    return this.genrand_int32() * (1.0 / 4294967296.0); // [0, 1 - 1/2^32)
  }
}

module.exports = MersenneQuick;