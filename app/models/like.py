from .db import db
from .user import User
from .post import Post

class Like(db.Model):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key = True)
  userId = db.Column(db.Integer,db.ForeignKey('users.id'),nullable = False)
  postId = db.Column(db.Integer,db.ForeignKey('posts.id'),nullable = False)
<<<<<<< HEAD
  user = db.relationship('User', back_populates='likes')
  posts = db.relationship('Post', back_populates='likes')
  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "postId": self.postId
=======
  # user = db.relationship('User', back_populates='likes')
  # post = db.relationship('Post', back_populates='likes')
  created_at = db.Column(db.DateTime, nullable = False)
  updated_at = db.Column(db.DateTime, nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
>>>>>>> 8e2a3623938b7c559a46ebf41fb0c7909206fb7b
    }
