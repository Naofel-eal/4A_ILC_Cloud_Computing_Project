class Bula:
    userId: int
    timestamp: str
    text: str
    
    def __init__(self, userId: int, timestamp: str, text: str) -> None:
        self.userId = userId
        self.timestamp = timestamp
        self.text = text
    
    def toString(self) -> str:
       return "{author: " + self.userId + ", text: " + self.text + '}'
   
    def getTimestamp(self) -> str:
        return self.timestamp
    
    def getUserId(self) -> int:
        return self.userId
    
    def getText(self) -> str:
        return self.text