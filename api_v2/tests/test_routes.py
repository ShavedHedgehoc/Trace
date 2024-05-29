from datetime import datetime
import unittest
import json
from app.assets.api_routes import ApiRoutes
from base_test import BaseTest
from app.models.document import Document

class Test_routes(BaseTest):
    
        
        
    def test_home(self):
        resp = self.client.get("/")        
        self.assertEqual(resp.status_code, 200)
        
    def test_login_get(self):
        resp=self.client.get(ApiRoutes.LOGIN)
        result=json.loads(resp.get_data(as_text=True))        
        self.assertEqual(resp.status_code, 405)
        self.assertEqual(result, {'message': 'The method is not allowed for the requested URL.'})
        
        
    def test_login(self):
        resp = self.client.post(ApiRoutes.LOGIN)
        self.assertEqual(resp.status_code, 400)
        resp = self.client.post(ApiRoutes.LOGIN, json={
        "password":"1",
        "email":"sklad_prr@unicosm.ru"
        })
        result=json.loads(resp.get_data(as_text=True))   
        self.assertEqual(result, {    "msg": "Пользователя с таким адресом почты не существует"})
        
    def test_documents(self):
        # doc_1 = Document(             
        # DocumentClid = "testdocument1",
        # DoctypePK = 1,
        # AuthorPK = 1,
        # CreateDate = datetime.now(),
        # Plant = "П"            
        # )
        # with self.app.app_context():
        #     self._db.session.add(doc_1)
        #     self._db.session.commit()
            
        
        resp = self.client.get(ApiRoutes.DOC_COUNTER)
        # result=json.loads(resp.get_data(as_text=True))        
        self.assertEqual(resp.status_code, 200)
        # self.assertEqual(result, 1)
        
        
    # def test_boils(self):
    #     resp = self.client.get(ApiRoutes.BOILS)
    #     self.assertEqual(resp.status_code, 200)



if __name__ == "__main__":
    unittest.main()