# backend/app/__init__.py
import time
from flask import Flask
from flask_cors import CORS
from sqlalchemy.exc import OperationalError

from .config import Config
from .extensions import db, jwt, migrate, init_mongo
import time
from sqlalchemy.exc import OperationalError

from .auth.routes import auth_bp
from .modules.courses.routes import course_bp
# from app.modules.debug.routes import debug_bp


def wait_for_db(app):
    retries = 10
    delay = 2

    for i in range(retries):
        try:
            with app.app_context():
                db.engine.connect()
            print("✅ Connected to Postgres!")
            return
        except OperationalError:
            print(f"⏳ Waiting for Postgres... ({i+1}/{retries})")
            time.sleep(delay)

    raise Exception("❌ Database not ready after multiple attempts")


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    init_mongo(app)  


    def wait_for_postgres(app, retries=10, delay=3):
        from .extensions import db

        for i in range(retries):
            try:
                with app.app_context():
                    db.engine.connect()
                print("✅ Connected to Postgres!")
                return
            except OperationalError:
                print(f"⏳ Postgres not ready... retry {i+1}/{retries}")
                time.sleep(delay)

        raise RuntimeError("❌ Could not connect to Postgres")

    # ✅ WAIT FOR POSTGRES HERE
    wait_for_db(app)

    # JWT error handlers
    @jwt.unauthorized_loader
    def missing_token(reason):
        return {"error": "Missing token"}, 401

    @jwt.invalid_token_loader
    def invalid_token(reason):
        return {"error": "Invalid token"}, 401

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return {"error": "Token expired"}, 401
    
    print("🔥 ACTUAL DB URL:", app.config["SQLALCHEMY_DATABASE_URI"])

    CORS(
        app,
        origins=["http://localhost:5173", "http://localhost:3000"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allow_headers=["Content-Type", "Authorization"],
        supports_credentials=True
    )

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(course_bp, url_prefix="/api/courses")
    # app.register_blueprint(debug_bp)

    

    return app