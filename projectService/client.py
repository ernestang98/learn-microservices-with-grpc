import proto.project_pb2 as message_project
import proto.project_pb2_grpc as service_project

import proto.user_pb2 as message_user
import proto.user_pb2_grpc as service_user

import logging
import grpc

def run():
    with grpc.insecure_channel('localhost:50052') as projectChannel:
        project_stub = service_project.ProjectSvcStub(projectChannel)
        response = project_stub.createProject(message_project.CreateProjectRequest(user_id="asdasdasdasdasdasdasd", name="zxczxczxc", token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDA3MGI5YTc5ZjI5Y2JlOTZkNjE4NTMiLCJuYW1lIjoiSGVsbG8iLCJlbWFpbCI6ImhlbGxvQHdvcmxkLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDNXb0luaVEwbnd3TEpRNnE2UVVkVi5yMThkbXNxd1A1UjZpY3B5UEN5WmNISlExenZrUmJLIiwiaWF0IjoxNjc4MzU2MjAyLCJleHAiOjE2ODE5NTYyMDJ9.ZGfDnUbnTbI34tBH3uNaGvok9ytITe9xYWiaBmT1Wpw"))
    print(response)


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    run()