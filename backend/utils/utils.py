import redis
from datetime import datetime

bulasDB = redis.Redis(host="127.0.0.1", port=6379, db=0, decode_responses=True)
usersDB = redis.Redis(host="127.0.0.1", port=6379, db=1, decode_responses=True)
hashtagDB = redis.Redis(host="127.0.0.1", port=6379, db=2, decode_responses=True)
bulasDB.flushdb()

usersDB.set("u-8", "")

def getAllBulas()-> str:
    result: str = ""
    for bula in bulasDB.scan_iter('*'):
        result += str(bula) + ','
    result = result[:-1]
    return result

def getBuladIdStringOfUser(userId: str) -> str:
    userBulasIdStr: str = str(usersDB.get('u-' + userId))
    if userBulasIdStr == None:
        userBulasIdStr = ''
    print(type(userBulasIdStr), userBulasIdStr)
    return userBulasIdStr

def getBulasIdArrayOfUser(userId: str):
    userBulasIdStr = getBuladIdStringOfUser(userId=userId)
    userBulasIdArray = userBulasIdStr.split(',')
    return userBulasIdArray

def createBula(userId: str, bulaText: str):
    timestamp: str = str(datetime.now())
    bulaValue = "{author: " + userId + "text: " + bulaText + '}' 
    bulasDB.set(timestamp, bulaValue)
    addBulaIdToUser(userId=userId, bulaId=timestamp)
    checkHashtag(bulaText=bulaText, bulaId=timestamp)

def addBulaIdToUser(userId: str, bulaId: str) -> None:
    userBulasIdStr = getBuladIdStringOfUser(userId=userId)
    if userBulasIdStr != '':
        userBulasIdStr += ',' + bulaId 
    else:
        userBulasIdStr = bulaId
    usersDB.set('u-' + userId, userBulasIdStr)
        
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
            
def rebula(userId: str, bulaTimestamp: str) -> None:
    bulasListStr = getBuladIdStringOfUser(userId=userId)
    bulasListStr += ',' + bulaTimestamp
    usersDB.set('u-' + userId, bulasListStr)