import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { profileInfo } from '../../store/profile'
import './profile.css'

function Profile() {
  const dispatch = useDispatch();
  let { name } = useParams();



  const profile = useSelector(state => state.profileReducer);
  const username = useSelector(state => state.session.user.username);
  const followersObj = profile.followers


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

  function isFollowing() {
    console.log('-------->name', [name])
    let followersArr = Object.keys(followersObj)
    console.log('-------->followersarr', followersArr)
    if (followersArr.includes(username)) {
      console.log('this is true!!!!!!')
      return true
    } else {
      console.log('this is false!!!!')
    }
  }

  function ifUserIsMe() {
    if (username !== name && isFollowing() === true) {
      return (
        <button className="btn profile-follow-btn">Following</button>
      )
    }
    else if (username !== name) {
      return (
        <button className="btn profile-follow-btn">Follow</button>
      )
    }
    else if (username !== name && isFollowing() === false) {
      return (
        <button className="btn profile-follow-btn">Follow</button>
      )
    }
  }

  console.log(isFollowing())

  const FollowButton = async (e) => {
    e.preventDefault();

    const following = {}
    const res = await fetch(`/api/profiles/follows/${name}`, {
      method: "POST",
    })
  }

  useEffect(() => {
    (async () => {
      await dispatch(profileInfo(name))
    })();
  }, [name, dispatch]);

  // if (profile.posts) {
  return (
    <div>
      <div className='profileContainer'>
        <h1 className="profile-user-name">
          {profile.userDict['username']}
          {/* <button className="btn profile-edit-btn">Edit Profile</button> */}
        </h1>
        {/* if I follow: show following in span   */}
        {/* useParams to check against username and see if we follow them  */}
        {ifUserIsMe()}
        {/* <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button> */}
        <div className="profile-stats">
          <div className="profile-stat-post"> {profile.userDict.posts.length} posts</div>
          <div className="profile-stat-followers">{countFollowers()} followers</div>
          <div className="profile-stat-following">{countFollowing()} following</div>
        </div>
        <div className="profile-bio">
          {/* <p><span className="profile-real-name">{profile.userDict['username']}</span>{profile.userDict['bio']}</p> */}
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
