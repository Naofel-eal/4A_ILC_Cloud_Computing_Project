from flask import Flask

app = Flask(__name__)

@app.route('/')
def default():
	return '''<h1>Bula API v0.0.0</h1>'''

@app.route('/all-bulas', methods=['GET'])
def allBulas():
    return '''<h1>ALL BULAS</h1>'''

@app.route('/user-bulas', methods=['GET'])
def userBulas():
    return '''<h1>USER-BULAS</h1>'''

@app.route('/bula', methods=['POST'])
def bula():
    return '''<h1>BULA</h1>'''

@app.route('/rebula', methods=['POST'])
def rebula():
    return '''<h1>REBULA</h1>'''

@app.route('/hashtag', methods=['GET'])
def hashtag():
    return '''<h1>HASHTAG</h1>'''

@app.route('/all-hashtags', methods=['GET'])
def allHashtags():
    return '''<h1>ALL HASHTAGS</h1>'''

@app.route('/register', methods=['POST'])
def register():
    return '''<h1>REGISTER</h1>'''


@app.route('/login', methods=['POST'])
def login():
    return '''<h1>LOGIN</h1>'''

if __name__ == '__main__':
    app.run(debug=True)