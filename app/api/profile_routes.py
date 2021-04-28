from flask import Blueprint, request
from app.models import db, Post, User
from flask_login import current_user, login_required

profile_routes = Blueprint('profiles', __name__)


@profile_routes.route('/<name>')
@login_required
def user_info(name):
    user = User.query.filter_by(username=name).first()
    return user.to_user_dict()
