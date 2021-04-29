from flask import Blueprint, request
from app.models import db, Post, User
from flask_login import current_user, login_required


feed_routes = Blueprint('feed', __name__)


@feed_routes.route('')
@login_required
def user_feed():
  currentUserPost = Post.query.filter_by(postsUsername=current_user)

  currentuserid = current_user.id
  following = {
        follow.username: follow.username for follow in current_user.follows}
  followers = {
        followers.username: followers.username for followers in current_user.followers}
  followerUsername = [key for key in followers]
  # for x in followerUsername:
  #   print(('--------------------->', x)
  # followersPosts = Post.query.filter_by(postsUsername=for x followerUsername)
  print('--------------------->', currentUserPost)
  return {"userDict": current_user.to_user_dict(),
              "following": following,
              "followers": followers
              }
