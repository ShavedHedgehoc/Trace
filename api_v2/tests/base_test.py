from unittest import TestCase

from app import create_app, db


class BaseTest(TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app = create_app()
        cls._db = db

    def setUp(self):
        with self.app.app_context():
            self._db.create_all()
            self.client = self.app.test_client()

    def tearDown(self):
        with self.app.app_context():
            self._db.session.remove()
            self._db.drop_all()
