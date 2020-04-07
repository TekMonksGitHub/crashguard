/* 
 * crashguard.js, Runs local shell scripts or commands as servers
 * 
 * (C) 2020 TekMonks. All rights reserved.
 */
const spawn = require("child_process").spawn;
const conf = require(`${__dirname}/conf/process.json`);

const callback = process=>spawnArgs(process,callback);
spawnArgs(conf.process, callback);

function spawnArgs(args, callback) {
    const process = args.splice(0,1)[0]; 
    const shellProcess = spawn(process, args);
    shellProcess.stdout.on("data", data => console.log(data.toString("utf8")));

    shellProcess.stderr.on("data", data => console.error(data.toString("utf8")));

    shellProcess.on("exit", _ => {
        console.error(`[CRASHGUARD] Process ${args} exited, restarting.`);
        callback([process,...args]);
    });
}