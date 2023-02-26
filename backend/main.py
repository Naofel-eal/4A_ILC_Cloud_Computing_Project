from flask import Flask, request
from services.service import *

app = Flask(__name__)

@app.route('/')
def default():
    if request.method == 'GET':
        return '''<h1>Bula API v0.0.0</h1>'''
    return "invalid request"
    

@app.route('/all-bulas', methods=['GET'])
def allBulasRoute() -> str:
    if request.method == 'GET':
        return getAllBulas()
    return "invalid request"


@app.route('/user-bulas', methods=['GET'])
def userBulasRoute():
    if request.method == 'GET':
        userId = request.args.get("userId")
        return getBulasIdOfUser(userId=userId)
    return "invalid request"


@app.route('/bula', methods=['POST'])
def bulaRoute():
    if request.method == 'POST':
        userId = request.args.get("userId")
        bulaText = request.args.get("text")
        createBula(userId=userId, bulaText=bulaText)
        return 'success'
    return "invalid request"


@app.route('/rebula', methods=['POST'])
def rebulaRoute():
    if request.method == 'POST':
        userId = request.args.get("userId")
        bulaId = request.args.get("bulaId")
        rebula(userId=userId, bulaId=bulaId)
        return 'success'
    return "invalid request"


@app.route('/hashtag', methods=['GET'])
def hashtagRoute():
    if request.method == 'GET':
        hashtag = request.args.get("hashtagId")
        return getBulasOfHashtag(hashtag=hashtag)
    return "invalid request"


@app.route('/all-hashtags', methods=['GET'])
def allHashtagsRoute():
    if request.method == 'GET':
        return getAllHashtags()
    return "invalid request"


@app.route('/register', methods=['POST'])
def registerRoute():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        return register(username=username, password=password)
    return "invalid request"


@app.route('/login', methods=['POST'])
def loginRoute():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        return login(username=username, password=password)
    return "invalid request"


@app.route('/load', methods=['POST'])
def loadData():
    if request.method == 'POST':
        load()
        return "success"
    return "invalid request"


if __name__ == '__main__':
    app.run(debug=True)