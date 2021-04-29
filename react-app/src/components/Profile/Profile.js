import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { profileInfo } from '../../store/profile'
import './profile.css'

function Profile() {
  const dispatch = useDispatch();
  let { name } = useParams();
  const profile = useSelector(state => state.profileReducer);
  console.log('profile', profile)

  useEffect(() => {
    (async () => {
      await dispatch(profileInfo(name))
    })();
  }, [dispatch]);

  // if (profile.posts) {
  return (
    <div>
      <div className='container'>
        <div className="profile-user-settings">

          <h1 className="profile-user-name">{profile['username']}</h1>

          <button className="btn profile-edit-btn">Edit Profile</button>

          <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button>
          </div>
        </div>
      <main className='images-container'>
            <div className="gallery-item" tabIndex="0">

                <ul className="imagesList">
                  {profile.posts.slice(0).reverse().map((post) => {
                    return (
                      <li key={post.id}>
                        <a href=':username/:postId'>
                          <img className='gallery-image' src={post.imageUrl}></img>
                        </a>
                      </li>
                    )
                  })}
                </ul>

            </div>

      </main>
    </div>
  );
}
export default Profile;
