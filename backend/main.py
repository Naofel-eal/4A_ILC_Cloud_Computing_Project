from flask import Flask, request
from utils.utils import *
import sys

app = Flask(__name__)

@app.route('/')
def default():
    return '''<h1>Bula API v0.0.0</h1>'''

@app.route('/all-bulas', methods=['GET'])
def allBulasRoute() -> str:
    if request.method == 'GET':
        return getAllBulas()
    return "invalid request"

@app.route('/user-bulas', methods=['GET'])
def userBulasRoute():
    if request.method == 'GET':
        userId = request.args.get("userId")
        return getBulasIdStringOfUser(userId=userId)
    return "invalid request"

@app.route('/bula', methods=['POST'])
def bulaRoute():
    if request.method == 'POST':
        userId = request.args.get("userId")
        bulaText = request.args.get("text")
        createBula(userId=userId, bulaText=bulaText)
        return ''
    return "invalid request"

@app.route('/rebula', methods=['POST'])
def rebulaRoute():
    if request.method == 'POST':
        userId = request.args.get("userId")
        bulaId = request.args.get("userId")
        rebula(userId=userId, bulaTimestamp=bulaId)
    return "invalid request"

@app.route('/hashtag', methods=['GET'])
def hashtagRoute():
    if request.method == 'GET':
        hashtagId = request.args.get("hashtagId")
        return getBulasIdStringOfHashtag(hashtagId=hashtagId)
    return "invalid request"

@app.route('/all-hashtags', methods=['GET'])
def allHashtagsRoute():
    if request.method == 'GET':
        return getAllHashtags()
    return "invalid request"

@app.route('/register', methods=['POST'])
def registerRoute():
    if request.method == 'POST':
        return '''<h1>REGISTER</h1>'''
    return "invalid request"

@app.route('/login', methods=['POST'])
def loginRoute():
    if request.method == 'POST':
        return '''<h1>LOGIN</h1>'''
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