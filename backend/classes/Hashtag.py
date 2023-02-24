class Hashtag:
    name: str
    bulasId: list
    
    def __init__(self, name: str) -> None:
        self.name = name
    
    def toString(self) -> str:
        result = ""
        for bula in self.bulasId:
            result += str(bula) + ','
        result = result[:-1]
        return result
    
    def getName(self) -> str:
        return self.name
    
    def getBulasId(self):
        return self.bulasId
    
    def addBulaId(self, bulaId: int) -> None:
        self.bulasId.append(bulaId)