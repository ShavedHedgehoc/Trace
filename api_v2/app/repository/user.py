import bcrypt

from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError, OperationalError
from app.assets.api_dataclasses import LoginResponce, Payload, Tokens
from app.assets.api_errors import DatabaseConnectionError, MissingCredentialsError, PassNotEqualError, UserExistsError, UserNotExistsError
from app.schemas.user import UserLoginData, UserLoginSchema, UserRegisterSchema
from app.schemas.token import TokenSchema

from app.repository.session import SessionRepository
from app.repository.token import TokenRepository


from app import db
from app.models.user import User


token_repository = TokenRepository()
session_repository = SessionRepository()


class UserRepository():

    login_schema = UserLoginSchema()
    register_schema = UserRegisterSchema()
    token_schema = TokenSchema()

    def load_login_data(self, data: dict) -> UserLoginData:
        """ Return user login data
            raise MissingCredentialError if schema not valid
        """
        try:
            login_data = self.login_schema.load(data)
            return login_data
        except ValidationError:
            raise MissingCredentialsError

    def load_register_data(self, data: dict) -> User:
        """ Return User object by login data
            raise MissingCredentialError if schema not valid
        """
        try:
            user = self.register_schema.load(data)
            return user
        except ValidationError:
            raise MissingCredentialsError

    def hash_password(self, plain_password: str):
        """ Return hashed password """
        encoded_plain_pass = plain_password.encode('utf-8')
        hashed_pass = bcrypt.hashpw(encoded_plain_pass, bcrypt.gensalt())
        decoded_hash_pass = hashed_pass.decode('utf-8')
        return decoded_hash_pass

    def check_password(self, plain_password: str, hashed_password) -> None:
        """ Return None if passwords are equal
            or raise PassNotEqualError if not
        """
        encoded_plain_pass = plain_password.encode('utf-8')
        encoded_hash_pass = hashed_password.encode('utf-8')
        equal = bcrypt.checkpw(encoded_plain_pass, encoded_hash_pass)
        if not(equal):
            raise PassNotEqualError

    def get_payload(self, user: User, session: str) -> Payload:
        """ Return Payload object """
        payload = Payload(user.UserPK, user.UserName,
                          user.UserEmail, session)
        return payload

    def get_by_email(self, email: str) -> User:
        """ Return User object with User.UserEmail == email
            or raise UserNotExistsError if not found
        """
        user = db.session.query(User).filter(
            User.UserEmail == email).one_or_none()
        if not(user):
            raise UserNotExistsError
        return user

    def add(self, user: User) -> User:
        """ Add user to database,
            raise UserExistsError if user already exists
        """
        try:
            hash_pass = self.hash_password(user.UserPassword)
            user.UserPassword = hash_pass
            db.session.add(user)
            db.session.commit()
            return user
        except IntegrityError:
            raise UserExistsError

    def register(self, data: dict):
        try:
            candidate = self.load_register_data(data)
            user = self.add(candidate)
            session = session_repository.create_session(user.UserPK)
            payload = self.get_payload(user, session.SessionPK)
            tokens = token_repository.get_tokens(payload)
            token_repository.create_or_update(
                user.UserPK, tokens.refresh_token)
            user_dump = self.login_schema.dump(user)
            print(user_dump)
            result = LoginResponce(user=user_dump, tokens=tokens)
            return result
        except OperationalError:
            raise DatabaseConnectionError

        # result = self.register_schema.dump(user)
        # return result

    def login(self, data: dict) -> LoginResponce:
        """ User login"""
        try:
            user_data = self.load_login_data(data)
            user = self.get_by_email(user_data.email)
            self.check_password(user_data.password, user.UserPassword)
            session = session_repository.create_session(user.UserPK)
            payload = self.get_payload(user, session.SessionPK)
            tokens = token_repository.get_tokens(payload)
            token_repository.create_or_update(
                user.UserPK, tokens.refresh_token)
            user_dump = self.login_schema.dump(user)
            print(user_dump)
            result = LoginResponce(user=user_dump, tokens=tokens)
            return result
        except OperationalError:
            raise DatabaseConnectionError

    def refresh(self, token: str, user_data: Payload) -> Tokens:
        token_repository.check(token)
        session_repository.refresh_session(user_data.session)
        tokens = token_repository.refresh_tokens(user_data)
        return tokens

    def logout(self, refresh_token: str, token_dict: dict):
        """ User logout"""
        # add database connection ecxeption
        data = self.token_schema.load(token_dict)
        token_repository.remove(refresh_token)
        session_repository.close_session(data.session)
