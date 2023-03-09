const messages = require('./proto/user_pb');
const services = require('./proto/user_grpc_pb');
const grpc = require('@grpc/grpc-js');
const { fail } = require('assert');

function main() {
    const client = new services.UserServiceClient('localhost:50051', grpc.credentials.createInsecure());
    // let registerReq = new messages.RegisterRequest();
    // registerReq.setName("Hello");
    // registerReq.setEmail("hello@world.com");
    // registerReq.setPassword("Password");
    // client.register(registerReq, function(err, response) {
    //     console.log(response);
    // });

    let loginReq = new messages.LoginRequest();
    loginReq.setEmail("hello@world.com");
    loginReq.setPassword("Password");
    client.login(loginReq, function(err, response) {
        if (response !== undefined) {
            console.log("Verify Valid Login")
            verifyReq = new messages.VerifyRequest();
            verifyReq.setToken(response.array[3]);
            console.log(response.array[3])
            client.verify(verifyReq, function(err, response) {
                if (response !== undefined) {
                    console.log("Verify Valid Token")
                }
            });
            var failToken = response.array[3]
            var failToken = failToken.substring(0, failToken.length-1) + "z"
            verifyReq.setToken(failToken);
            client.verify(verifyReq, function(err, response) {
                if (err !== undefined) {
                    console.log("Verify Invalid Token")
                }
            });
        }
    });  

    loginReq = new messages.LoginRequest();
    loginReq.setEmail("hello@world.com");
    loginReq.setPassword("Password1");
    client.login(loginReq, function(err, response) {
        if (err !== undefined) {
            console.log("Verify Invalid Login")
        }
    });

}

main();