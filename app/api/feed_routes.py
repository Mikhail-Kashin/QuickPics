from flask import Blueprint, request
<<<<<<< HEAD
from app.models import db, Post, User, Like
=======
from app.models import db, Post, User
>>>>>>> 8e2a3623938b7c559a46ebf41fb0c7909206fb7b
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
<<<<<<< HEAD

=======
    print('--------------------->', followerUsername)
>>>>>>> 8e2a3623938b7c559a46ebf41fb0c7909206fb7b

    return {"userDict": current_user.to_user_dict(),
            "following": following,
            "followers": followers,
            'followingPosts': [post.to_dict() for post in followingPosts]
            }
<<<<<<< HEAD

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
=======
>>>>>>> 8e2a3623938b7c559a46ebf41fb0c7909206fb7b
