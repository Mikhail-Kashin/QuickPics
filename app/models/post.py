from .db import db
from .user import User

class Post(db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer, primary_key = True)
  userId = db.Column(db.Integer,db.ForeignKey('users.id'),nullable = False)
  caption = db.Column(db.Text, nullable = False)
  comments = db.Column(db.Text, nullable = False)
  # comment = db.relationship('Comment', back_populates='posts')
  imageUrl = db.Column(db.String, nullable = False)
  # user = db.relationship('User', back_populates='posts')
  created_at = db.Column(db.DateTime, nullable = False)


  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "caption": self.caption,
      "comments": self.comments,
      "imageUrl": self.imageUrl,
      "created_at": self.created_at
    }
