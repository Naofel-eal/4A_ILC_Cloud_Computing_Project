import json

class Utils:
    def returnError(message: str) -> json:
        return json.dumps({'message': message})