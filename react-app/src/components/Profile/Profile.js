import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { profileInfo } from '../../store/profile'
// import './profile.css'

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
    // <div className='container'>
    //   <div class="profile-user-settings">

    //     <h1 class="profile-user-name">janedoe_</h1>

    //     <button class="btn profile-edit-btn">Edit Profile</button>

    //     <button class="btn profile-settings-btn" aria-label="profile settings"><i class="fas fa-cog" aria-hidden="true"></i></button>
    //     </div>
    <ul>
      {profile.posts.map((post) => {
        return (
          <li>
            <a href=':username/:postId'>
              <img src={post.imageUrl}></img>
            </a>
          </li>
        )
      })}
    </ul>
    // </div>
  );
  // } else {
  //   return (
  //     <h1>
  //       User not found!
  //     </h1>
  //   )
  // }

}
export default Profile;
