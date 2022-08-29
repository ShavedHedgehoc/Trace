import os
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


db = SQLAlchemy()

def create_app():
    
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = "fdflkdsfjlsf"

    if os.getenv("FLASK_ENV") == "development":
        print("Config in dev mode")
        app.config.from_object("config.DevelopmentConfig")        
    if os.getenv("FLASK_ENV") == "production":
        print("Config in prod mode")
        app.config.from_object("config.ProductionConfig")
    # if os.getenv("FLASK_ENV") == "testing" or os.getenv("FLASK_ENV") == None:
    #     print("Config in test mode")
    #     app.config.from_object("config.TestingConfig")

    jwt = JWTManager(app)
    cors = CORS(app)
    
    db.init_app(app)

    from app.resource import api
    api.init_app(app)

    return app
