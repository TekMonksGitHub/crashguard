# crashguard
Spawns a process and respawns on crash. Quite simple.

# Usage
(1) Install node.js   
(2) crashguard.js [process and arguments]

# Conf file
Alternatively multiple processes can be specified via the `conf/process.json` file. 

See `conf/process.json.example` for an example and rename it as `process.json`.

If conf file is used, then command line arguments are ignored.

# Why?
If a utility has to be a reliable process, it must be very simple. Crashguard is made to be as simple as possible to avoid as many bugs as possible. Thus, it can be a good "crash guard". Writing complicated process monitors doesn't make sense, as they themselves may just crash, if they are complex, due to unforeseen bugs. 