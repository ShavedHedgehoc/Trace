import unittest
import json

import bcrypt
from app.assets.api_routes import ApiRoutes
from app.assets.api_messages import ApiMessages
from app.repository.user import UserRepository
from app.models.user import User
from base_test import BaseTest


class Test_login(BaseTest):   
    
    user_repository = UserRepository()
        
    def test_login_get(self):
        resp=self.client.get(ApiRoutes.LOGIN)
        result=json.loads(resp.get_data(as_text=True))        
        self.assertEqual(resp.status_code, 405)
        self.assertEqual(result, {'message': 'The method is not allowed for the requested URL.'})
        
    def test_login_put(self):
        resp=self.client.put(ApiRoutes.LOGIN)
        result=json.loads(resp.get_data(as_text=True))        
        self.assertEqual(resp.status_code, 405)
        self.assertEqual(result, {'message': 'The method is not allowed for the requested URL.'})
        
    def test_login_delete(self):
        resp=self.client.delete(ApiRoutes.LOGIN)
        result=json.loads(resp.get_data(as_text=True))        
        self.assertEqual(resp.status_code, 405)
        self.assertEqual(result, {'message': 'The method is not allowed for the requested URL.'})        
        
    def test_empty_login(self):
        resp = self.client.post(ApiRoutes.LOGIN)
        self.assertEqual(resp.status_code, 400)        
        
    def test_login_wrong_data(self):
        json_data={
        "password":"1",
        "email":"test_user@unicosm.ru"
        }
        resp = self.client.post(ApiRoutes.LOGIN, json=json_data)
        result=json.loads(resp.get_data(as_text=True))   
        self.assertEqual(resp.status_code, 404)
        self.assertEqual(result, {"msg": ApiMessages.USER_NOT_EXISTS})   
        
    def test_login_empty_pass(self):
        json_data={"email":"sklad_prr@unicosm.ru"}
        resp = self.client.post(ApiRoutes.LOGIN, json=json_data)
        result=json.loads(resp.get_data(as_text=True))   
        self.assertEqual(resp.status_code, 500)
        self.assertEqual(result, {"msg": ApiMessages.MISSING_CREDENTIALS})   
        
    def test_login_empty_email(self):
        json_data = {"password":"1"}
        resp = self.client.post(ApiRoutes.LOGIN, json=json_data)
        result = json.loads(resp.get_data(as_text=True))   
        self.assertEqual(resp.status_code, 500)
        self.assertEqual(result, {"msg": ApiMessages.MISSING_CREDENTIALS})  
        
    def test_login_pass_not_equal(self):
        user = User(
            UserName = "test_user",
            UserEmail = "test_user@gmail.com",
            UserPassword = "1"
        )
        with self.app.app_context():
            self.user_repository.add_user(user)
        
        json_data={
        "password":"2",
        "email":"test_user@gmail.com"
        }
                
        resp = self.client.post(ApiRoutes.LOGIN, json=json_data)
        result = json.loads(resp.get_data(as_text=True))   
        self.assertEqual(resp.status_code, 401)
        self.assertEqual(result, {"msg": ApiMessages.PASS_NOT_EQUAL})  
        
    # def test_login_success(self):
    #     user = User(
    #         UserName = "test_user2",
    #         UserEmail = "test_user2@gmail.com",
    #         UserPassword = "1"
    #     )
    #     with self.app.app_context():
    #         self.user_repository.add_user(user)
        
    #     json_data={
    #     "password":"1",
    #     "email":"test_user2@gmail.com"
    #     }
    #     with self.app.app_context():                
    #         resp = self.client.post(ApiRoutes.LOGIN, json=json_data)
    #         result = json.loads(resp.get_data(as_text=True))   
    #         self.assertEqual(resp.status_code, 200)
        # self.assertEqual(result, {"msg": ApiMessages.PASS_NOT_EQUAL})  
        
        
    
if __name__ == "__main__":
    unittest.main()