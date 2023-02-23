class User:
    id: int
    username: str
    password: str
    bulasId: list
    
    def __init__(self, id: int, username: str, password: str) -> None:
        self.id = id
        self.username = username
        self.password = password
    
    def toString(self) -> str:
        result = ""
        for bulaId in self.bulasId:
            result += str(bulaId) + ','
        return result
    
    def getId(self) -> int:
        return self.id
    
    def getUsername(self) -> str:
        return self.username
    
    def getPassword(self) -> str:
        return self.password
    
    def getBulasId(self):
        return self.bulasId
    
    def addBulaId(self, bulaId: int) -> None:
        self.bulasId.append(bulaId)