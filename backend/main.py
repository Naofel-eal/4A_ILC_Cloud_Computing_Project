from flask import Flask, Response, request, abort
from services.user_service import UserService
from services.bula_service import BulaService
from services.redis_service import RedisService
from flask_cors import CORS, cross_origin
import sys

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['*'])

@app.before_request
def beforeRequest():
    if request.method == 'OPTIONS':
        return Response(status=200)
    
    if request.path not in ['/', '/user/login', '/user/register', '/load']:
        if request.headers.get('Authorization') == None:
            abort(400)
        else:
            if not UserService.isValidToken(request.headers.get('Authorization')):
                abort(401)
                
@app.after_request
def acceptCORS(response):
    response.headers.add('Access-Control-Allow-Headers', '*')
    return response

@app.route('/')
def default():
    if request.method == 'GET':
        return '''<h1>Bula API v0.0.0</h1>'''
    abort(400)
    

@app.route('/bula/all-bulas', methods=['GET'])
def allBulasRoute():
    if request.method == 'GET':
        return BulaService.getAllBulas()
    abort(400)


@app.route('/bula/user-bulas', methods=['GET'])
def userBulasRoute():
    if request.method == 'GET':
        userId = request.form.get("userId")
        return BulaService.getBulasOfUser(userId=userId)
    abort(400)


@app.route('/bula/post-bula', methods=['POST'])
def bulaRoute():
    if request.method == 'POST':
        userId = request.headers.get('Authorization').split('/')[1]
        bulaText = request.form.get("text")
        BulaService.createBula(userId=userId, bulaText=bulaText)
        return Response(status=200)
    abort(400)


@app.route('/bula/rebula', methods=['POST'])
def rebulaRoute():
    if request.method == 'POST':
        userId = request.headers.get('Authorization').split('/')[1]
        bulaId = request.form.get("bulaId")
        BulaService.rebula(userId=userId, bulaId=bulaId)
        return Response(status=200)
    abort(400)


@app.route('/bula/meow', methods=['POST'])
def meow():
    if request.method == 'POST':
        userId = request.headers.get('Authorization').split('/')[1]
        bulaId = request.form.get("bulaId")
        BulaService.meow(userId=userId, bulaId=bulaId)
        return Response(status=200)
    abort(400) 


@app.route('/bula/unrebula', methods=['POST'])
def unrebulaRoute():
    if request.method == 'POST':
        userId = request.headers.get('Authorization').split('/')[1]
        bulaId = request.form.get("bulaId")
        BulaService.unrebula(userId=userId, bulaId=bulaId)
        return Response(status=200)
    abort(400)


@app.route('/bula/unmeow', methods=['POST'])
def unmeow():
    if request.method == 'POST':
        userId = request.headers.get('Authorization').split('/')[1]
        bulaId = request.form.get("bulaId")
        BulaService.unmeow(userId=userId, bulaId=bulaId)
        return Response(status=200)
    abort(400) 


@app.route('/bula/hashtag', methods=['GET'])
def hashtagRoute():
    if request.method == 'GET':
        hashtag = request.args.get("hashtagId")
        return BulaService.getBulasOfHashtag(hashtag=hashtag)
    abort(400)


@app.route('/bula/all-hashtags', methods=['GET'])
def allHashtagsRoute():
    if request.method == 'GET':
        return BulaService.getAllHashtags()
    abort(400)


@app.route('/user/register', methods=['POST'])
def registerRoute():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        return UserService.register(username=username, password=password)
    abort(400)


@app.route('/user/login', methods=['POST'])
def loginRoute():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        return UserService.login(username=username, password=password)
    abort(400)


@app.route('/load', methods=['POST'])
def loadData():
    if request.method == 'POST':
        RedisService.load()
        return Response(status=200)
    abort(400)


if __name__ == '__main__':
    if len(sys.argv) > 1 :
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(debug=True)