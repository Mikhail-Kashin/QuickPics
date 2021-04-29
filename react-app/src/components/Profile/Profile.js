import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { profileInfo } from '../../store/profile'
import './profile.css'

function Profile() {
  const dispatch = useDispatch();
  let { name } = useParams();
  const profile = useSelector(state => state.profileReducer);
  // console.log('profile', profile)

  useEffect(() => {
    (async () => {
      await dispatch(profileInfo(name))
    })();
  }, [dispatch]);

  // if (profile.posts) {
  return (
    <div>
      <div className='profileContainer'>
        <div className="profile-user-settings">

          <h1 className="profile-user-name">{profile.userDict['username']}</h1>
            <button className="btn profile-edit-btn">Edit Profile</button>


          {/* <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button> */}

          <div className="profile-stats">

            <div>
              <span className="profile-stat-post">{profile.userDict.posts.length}</span>posts
              <span className="profile-stat-followers">{profile.followers.length}</span>followers
              <span className="profile-stat-following">{profile.following.length}</span>following
            </div>

          </div>

          <div className="profile-bio">

            {/* <p><span className="profile-real-name">{profile.userDict['username']}</span>{profile.userDict['bio']}</p> */}

          </div>
          </div>
        </div>
      <main className='images-container'>
        <div className="gallery-item" tabIndex="0">

            <div className="imagesList">
              {profile.userDict.posts.slice(0).reverse().map((post, i) => {
                return (
                  <div key={post.id}>
                    <a href=':username/:postId'>
                      <img className='gallery-image' src={post.imageUrl}

                      ></img>
                    </a>
                  </div>
                )
              })}
            </div>

        </div>

      </main>
    </div>
  );
}
export default Profile;
