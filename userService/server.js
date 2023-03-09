require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const { MongoClient } = require("mongodb");
const services = require('./proto/user_grpc_pb');
const API = require("./api");
var dbClient

// Mongo Connection
if (process.env.ENV == "Production") {
    dbClient = new MongoClient(process.env.DB_URI, { useUnifiedTopology: true });
} else {
    dbClient = new MongoClient(process.env.DB_ATLAS, { useUnifiedTopology: true });
}

async function connectDB() {
    try {
        await dbClient.connect();
        let db = await dbClient.db(process.env.DB_NAME);
        db.command({ ping: 1 });
        console.log("Connected successfully to mongo server");
        // Create index
        await db.collection("users").createIndex({ email: 1 });
        return db
    } catch (e) {
        console.error(e);
    }
}

async function main() {
    var connectedDb = await connectDB().catch(console.dir);
    // grpc is for status only, https://grpc.github.io/grpc/core/md_doc_statuscodes.html 
    var api = new API(connectedDb, grpc);
    let server = new grpc.Server();
    server.addService(services.UserServiceService, {
        register: api.register,
        login: api.login,
        verify: api.verify,
        getUser: api.getUser,
        changeUserEmail: api.changeUserEmail,
    });
    let address = process.env.HOST + ":" + process.env.PORT;
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log("Server running at " + address);
    });
}

main();