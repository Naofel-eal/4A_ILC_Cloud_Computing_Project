import os
import csv
import json
from .bula_service import BulaService
from .user_service import UserService


class RedisService:
    def load() -> None:
        BulaService.bulasDB.flushall()
        script_dir = os.path.dirname(os.path.abspath(__file__))
        usersFilePath = os.path.join(script_dir, '../utils/redis/users.csv')
        bulasFilePath = os.path.join(script_dir, '../utils/redis/bulas.csv')
        hashtagsFilePath = os.path.join(script_dir, '../utils/redis/hashtags.csv')
        
        with open(usersFilePath, 'r') as file:
            reader = csv.reader(file, delimiter=';')
            for row in reader:
                username = row[0]
                user = json.loads(row[1])
                UserService.usersDB.set(username, json.dumps(user))
        
        with open(bulasFilePath, 'r') as file:
            reader = csv.reader(file, delimiter=';')
            for row in reader:
                bulaId = row[0]
                bula = json.loads(row[1])
                BulaService.bulasDB.set(bulaId, json.dumps(bula))
                
        with open(hashtagsFilePath, 'r') as file:
            reader = csv.reader(file, delimiter=';')
            for row in reader:
                hashtag = row[0]
                bulas = json.loads(row[1])
                BulaService.hashtagDB.set(hashtag, json.dumps(bulas))

        RedisService.saveRedisData()
                
                
    def saveRedisData():
        BulaService.bulasDB.save()
        BulaService.hashtagDB.save()
        UserService.usersDB.save()