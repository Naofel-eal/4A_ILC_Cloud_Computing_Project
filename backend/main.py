from flask import Flask, request
from backend.services.user_service import UserService
from backend.services.bula_service import BulaService
from backend.services.redis_service import RedisService
import sys

app = Flask(__name__)

@app.route('/')
def default():
    if request.method == 'GET':
        return '''<h1>Bula API v0.0.0</h1>'''
    return "invalid request"
    

@app.route('/all-bulas', methods=['GET'])
def allBulasRoute() -> str:
    if request.method == 'GET':
        return BulaService.getAllBulas()
    return "invalid request"


@app.route('/user-bulas', methods=['GET'])
def userBulasRoute():
    if request.method == 'GET':
        userId = request.form.get("userId")
        return BulaService.getBulasOfUser(userId=userId)
    return "invalid request"


@app.route('/bula', methods=['POST'])
def bulaRoute():
    if request.method == 'POST':
        token = request.form.get("token")
        userId = request.form.get("userId")
        bulaText = request.form.get("text")
        BulaService.createBula(token=token, userId=userId, bulaText=bulaText)
        return 'success'
    return "invalid request"


@app.route('/rebula', methods=['POST'])
def rebulaRoute():
    if request.method == 'POST':
        token = request.form.get("token")
        userId = request.form.get("userId")
        bulaId = request.form.get("bulaId")
        BulaService.rebula(token=token, userId=userId, bulaId=bulaId)
        return 'success'
    return "invalid request"

@app.route('/meow', methods=['POST'])
def meow():
    if request.method == 'POST':
        token = request.form.get("token")
        userId = request.form.get("userId")
        bulaId = request.form.get("bulaId")
        BulaService.meow(token=token, userId=userId, bulaId=bulaId)
        return 'success'
    return "invalid request" 

@app.route('/hashtag', methods=['GET'])
def hashtagRoute():
    if request.method == 'GET':
        hashtag = request.form.get("hashtagId")
        return BulaService.getBulasOfHashtag(hashtag=hashtag)
    return "invalid request"


@app.route('/all-hashtags', methods=['GET'])
def allHashtagsRoute():
    if request.method == 'GET':
        return BulaService.getAllHashtags()
    return "invalid request"


@app.route('/register', methods=['POST'])
def registerRoute():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        return UserService.register(username=username, password=password)
    return "invalid request"


@app.route('/login', methods=['POST'])
def loginRoute():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        return UserService.login(username=username, password=password)
    return "invalid request"


@app.route('/load', methods=['POST'])
def loadData():
    if request.method == 'POST':
        RedisService.load()
        return "success"
    return "invalid request"


if __name__ == '__main__':
    if len(sys.argv) > 1 :
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(debug=True)