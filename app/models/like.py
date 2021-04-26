from .db import db
from .user import User
from .post import Post

class Like(db.Model):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key = True)
  userId = db.Column(db.Integer,db.ForeignKey('users.id'),nullable = False)
  postId = db.Column(db.Integer,db.ForeignKey('posts.id'),nullable = False)
  user = db.relationship('User', back_populates='likes')
  posts = db.relationship('Post', back_populates='likes')
  created_at = db.Column(db.DateTime, nullable = False)
  updated_at = db.Column(db.DateTime, nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
    }
