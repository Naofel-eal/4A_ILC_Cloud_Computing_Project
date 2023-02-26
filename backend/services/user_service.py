import redis
import json
from backend.utils.utils import Utils

class UserService:
    usersDB = redis.Redis(host="127.0.0.1", port=6379, db=1, decode_responses=True)

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
            if user['password'] == password:
                return "success"
            else:
                return Utils.returnError("wrong password")
        else:
            return Utils.returnError("username doesn't exist")