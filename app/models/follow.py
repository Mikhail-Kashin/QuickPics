from .db import db
from .user import User

class Follow(db.Model):
  __tablename__ = 'follows'

  id = db.Column(db.Integer, primary_key = True)
  userId = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
  followerId = db.Column(db.Integer,db.ForeignKey('users.id'),nullable = False)
  users = db.relationship('User', back_populates='follows')
  follower = db.relationship('User', back_populates='follows')
  created_at = db.Column(db.DateTime, nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "followerId": self.followerId,

    }
