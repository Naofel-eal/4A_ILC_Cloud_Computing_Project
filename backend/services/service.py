import redis
import uuid
import csv
import os
import json
from datetime import datetime

bulasDB = redis.Redis(host="127.0.0.1", port=6379, db=0, decode_responses=True)
usersDB = redis.Redis(host="127.0.0.1", port=6379, db=1, decode_responses=True)
hashtagDB = redis.Redis(host="127.0.0.1", port=6379, db=2, decode_responses=True)

def getAllBulas()-> dict:
    bulasDictionary: dict = {"bulas" : []}
    for bula in bulasDB.scan_iter('*'):
        bulasDictionary['bulas'].append(bula)
    return bulasDictionary


def getBulasIdOfUser(userId: str) -> json:
    if(usersDB.exists(userId)):
        user: json = json.loads(usersDB.get(userId))
        del user['password']
        return user
    return returnError("userId doesn't exist.")


def createBula(userId: str, bulaText: str) -> None:
    bulaId = str(uuid.uuid1())
    bula = {
        'date': datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
        'author': userId,
        'text': bulaText,
        'meows': [],
        'rebulas': []
    }
    bulasDB.set(bulaId, json.dumps(bula))
    addBulaIdToUser(userId=userId, bulaId=bulaId)
    findHashtags(bulaText=bulaText, bulaId=bulaId)


def addBulaIdToUser(userId: str, bulaId: str) -> None:
    user: json = json.loads(usersDB.get(userId))
    user['bulas'].append(bulaId)
    usersDB.set(userId, json.dumps(user))

 
def findHashtags(bulaText: str, bulaId: str) -> None:
    words = bulaText.split()
    hashtags = []
    for word in words:
        if word.startswith("#"):
            hashtags.append(word)
    for hashtag in hashtags:
        if(hashtagDB.exists(hashtag)):
            hashtagJson: json = json.loads(hashtagDB.get(hashtag))
            hashtagJson['bulas'].append(bulaId)
            hashtagDB.set(hashtag, json.dumps(hashtagJson))
        else:
            hashtagDB.set(hashtag, json.dumps({'bulas': [bulaId]}))        

 
def rebula(userId: str, bulaId: str) -> None:
    user: json = json.loads(usersDB.get(userId))
    user['bulas'].append(bulaId)
    usersDB.set(userId, json.dumps(user))
    
    bula: json = json.loads(bulasDB.get(bulaId))
    bula['rebulas'].append(userId)
    bulasDB.set(bulaId, json.dumps(bula))
    
    
def getAllHashtags()-> dict:
    hashtagsDictionnary: dict = {"hashtags" : []}
    for hashtag in hashtagDB.scan_iter('*'):
        hashtagsDictionnary['hashtags'].append(hashtag)
    return hashtagsDictionnary


def getBulasOfHashtag(hashtag: str) -> str:
    if(hashtagDB.exists(hashtag)):
        return json.loads(hashtagDB.get(hashtag))
    else:
        return returnError("hashtag doesn't exist.")


def register(username: str, password: str) -> str:
    if usersDB.exists(username):
        return returnError("username already exists.")
    else:
        user: dict = {
            'password': password,
            'bulas': []
        }
        usersDB.set(username, json.dumps(user))
        return "success"


def login(username: str, password: str) -> str:
    if usersDB.exists(username):
        user: json = json.loads(usersDB.get(username))
        if user['password'] == password:
            return "success"
        else:
            return returnError("wrong password")
    else:
        return returnError("username doesn't exist")


def returnError(message: str) -> json:
    return json.dumps({'message': message})


def load() -> None:
    script_dir = os.path.dirname(os.path.abspath(__file__))
    usersFilePath = os.path.join(script_dir, 'redis/users.csv')
    bulasFilePath = os.path.join(script_dir, 'redis/bulas.csv')
    hashtagsFilePath = os.path.join(script_dir, 'redis/hashtags.csv')
    
    with open(usersFilePath, 'r') as file:
        reader = csv.reader(file, delimiter=';')
        for row in reader:
            username = row[0]
            user = json.loads(row[1])
            usersDB.set(username, json.dumps(user))
            
    with open(bulasFilePath, 'r') as file:
        reader = csv.reader(file, delimiter=';')
        for row in reader:
            bulaId = row[0]
            bula = json.loads(row[1])
            bulasDB.set(bulaId, json.dumps(bula))
            
    with open(hashtagsFilePath, 'r') as file:
        reader = csv.reader(file, delimiter=';')
        for row in reader:
            hashtag = row[0]
            bulas = json.loads(row[1])
            hashtagDB.set(hashtag, json.dumps(bulas))
    
    save_redis_data()
            

def save_redis_data():
    bulasDB.save()
    hashtagDB.save()
    usersDB.save()