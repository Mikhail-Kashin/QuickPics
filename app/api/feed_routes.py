from flask import Blueprint, request
from app.models import db, Post, User, Like, Comment
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
    # need to implement my posts into feed

    return {
        "userDict": current_user.to_user_dict(),
        "following": following,
        "followers": followers,
        'followingPosts': [post.to_dict() for post in followingPosts]
    }

@feed_routes.route('/edit/<postId>', methods=["PATCH"])
@login_required
def edit_post(postId):
    post = Post.query.get(postId)
    post.caption = request.get_json()['caption']
    db.session.commit()
    return {
        'currentPost': post.to_dict()
    }


@feed_routes.route('/post/<postId>')
@login_required
def get_post(postId):
    post = Post.query.get(postId)
    return {"currentPost": post.to_dict()}


@feed_routes.route('/comment/<postId>', methods=['POST'])
@login_required
def comment_post(postId):
    comment = request.form["comment"]
    postedComment = Comment(userId=current_user.id,
                            postId=postId, body=comment)
    db.session.add(postedComment)
    db.session.commit()
    return {
        "comment": postedComment.to_dict()
    }


@feed_routes.route('/delete/comment/<commentId>', methods=['DELETE'])
@login_required
def comment_delete(commentId):
    comment = Comment.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()
    return {}


@feed_routes.route('/api/feed/edit/comment/<commentId>', methods=['PATCH'])
@login_required
def edit_comment(commentId):
    comment_body = request.form["commentBody"]
    comment = Comment.query.get(commentId)
    comment.body = comment_body
    db.session.add(comment)
    db.session.commit()
    return {}


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
