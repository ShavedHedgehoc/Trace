from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = "fdflkdsfjlsf"
    app.config.from_object("config.Config")

    jwt = JWTManager(app)
    cors = CORS(app)

    db.init_app(app)
    
    from app.resource import api
    api.init_app(app)

    return app
