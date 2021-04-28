import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { profileInfo } from '../../store/profile'

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
