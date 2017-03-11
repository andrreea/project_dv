let express = require("express");
let router = express.Router();
let request = require("request");
let host = "";
let customHeaders = {};
let prefix = "";

//proxy
router.all("*", (req, res) => {
    let stream;
let url = host + req.originalUrl.replace(prefix, "");
let requestInstance = request.defaults({
    headers: customHeaders,
    proxy : false
});

console.log("proxy", url);

stream = req.pipe(requestInstance(url));

stream.pipe(res);
}
)

module.exports = ({restApiHost, headers, apiPrefix}) => {
    host = restApiHost;
    customHeaders = headers;
    prefix = apiPrefix;

    return router;
};