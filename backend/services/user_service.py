import sys
import redis
import json
import uuid
import datetime
from pathlib import Path
sys.path.append(Path(__file__).parent)
from utils.utils import Utils
from flask import abort

class UserService:
    usersDB = redis.Redis(host="127.0.0.1", port=6379, db=2, decode_responses=True)
    tokensDB = redis.Redis(host="127.0.0.1", port=6379, db=3, decode_responses=True)

    def register(username: str, password: str) -> str:
        if UserService.usersDB.exists(username):
            return abort(409)
        else:
            user = {
                'password': password,
                'bulas': []
            }
            UserService.usersDB.set(username, json.dumps(user))
            return {"token": UserService.generateToken(userId=username)}


    def login(username: str, password: str) -> str:
        if UserService.usersDB.exists(username):
            user = json.loads(UserService.usersDB.get(username))
            if user['password'] == password:
                token = UserService.generateToken(userId=username)
                return {"token": token}
            else:
                return abort(401)
        else:
            return abort(401)
        
        
    def validToken(token: str, userId: str) -> bool:
        if UserService.tokensDB.exists(userId):
            if UserService.tokensDB.get(userId) == token:
                return True
        return False


    def generateToken(userId: str) -> str:
        token: str = str(uuid.uuid4())
        currentDate = datetime.date.today()
        expirationDate = currentDate + datetime.timedelta(days=Utils.NB_OF_DAYS_BEFORE_TOKEN_EXPIRATION)
        expirationDate = expirationDate.strftime("%d/%m/%Y")
        tokenProperties = {
            'token': token,
            'expirationDate':  expirationDate
        }
        UserService.tokensDB.set(userId, json.dumps(tokenProperties))
        return token + '/' + str(userId) 
    
    
    def isValidToken(key: str) -> bool:
        token = key.split('/')[0]
        userId = key.split('/')[1]
        if UserService.tokensDB.exists(userId):
            tokenProperties = json.loads(UserService.tokensDB.get(userId))
            if tokenProperties['token'] == token:
                expirationDate = datetime.datetime.strptime(tokenProperties['expirationDate'], '%d/%m/%Y').date()
                currentDate = datetime.datetime.now().date()
                return expirationDate > currentDate
            else:
                return False
        else:
            return False

    
    def searchUsernameInDB(searchedText: str) -> dict:
        users: dict = {"users": []}
        for username in UserService.usersDB.scan_iter('*'):
            if username.lower().__contains__(searchedText):
                users['users'].append(username)
        return users