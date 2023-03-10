import redis
import uuid
import json
from datetime import datetime
from .user_service import UserService
from utils.utils import Utils

class BulaService:
    bulasDB = redis.Redis(host="127.0.0.1", port=6379, db=0, decode_responses=True)
    hashtagDB = redis.Redis(host="127.0.0.1", port=6379, db=1, decode_responses=True)

    def getAllBulas()-> dict:
        bulasDictionary: dict = {"bulas" : []}
        for bulaID in BulaService.bulasDB.scan_iter('*'):
            bulasDictionary['bulas'].append(BulaService.jsonifyBula(bulaID))
        return bulasDictionary


    def getBulasOfUser(userId: str) -> json:
        bulasDictionary: dict = {"bulas" : []}
        if(UserService.usersDB.exists(userId)):
            user: json = json.loads(UserService.usersDB.get(userId))
            del user['password']
            for bulaID in user['bulas']:
                bulasDictionary['bulas'].append(BulaService.jsonifyBula(bulaID=bulaID))
            return bulasDictionary
        return Utils.returnError("userId doesn't exist.")


    def createBula(userId: str, bulaText: str) -> None:
        bulaId = str(uuid.uuid1())
        bula = {
            'date': datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
            'author': userId,
            'text': bulaText,
            'meows': [],
            'rebulas': []
        }
        BulaService.bulasDB.set(bulaId, json.dumps(bula))
        BulaService.addBulaIdToUser(userId=userId, bulaId=bulaId)
        BulaService.findHashtags(bulaText=bulaText, bulaId=bulaId)


    def addBulaIdToUser(userId: str, bulaId: str) -> None:
        user: json = json.loads(UserService.usersDB.get(userId))
        user['bulas'].append(bulaId)
        UserService.usersDB.set(userId, json.dumps(user))

    
    def findHashtags(bulaText: str, bulaId: str) -> None:
        words = bulaText.split()
        hashtags = []
        for word in words:
            if word.startswith("#"):
                hashtags.append(word)
        for hashtag in hashtags:
            if(BulaService.hashtagDB.exists(hashtag)):
                hashtagJson: json = json.loads(BulaService.hashtagDB.get(hashtag))
                hashtagJson['bulas'].append(bulaId)
                BulaService.hashtagDB.set(hashtag, json.dumps(hashtagJson))
            else:
                BulaService.hashtagDB.set(hashtag, json.dumps({'bulas': [bulaId]}))        

    
    def rebula(userId: str, bulaId: str) -> None:
        if not BulaService.check_userID_in_rebulas(json.loads(BulaService.bulasDB.get(bulaId)), userId):
            #add bula in the user bulas list
            user: json = json.loads(UserService.usersDB.get(userId))
            user['bulas'].append(bulaId)
            
            UserService.usersDB.set(userId, json.dumps(user))
            #add userID in the rebula list
            bula: json = json.loads(BulaService.bulasDB.get(bulaId))
            bula['rebulas'].append(userId)
            BulaService.bulasDB.set(bulaId, json.dumps(bula))
        
        
    def getAllHashtags()-> dict:
        hashtagsDictionnary: dict = {"hashtags" : []}
        for hashtag in BulaService.hashtagDB.scan_iter('*'):
            hashtagsDictionnary['hashtags'].append({'hashtag': hashtag, 'number': len(json.loads(BulaService.hashtagDB.get(hashtag))['bulas'])})
        return hashtagsDictionnary


    def getBulasOfHashtag(hashtag: str) -> dict:
        if(BulaService.hashtagDB.exists(hashtag)):
            bulasDictionary: dict = {"bulas": []}
            for bula in json.loads(BulaService.hashtagDB.get(hashtag))['bulas']:
                bulasDictionary['bulas'].append(BulaService.jsonifyBula(bulaID=bula))
            return bulasDictionary
        else:
            return Utils.returnError("hashtag doesn't exist.")
    
    def meow(userId: str, bulaId: str):
        if not BulaService.check_userID_in_meows(json.loads(BulaService.bulasDB.get(bulaId)), userId):
            bula: json = json.loads(BulaService.bulasDB.get(bulaId))
            bula['meows'].append(userId)
            BulaService.bulasDB.set(bulaId, json.dumps(bula))
    
    def unmeow(userId: str, bulaId: str):
        bula = json.loads(BulaService.bulasDB.get(bulaId))
        if userId in bula["meows"]:
            bula["meows"].remove(userId)
        BulaService.bulasDB.set(bulaId, json.dumps(bula))
        
    def unrebula(userId: str, bulaId: str):
        bula = json.loads(BulaService.bulasDB.get(bulaId))
        if userId in bula["rebulas"]:
            bula["rebulas"].remove(userId)
        BulaService.bulasDB.set(bulaId, json.dumps(bula))
        user = json.loads(UserService.usersDB.get(userId))
        if bulaId in user['bulas']:
            user['bulas'].remove(bulaId)
        UserService.usersDB.set(userId, json.dumps(user))
        
    
    def jsonifyBula(bulaID) -> json:
        jsonBula = json.loads(BulaService.bulasDB.get(bulaID))                
        jsonBula['id'] = bulaID
        return jsonBula
    
    
    def check_userID_in_rebulas(bula, userID):
        if "rebulas" in bula:
            if userID in bula["rebulas"]:
                return True
        return False
        
        
    def check_userID_in_meows(bula, userID):
        if "meows" in bula:
            if userID in bula["meows"]:
                return True
        return False