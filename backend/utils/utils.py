import redis
from datetime import datetime

bulasDB = redis.Redis(host="localhost", port=6379, db=0)
usersDB = redis.Redis(host="localhsot", port=6379, db=1)
hashtagDB = redis.Redis(host="localhsot", port=6379, db=2)

def getAllBulas()-> str:
    result: str = ""
    for bula in bulasDB.scan_iter('*'):
        result += bula + ','
    result = result[:-1]
    return result

def getBuladIdStringOfUser(userId: str) -> str:
    userBulasIdStr = usersDB.get('u-' + userId)
    return userBulasIdStr

def getBulasIdArrayOfUser(userId: str):
    userBulasIdStr = getBuladIdStringOfUser(userId=userId)
    userBulasIdArray = userBulasIdStr.split(',')
    return userBulasIdArray

def addBulaIdToUser(userId: str, bulaId: str) -> None:
    userBulasIdStr = getBuladIdStringOfUser(userId=userId)
    userBulasIdStr += ',' + bulaId 
    usersDB.set('u-' + userId, userBulasIdStr)
    
def createBula(userId: str, bulaText: str) -> None:
    timestamp: str = datetime.now()
    bulaValue = "{author: " + userId + "text: " + bulaText + '}' 
    bulasDB.set(timestamp, bulaValue)
    addBulaIdToUser(userId=userId, bulaId=timestamp)
    checkHashtag(bulaText=bulaText, bulaId=timestamp)
    
def checkHashtag(bulaText: str, bulaId: str):
    if '#' in bulaText:
        hashtagIndex = bulaText.index('#')
        hashtag = bulaText[hashtagIndex:].split(' ')[0][1:]
    
        if hashtagDB.exists('h-' + hashtag):
            bulasIdListStr = hashtagDB.get('h-' + hashtag)
            bulasIdListStr += ',' + bulaId
            hashtagDB.set('h-' + hashtag, bulasIdListStr)
        else:
            hashtagDB.set('h-' + hashtag, bulaId)