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
    # print('--------------------->', user.follows)

    # return {user.to_user_dict() }
    return {"userDict": user.to_user_dict(),
            "following": following,
            "followers": followers
            }


# @profile_routes.route('/follows/<name>', methods=['POST'])
# def user_follow_post(name):
#     user = User.query.filter_by(username=name).first()
#     following = {
#         follow.username: follow.username for follow in user.follows}
#     followers = {
#         followers.username: followers.username for followers in user.followers}
#     selectedUser = following(name: name)
#     name.following.append()
#     db.session.add(selectedUser)
#     db.session.commit()
#     return(name)
