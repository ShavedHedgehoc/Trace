from typing import Optional, List
from sqlalchemy import and_
from sqlalchemy.exc import OperationalError

from app import db
from app.models.role import Role
from app.models.user_role import UserRole
from app.assets.api_errors import RoleNotExistsError, DatabaseConnectionError


class RoleRepository:

    def get_role_by_name(self, role_name: str) -> Role:
        try:
            role = db.session.query(Role).filter(
                Role.RoleName == role_name).one_or_none()
            if not(role):
                raise RoleNotExistsError
            return role
        except OperationalError:
            raise DatabaseConnectionError

    def get_user_roles(self, user_id: int) -> List[str]:
        try:
            role_strings = db.session.query(
                Role.RoleName
            ).join(
                UserRole, UserRole.RolePK == Role.RolePK
            ).filter(
                UserRole.UserPK == user_id).all()
            data = []
            for role in role_strings:
                data.append(role.RoleName)
            print (data)
            return data
        except OperationalError:
            raise DatabaseConnectionError

    def get_role_record(self, role_id: int, user_id: int) -> Optional[UserRole]:
        try:
            role_record = db.session.query(UserRole).filter(
                and_(UserRole.UserPK == user_id, UserRole.RolePK == role_id)).one_or_none()
            return role_record
        except OperationalError:
            raise DatabaseConnectionError

    def add_role(self, role_name: str, user_id: int) -> Role:
        try:
            role = self.get_role_by_name(role_name)
            role_record = self.get_role_record(role.RolePK, user_id)
            if role_record:
                return None
            record_to_append = UserRole(
                UserPK=user_id,
                RolePK=role.RolePK
            )
            role_record = db.session.add(record_to_append)
            db.session.commit()
            return role
        except OperationalError:
            raise DatabaseConnectionError
