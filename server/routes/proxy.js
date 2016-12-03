let express = require("express");
let router = express.Router();
let request = require("request");
let host = "";
let requestInstance = request.defaults({proxy: false});

//proxy
router.all("*", (req, res) => {
        let stream;
        let url = host + req.originalUrl;

        stream = reg.pipe(requestInstance(url));

        stream.pipe(res);
    }
)

module.exports = restApiHost => {
    host = restApiHost;

    return router;
};