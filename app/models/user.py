from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  posts = db.relationship('Post', back_populates ='user')
  # follow = db.relationship('Follow', back_populates='users')


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)

  # def post_dict(self):
  #   post = { p for p in self.posts }

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
    }

  def to_user_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "posts": [post.to_simple_dict() for post in self.posts]
    }
