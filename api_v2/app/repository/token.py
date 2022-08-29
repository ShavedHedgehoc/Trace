from datetime import timedelta

from flask_jwt_extended import create_access_token, create_refresh_token
from app.assets.api_dataclasses import Payload, Tokens
from app.assets.api_errors import TokenNotExistsError

from app import db
from app.models.token import RefreshToken


class TokenRepository():
    def get_by_id(self, id: int) -> RefreshToken:
        """ Return token by id or none if not exists"""
        token = db.session.query(RefreshToken).filter(
            RefreshToken.UserPK == id
        ).one_or_none()
        return token

    def remove(self, refresh_token: str) -> RefreshToken:
        """ Removes token with TokenData == refresh_token """
        token = db.session.query(RefreshToken).filter(
            RefreshToken.TokenData == refresh_token).delete()
        db.session.commit()
        return token

    def check(self, refresh_token: str) -> RefreshToken:
        """ Return token with TokenData == refresh_token or none if not exists"""
        token = db.session.query(RefreshToken).filter(
            RefreshToken.TokenData == refresh_token
        ).one_or_none()
        if not(token):
            raise TokenNotExistsError
        return token

    def save(self, token: RefreshToken) -> RefreshToken:
        """ Add new token to db"""
        db.session.add(token)
        db.session.commit()

    def update(self, token: RefreshToken, refresh_token: str) -> None:
        """ Update token data"""
        token.TokenData = refresh_token
        db.session.commit()

    def create(self, user_id: int, token_data: str) -> RefreshToken:
        """ Return RefreshToken object with credentials """
        token = RefreshToken(UserPK=user_id, TokenData=token_data)
        return token

    def create_or_update(self, user_id: int, refresh_token: str) -> RefreshToken:
        """ Create or update token"""
        token = self.get_by_id(user_id)
        if token:
            self.update(token, refresh_token)
            return token
        new_token = self.create(user_id, refresh_token)
        self.save(new_token)
        return new_token

    def generate_access_token(self, payload: Payload) -> str:
        """ Return generated access token"""
        expires_delta = timedelta(minutes=60)
        access_token = create_access_token(
            identity=payload,
            expires_delta=expires_delta)
        return access_token

    def generate_refresh_token(self, payload: Payload) -> str:
        """ Return generated access token"""
        expires_delta = timedelta(days=20)
        refresh_token = create_refresh_token(
            identity=payload,
            expires_delta=expires_delta)
        return refresh_token

    def get_tokens(self, payload: Payload) -> Tokens:
        """ Return pair of tokens"""
        tokens = Tokens(self.generate_access_token(payload),
                        self.generate_refresh_token(payload))
        return tokens

    def refresh_tokens(self, user_data: Payload) -> Tokens:
        tokens = self.get_tokens(user_data)
        self.create_or_update(user_data.id, tokens.refresh_token)        
        return tokens
