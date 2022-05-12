from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
# from config import Config

db = SQLAlchemy()


def create_app():

    app = Flask(__name__)
    cors = CORS(app)

    app.config.from_object("config.Config")
    db.init_app(app)

    from app.api import bp as api_bp
    app.register_blueprint(api_bp)    

    return app
