const { Worker, isMainThread, parentPort, workerData } = require("node:worker_threads");

if (isMainThread) {
    function run(query) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, { workerData: query });
            worker.on("message", resolve);
            worker.on("error", reject);
            worker.on("exit", (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    };

    run("select 1 as x").then(x => console.log(x))
} else {
    const { parseQuerySync } = require("libpg-query");
    const query = workerData;
    parentPort.postMessage(parseQuerySync(query));
}
