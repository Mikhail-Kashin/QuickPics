from .db import db
from .user import User
from sqlalchemy.sql import func


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    postsUsername = db.relationship('User', back_populates='posts')
    caption = db.Column(db.Text)
    comments = db.Column(db.Text)
<<<<<<< HEAD
    likes = db.relationship('Like', back_populates='posts', cascade="all, delete", passive_deletes=True)
=======
>>>>>>> 8e2a3623938b7c559a46ebf41fb0c7909206fb7b
    # comment = db.relationship('Comment', back_populates='posts')
    imageUrl = db.Column(db.String, nullable=False)
    user = db.relationship('User', back_populates='posts')
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "caption": self.caption,
            "comments": self.comments,
            "imageUrl": self.imageUrl,
<<<<<<< HEAD
            "createdAt": self.createdAt,
            "likes": [like.to_dict() for like in self.likes]
=======
            "createdAt": self.createdAt
>>>>>>> 8e2a3623938b7c559a46ebf41fb0c7909206fb7b
        }

    def to_simple_dict(self):
        return {
            "id": self.id,
            "caption": self.caption,
            "comments": self.comments,
            "imageUrl": self.imageUrl,
<<<<<<< HEAD
            "createdAt": self.createdAt,
            "likes": [like.to_dict() for like in self.likes]
=======
            "createdAt": self.createdAt
>>>>>>> 8e2a3623938b7c559a46ebf41fb0c7909206fb7b
        }
