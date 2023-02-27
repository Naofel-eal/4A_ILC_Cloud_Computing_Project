import redis
import json
import uuid
from backend.utils.utils import Utils

class UserService:
    usersDB = redis.Redis(host="127.0.0.1", port=6379, db=2, decode_responses=True)
    tokensDB = redis.Redis(host="127.0.0.1", port=6379, db=3, decode_responses=True)

    def register(username: str, password: str) -> str:
        if UserService.usersDB.exists(username):
            return Utils.returnError("username already exists.")
        else:
            user: dict = {
                'password': password,
                'bulas': []
            }
            UserService.usersDB.set(username, json.dumps(user))
            return "success"


    def login(username: str, password: str) -> str:
        if UserService.usersDB.exists(username):
            user: json = json.loads(UserService.usersDB.get(username))
            token: str = str(uuid.uuid4())
            if user['password'] == password:
                UserService.tokensDB.set(username, token)
                return token
            else:
                return Utils.returnError("wrong password")
        else:
            return Utils.returnError("username doesn't exist")
        
        
    def validToken(token: str, userId: str) -> bool:
        if UserService.tokensDB.exists(userId):
            if UserService.tokensDB.get(userId) == token:
                return True
        return False