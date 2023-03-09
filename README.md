# Learning Microservices with gRPC

Easier version of [Joker666](https://github.com/Joker666/microservice-demo) demonstration respository

- Use 2 microservice for now

- userService is in Node and aims to allow for authentication

- projectService is in Python and aims to allow for CRUD-based services. It is dependent on userService as only authenticated users can use it

# Node.js gRPC userService

### References

https://www.mongodb.com/

https://hackernoon.com/building-user-service-with-grpc-nodejs-and-mongodb-the-complete-microservice-tutorial-part-2-jkw34pt

https://programmingpercy.tech/blog/using-grpc-tls-go-react-no-reverse-proxy/

https://www.freecodecamp.org/news/how-to-use-grpc-web-with-react-1c93feb691b5/

### Install Compiler

```
sudo npm install -g grpc-tools
```

### Compile with:

```
grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:userService/proto/ \
    --grpc_out=grpc_js:userService/proto \
    --proto_path=./protos/user ./protos/user/*.proto
```

# Python gRPC projectService

### Install Compiler

```
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

### Compile with:

```
python3 -m grpc_tools.protoc \
    --proto_path=./protos/project/ \
    ./protos/project/*.proto \
    --python_out=./projectService/proto/ \
    --grpc_python_out=./projectService/proto/

python3 -m grpc_tools.protoc \
    --proto_path=./protos/user/ \
    ./protos/user/*.proto \
    --python_out=./projectService/proto/ \
    --grpc_python_out=./projectService/proto/
```

### References

https://www.freemysqlhosting.net/account/

https://www.phpmyadmin.co/index.php

https://stackoverflow.com/questions/30990488/how-do-i-install-command-line-mysql-client-on-mac