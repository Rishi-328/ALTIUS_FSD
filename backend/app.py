from flask import Flask, request, jsonify  #for request and response
from flask_cors import CORS #for cross-origin resource sharing
from flask_bcrypt import Bcrypt #for hashing the password
from flask_pymongo import PyMongo #for connecting to mongodb
import jwt #to sign and verify java web tokens
from datetime import datetime, timedelta
from functools import wraps
from bson.objectid import ObjectId
from dotenv import load_dotenv #load environement varaibles
import os
load_dotenv()

app = Flask(__name__)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mongo = PyMongo(app)
bcrypt = Bcrypt(app)


CORS(app)

users = mongo.db.users
books = mongo.db.books
products = mongo.db.products
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = users.find_one({'username': data['username']})
            if not current_user:
                return jsonify({'message': 'User not found!'}), 401
        except jwt.ExpiredSignatureError: #checking token expiration
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError: #invalid token
            return jsonify({'message': 'Invalid token!'}), 401
        return f(*args, **kwargs)
    return decorated

#create books
@app.route('/books', methods=['POST'])
@token_required
def create_book():
    data = request.get_json()
    title = data.get('title')
    author = data.get('author')
    if not title or not author:
        return jsonify({'message': 'Title and author required'}), 400
    book_id = books.insert_one({'title': title, 'author': author}).inserted_id
    return jsonify({'message': 'Book created', 'id': str(book_id)}), 201



#get all books
@app.route('/books', methods=['GET'])
@token_required
def get_books():
    book_details = []
    for post in books.find():
        book_details.append({
            'id': str(post['_id']),
            'title': post['title'],
            'author': post['author']
        })
    return jsonify(book_details), 200

#get a single book
@app.route('/books/<book_id>', methods=['GET'])
@token_required
def get_singlebook(book_id):
    book = books.find_one({'_id': mongo.db.ObjectId(book_id)})
    if not book:
        return jsonify({'message': 'Book not found'}), 404
    return jsonify({
        'id': str(book['_id']),
        'title': book['title'],
        'author': book['author']
    }), 200


#update a book
@app.route('/books/<book_id>', methods=['PUT']) 
@token_required
def update_book(book_id):
    data = request.get_json()
    title = data.get('title')
    author = data.get('author')
    if not title or not author:
        return jsonify({'message': 'Title and author required'}), 400
    result = books.update_one(
        {'_id': ObjectId(book_id)},  # Use ObjectId from bson
        {'$set': {'title': title, 'author': author}}
    )
    if result.matched_count == 0:
        return jsonify({'message': 'Book not found'}), 404
    return jsonify({'message': 'Book updated'}), 200


#delete a book
@app.route('/books/<book_id>', methods=['DELETE'])
@token_required  
def delete_book(book_id):
    result = books.delete_one({'_id': ObjectId(book_id)})  # Correct usage
    if result.deleted_count == 0:
        return jsonify({'message': 'Book not found'}), 404
    return jsonify({'message': 'Book deleted'}), 200


#create a new user (signup) user registration
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400
    if users.find_one({'username': username}):
        return jsonify({'message': 'Username already exists'}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8') #hashing the password for security
    users.insert_one({'username': username, 'password': hashed_password})
    return jsonify({'message': 'User created successfully'}), 201


#login functionality (for an existing user)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400
    user = users.find_one({'username': username})
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid credentials'}), 401
    token = jwt.encode(
        {'username': username, 'exp': datetime.utcnow() + timedelta(hours=1)}, #curren date and time  + 1hour
        app.config['SECRET_KEY'],
        algorithm="HS256" #for signing the token
    )
    return jsonify({'token': token})


if __name__ == '__main__':
    app.run(port=5000, debug=True)
