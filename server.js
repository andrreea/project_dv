let express = require("express");
let app = express();
let proxy = require("./server/routes/proxy");
let os = require("os");
let config = require("./server/config/local.json");

let apiPrefix = "/data";
let apiPrefix3 = "/neo";

var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:ioio@localhost:7474');

let arg = require("minimist")(process.argv.slice(2), {
    default : {
        "rest-api" :config.restApi
    }
});

let headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
};

if (config.auth){
    headers.Authorization = "Basic " + Buffer.from('neo4j:ioio').toString("base64");
}

let restApi = arg["rest-api"].replace("localhost", os.hostname());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(apiPrefix, proxy({
    restApiHost: restApi,
    headers: headers,
    apiPrefix: apiPrefix
}));


function runAdhocQuery (req, res) {

    let retValue;

    db.cypher({
        query: 'MATCH (u:User {email: {email}}) RETURN u',
        params: {
            email: 'alice@example.com',
        },
    }, function (err, results) {
        if (err) {
            retValue = err;
        } else {
            retValue = results;
        }

        res.json({
            responseData: retValue
        });
    });
}

function getGraphForSearchTerm (req, res) {

    let retValue;

    console.log(req.params.searchTerm);

    db.cypher({
        query: 'MATCH (n1)-[r]->(n2) WHERE n1.name CONTAINS {name} OR n2.name CONTAINS {name} RETURN r, n1, n2',
        params: {
            name: req.params.searchTerm,
        },
    }, function (err, results) {
        if (err) {
            retValue = err;
        } else {
            retValue = results;
        }

        res.json({
            responseData: retValue
        });
    });
}


function getAllNodes (req, res) {

    let retValue;

    db.cypher({
        query: 'MATCH (n1)-[r]->(n2) RETURN r, n1, n2 LIMIT 25',
    }, function (err, results) {
        if (err) {
            retValue = err;
        } else {
            retValue = results;
        }

        res.json({
            responseData: retValue
        });
    });

}


app.get(apiPrefix3, function(request, response) {
        response.send("123");
    }
);

// app.get("/json", getAllNodes);
app.get("/json/:source/:target", getAllNodes);
app.get("/graph/getGraphByName/:searchTerm", getGraphForSearchTerm);

app.use("/", express.static(__dirname));
app.listen(3003, () => console.log("Started app on port", 3003));

module.exports = app;