let express = require("express");
let app = express();
let proxy = require("./server/routes/proxy");
let os = require("os");
let config = require("./server/config/local.json");

let apiPrefix = "/data";

let arg = require("minimist")(process.argv.slice(2), {
    default : {
        "rest-api" :config.restApi
    }
});

let headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
}

let restApi = arg["rest-api"].replace("localhost", os.hostname());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(apiPrefix, proxy({
    restApiHost: restApi,
    headers: headers,
    apiPrefix: apiPrefix
}));

app.use("/", express.static(__dirname));
app.listen(3003, () => console.log("Started app on port", 3003));

module.exports = app;