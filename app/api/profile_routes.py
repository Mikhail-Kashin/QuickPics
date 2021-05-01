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
    # print('--------------------->following',following)
    # print('--------------------->current_user', current_user)
    # print('--------------------->', user.follows)

    # return {user.to_user_dict() }
    return {"userDict": user.to_user_dict(),
            "following": following,
            "followers": followers
            }


@profile_routes.route('/follows/<name>', methods=['POST'])
def user_follow_post(name):
    print('----->name', name)
    user = User.query.filter_by(username=name).first()
    current_user.follows.append(user)
    db.session.add(current_user)
    db.session.commit()
    return({'user': user.username})



@profile_routes.route('/unfollows/<name>', methods=['POST'])
def user_unfollow_post(name):
    print('----->name', name)
    user = User.query.filter_by(username=name).first()
    current_user.follows.remove(user)
    db.session.add(current_user)
    db.session.commit()
    return({'user': user.username})
