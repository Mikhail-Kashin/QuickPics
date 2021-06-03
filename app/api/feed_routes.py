from flask import Blueprint, request
from app.models import db, Post, User, Like
from flask_login import current_user, login_required


feed_routes = Blueprint('feed', __name__)


@feed_routes.route('')
@login_required
def user_feed():
    following = {
        follow.username: follow.username for follow in current_user.follows}
    followers = {
        followers.username: followers.username for followers in current_user.followers}
    followerUsername = [key for key in following]

    followingPosts = Post.query.join(User).filter(
        User.username.in_(followerUsername)).all()


    return {"userDict": current_user.to_user_dict(),
            "following": following,
            "followers": followers,
            'followingPosts': [post.to_dict() for post in followingPosts]
            }

@feed_routes.route('/like/<id>', methods=["POST"])
@login_required
def like_post(id):
    like = Like(userId=current_user.id, postId=id)
    db.session.add(like)
    db.session.commit()
    return {}

@feed_routes.route('/delete/like/<likeId>', methods=["DELETE"])
@login_required
def delete_like(likeId):
    like = Like.query.get(likeId)
    db.session.delete(like)
    db.session.commit()
    return {}
