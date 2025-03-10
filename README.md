# MersenneQuick

**MersenneQuick** is a fast, efficient JavaScript implementation of the Mersenne Twister pseudo-random number generator (PRNG). It leverages modern JavaScript features such as typed arrays and `Math.imul` to deliver high-performance random number generation.

## Features

- **High Performance:** Optimized with typed arrays (`Uint32Array`) and `Math.imul` for fast arithmetic.
- **Quality Randomness:** Implements the well-known MT19937 algorithm for generating high-quality pseudo-random numbers.
- **Flexible Seeding:** Allows you to seed the generator with a custom value, or defaults to the current time if no seed is provided.
- **Simple API:** Provides functions to generate both 32-bit unsigned integers and floating point numbers in the range [0, 1].

## Installation

Install via npm:

```bash
npm install mersenne-quick
```

## Usage

Import the library and create an instance of `MersenneQuick`:

```javascript
import MersenneQuick from 'mersenne-quick';

// Create a new generator instance with an optional seed
const mt = new MersenneQuick(12345);

// Generate a random 32-bit unsigned integer
const randomInt = mt.genrand_int32();
console.log('Random Int:', randomInt);

// Generate a random floating point number in the range [0, 1)
const randomFloat = mt.random();
console.log('Random Float:', randomFloat);
```

## API

### Constructor

`new MersenneQuick(seed)`

- **seed** (optional): A number used to seed the generator. If not provided, the current time will be used.

### Methods

- **genrand_int32()**
  - Returns a pseudo-random 32-bit unsigned integer.
- **random()**
  - Returns a pseudo-random floating point number in the range [0, 1].

## Benchmarking

A benchmarking script is included to help you test the performance of **MersenneQuick**. To run the benchmark:

```bash
node benchmark
```

This script will perform multiple runs and output performance metrics such as throughput and execution time.

## Contributing
Contributions are welcome! If you have ideas for improvements or bug fixes, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
