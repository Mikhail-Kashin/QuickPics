import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { profileInfo } from '../../store/profile'
import './profile.css'

function Profile() {
  const dispatch = useDispatch();
  let { name } = useParams();
  const profile = useSelector(state => state.profileReducer);
  const username = useSelector(state => state.session.user.username)
  // for (const followersNum in profile.followers) {
  //   console.log('FINALLE', followersNum)
  //   return followersNum;
  // }
  function countFollowers() {
    const myFollowers = profile.followers;
    let count = 0;
    for (let x in myFollowers) {
      if (myFollowers.hasOwnProperty(x)) {
        ++count;
      }
    }
    return count;
  }

  function countFollowing() {
    const myFollowing = profile.following;
    let count = 0;
    for (let x in myFollowing) {
      if (myFollowing.hasOwnProperty(x)) {
        ++count;
      }
    }
    return count;
  }

  function ifUserIsMe() {
    if (username !== name) {
      return (
        <button className="btn profile-follow-btn">Follow</button>
      )
    }
  }

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



          {/* if I follow: show following in span   */}
          {/* useParams to check against username and see if we follow them  */}
          {ifUserIsMe()}

          {/* <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button> */}


          <div className="profile-stats">

            <div>
              <li><span className="profile-stat-post"></span>{profile.userDict.posts.length} posts</li>
              <li><span className="profile-stat-followers"></span>{countFollowers()} followers</li>
              <li><span className="profile-stat-following"></span>{countFollowing()} following</li>
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
