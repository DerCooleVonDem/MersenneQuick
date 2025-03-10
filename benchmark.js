'use strict';

const MersenneQuick = require('./index.js');

function detailedBenchmark() {
    const runs = 10;
    const iterations = 10_000_000;
    const mt = new MersenneQuick(1234);
    let globalSum = 0;
    let runTimes = [];

    console.log(`Starting detailed benchmark with ${runs} runs, each with ${iterations.toLocaleString()} iterations.`);

    console.log("Warming up JIT...");
    for (let warm = 0; warm < 2; warm++) {
        let warmupSum = 0;
        for (let i = 0; i < 1_000_000; i++) {
        warmupSum += mt.genrand_int32();
        }
        console.log(`Warm-up run ${warm + 1}: Sum = ${warmupSum}`);
    }

    const memoryBefore = process.memoryUsage();
    console.log("Memory usage before benchmark:", memoryBefore);
    const cpuBefore = process.cpuUsage();

    for (let run = 0; run < runs; run++) {
        let sum = 0;
        const start = process.hrtime.bigint();

        let i = 0;
        for (; i <= iterations - 4; i += 4) {
        sum += mt.genrand_int32();
        sum += mt.genrand_int32();
        sum += mt.genrand_int32();
        sum += mt.genrand_int32();
        }
        for (; i < iterations; i++) {
        sum += mt.genrand_int32();
        }

        const end = process.hrtime.bigint();
        const durationSec = Number(end - start) / 1e9;
        const throughput = iterations / durationSec;
        runTimes.push(durationSec);
        globalSum += sum;
        console.log(`Run ${run + 1}: Duration = ${durationSec.toFixed(3)} s, Throughput = ${throughput.toFixed(0)} numbers/s, Sum = ${sum}`);
    }

    const memoryAfter = process.memoryUsage();
    const cpuAfter = process.cpuUsage(cpuBefore);
    console.log("\nMemory usage after benchmark:", memoryAfter);
    console.log("CPU usage during benchmark:", cpuAfter);

    const minTime = Math.min(...runTimes);
    const maxTime = Math.max(...runTimes);
    const avgTime = runTimes.reduce((acc, cur) => acc + cur, 0) / runTimes.length;
    const variance = runTimes.reduce((acc, cur) => acc + Math.pow(cur - avgTime, 2), 0) / runTimes.length;
    const stdDev = Math.sqrt(variance);

    console.log("\nBenchmark Summary:");
    console.log(`Total runs: ${runs}`);
    console.log(`Iterations per run: ${iterations.toLocaleString()}`);
    console.log(`Minimum time: ${minTime.toFixed(3)} s`);
    console.log(`Maximum time: ${maxTime.toFixed(3)} s`);
    console.log(`Average time: ${avgTime.toFixed(3)} s`);
    console.log(`Standard Deviation: ${stdDev.toFixed(3)} s`);
    console.log(`Average Throughput: ${(iterations / avgTime).toFixed(0)} numbers/s`);
    console.log(`Global sum (to prevent optimizations): ${globalSum}`);
}

detailedBenchmark();