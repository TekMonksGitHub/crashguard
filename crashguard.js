#!/usr/bin/env node
/* 
 * crashguard.js, Runs local shell scripts or commands as servers
 * 
 * (C) 2020 TekMonks. All rights reserved.
 */
const spawn = require("child_process").spawn;
let conf; try{conf = require(`${__dirname}/conf/process.json`)}catch(err){}

main();

function main() {
    const argv = [...process.argv].slice(2);
    if (!conf) conf = argv.length?{process: argv}:undefined;

    if (!conf) {console.log(`Usage: ${__filename} [process and arguments]`); process.exit(1);}
    if (!Array.isArray(conf)) conf = [conf];

    const callback = process=>spawnArgs(process, callback);
    for (const process of conf) spawnArgs(process.process, callback);
}

function spawnArgs(args, callback) {
    const processChild = args.splice(0,1)[0]; 
    const shellProcess = spawn(processChild, args);
    if (!shellProcess || !shellProcess.stdout || !shellProcess.stderr) {console.error(`Can't launch ${processChild} ${args}, exiting.`); process.exit(1);}
    shellProcess.stdout.on("data", data => console.log(data.toString("utf8")));

    shellProcess.stderr.on("data", data => console.error(data.toString("utf8")));

    shellProcess.on("exit", _ => {
        console.error(`[CRASHGUARD] Process ${[processChild,...args]} exited, restarting.`);
        callback([processChild,...args]);
    });

    shellProcess.on("error", err => {console.error(err); console.error(`Can't launch ${processChild} ${args}, exiting.`); process.exit(1);});
}