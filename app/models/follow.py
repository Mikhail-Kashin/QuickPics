from .db import db
from .user import User

class Follow(db.Model):
  __tablename__ = 'follows'

  id = db.Column(db.Integer, primary_key = True)
  userId = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
  followerId = db.Column(db.Integer,db.ForeignKey('users.id'),nullable = False)
  created_at = db.Column(db.DateTime, nullable = False)