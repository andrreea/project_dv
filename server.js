let express = require("express");
let app = express();
let proxy = require("./server/routes/proxy");
let config = require("./server/config/local.json");

app.use("/data", proxy(config.restApi));
app.use("/", express.static(__dirname));
app.listen(3003, () => console.log("Started app on port", 3003));

module.exports = app;