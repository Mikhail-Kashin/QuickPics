from flask import Blueprint, request
from app.models import db, Post, User
from flask_login import current_user, login_required

profile_routes = Blueprint('profiles', __name__)


@profile_routes.route('/<name>')
@login_required
def user_info(name):
    user = User.query.filter_by(username=name).first()
    following = {
        follow.username: follow.username for follow in user.follows}
    followers = {
        followers.username: followers.username for followers in user.followers}
    print('heyeheyheyeye', user.follows)

    return {"userDict": user.to_user_dict(),
            "following": following,
            "followers": followers
            }
