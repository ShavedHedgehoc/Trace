from datetime import datetime, timedelta
from sqlalchemy.exc import OperationalError
from app import db
from app.models.session import SessionData
from app.assets.api_errors import DatabaseConnectionError


class SessionRepository():
    def get_by_id(self, id: int) -> SessionData:
        """ Return session by id or none if not exists"""
        try:
            session = db.session.query(SessionData).filter(
                SessionData.SessionPK == id
            ).one_or_none()
            return session
        except OperationalError:
            raise DatabaseConnectionError

    def create(self, id: int) -> SessionData:
        """ Return SessionData object with credentials """
        session = SessionData(
            UserPK=id,
            StartTime=datetime.now(),
            EndTime=datetime.now()+timedelta(minutes=15))
        return session

    def save(self, session: SessionData) -> SessionData:
        """ Add new session to db"""
        try:
            db.session.add(session)
            db.session.commit()
            return session
        except OperationalError:
            raise DatabaseConnectionError

    def create_session(self, user_id: int) -> SessionData:
        return self.save(self.create(user_id))

    def update(self, session: SessionData) -> SessionData:
        try:
            session.EndTime = datetime.now()+timedelta(minutes=1)
            db.session.commit()
            return session
        except OperationalError:
            raise DatabaseConnectionError

    def close(self, session: SessionData) -> SessionData:
        try:
            session.EndTime = datetime.now()        
            db.session.commit()
            return session
        except OperationalError:
            raise DatabaseConnectionError

    def refresh_session(self, id: int) -> None:
        session = self.get_by_id(id)
        if session:
            self.update(session)

    def close_session(self, id: int) -> None:
        session = self.get_by_id(id)
        if session:
            self.close(session)
