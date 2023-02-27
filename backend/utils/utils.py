import json

class Utils:
    NB_OF_DAYS_BEFORE_TOKEN_EXPIRATION = 7
    
    def returnError(message: str) -> json:
        return json.dumps({'message': message})