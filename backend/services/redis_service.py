import os, sys
from pathlib import Path
import csv
import json
from backend.services.bula_service import BulaService
from backend.services.user_service import UserService


class RedisService:
    def load() -> None:
        script_dir = str(Path.cwd())
        print(script_dir)
        usersFilePath = script_dir + '\\utils\\redis\\users.csv'
        bulasFilePath = script_dir + '\\utils\\redis\\bulas.csv'
        hashtagsFilePath = script_dir + '\\utils\\redis\\hashtags.csv'
        
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

        RedisService.save_redis_data()
                
    def save_redis_data():
        BulaService.bulasDB.save()
        BulaService.hashtagDB.save()
        UserService.usersDB.save()