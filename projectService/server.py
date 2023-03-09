import logging
import os
import time
from concurrent import futures

import grpc
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import api
import model
import proto.project_pb2_grpc as project_service
import proto.user_pb2_grpc as user_service

load_dotenv(verbose=True)
SQLALCHEMY_DATABASE_URI = 'mysql://{}:{}@{}:{}/{}'.format(os.getenv("MYSQL_USER"), os.getenv("MYSQL_PASSWORD"), os.getenv("MYSQL_URL"), os.getenv("MYSQL_PORT"), os.getenv("MYSQL_DATABASE"))
engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=False)

def connect_db():
    try:
        conn = engine.connect()
    except OperationalError:
        logging.info("cannot connect")
        return


connect_db()
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()


def serve():
    with grpc.insecure_channel('localhost:50051') as userChannel:
        user_stub = user_service.UserServiceStub(userChannel)

        server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
        address = os.getenv("HOST") + ":" + os.getenv("PORT")
        server.add_insecure_port(address)

        model.create_tables()

        project_service.add_ProjectSvcServicer_to_server(api.API(user_stub), server)

        server.start()
        logging.info("Server started at: http://" + address)
        server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    serve()