from flask import Flask, request
from backend.utils.utils import *

app = Flask(__name__)

@app.route('/')
def default():
	return '''<h1>Bula API v0.0.0</h1>'''

@app.route('/all-bulas', methods=['GET'])
def allBulasRoute() -> str:
    return getAllBulas()

@app.route('/user-bulas', methods=['GET'])
def userBulasRoute():
    userId = request.args.get("userId")
    return getBuladIdStringOfUser(userId=userId)

@app.route('/bula', methods=['POST'])
def bulaRoute():
    userId = request.args.get("userId")
    bulaText = request.args.get("text")
    createBula(userId=userId, bulaText=bulaText)

@app.route('/rebula', methods=['POST'])
def rebulaRoute():
    userId = request.args.get("userId")
    bulaId = request.args.get("userId")
    rebula(userId=userId, bulaTimestamp=bulaId)

@app.route('/hashtag', methods=['GET'])
def hashtagRoute():
    return '''<h1>HASHTAG</h1>'''

@app.route('/all-hashtags', methods=['GET'])
def allHashtagsRoute():
    return '''<h1>ALL HASHTAGS</h1>'''

@app.route('/register', methods=['POST'])
def registerRoute():
    return '''<h1>REGISTER</h1>'''

@app.route('/login', methods=['POST'])
def loginRoute():
    return '''<h1>LOGIN</h1>'''

if __name__ == '__main__':
    app.run(debug=True)