var logPower = {"debug" : 0, "info" : 1, "warn" : 2, "error": 3};

class CustomLogger{
    constructor(loglvl){
        this.loglvl = logPower[loglvl];
    }

    warn(...data){
        if (this.loglvl >= logPower["warn"])
        console.warn(data)
    }

    debug(...data){
        if (this.loglvl >= logPower["debug"])
        console.debug(data)
    }


}

const logger = new CustomLogger("debug");
exports.logger = logger