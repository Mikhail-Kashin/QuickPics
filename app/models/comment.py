from .db import db
from .user import User
from .post import Post
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    user = db.relationship('User', back_populates='comments')
    posts = db.relationship('Post', back_populates='comments')
    # created_at = db.Column(db.DateTime(timezone=True),
    #    nullable=False, server_default=func.now())
    # updated_at = db.Column(db.DateTime(timezone=True),
    #    nullable=False, server_default=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "body": self.body,
            "created_at": self.created_at
        }
