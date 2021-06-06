import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { profileInfo, followersData } from '../../store/profile';
import { likePost, unLikePost } from '../../store/feed';
import './profile.css';

function Profile() {
  const dispatch = useDispatch();
  let { name } = useParams();
  const profile = useSelector(state => state.profileReducer);
  const username = useSelector(state => state.session.user.username);
  const followersObj = profile.followers
  const followingObj = profile.following
  const userId = useSelector(state => state.session.user.id)
  const [followClicked, setFollowClicked] = useState(false)


  // const followBtn =document.getElementsByClassName('.profile-stat-followers')
  // if (followBtn){
  //   followBtn.addEventListener('click', () =>{
  //     setFollowClicked(true)
  //   })
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
    // console.log('-------->name', [name])
    let followersArr = Object.keys(followersObj)
    // console.log('-------->followersarr', followersArr)
    if (followersArr.includes(username)) {
      console.log('this is true!!!!!!')
      return true
    } else {
      console.log('this is false!!!!')
    }
  }
  // console.log(isFollowing())
  const FollowButton = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/profiles/follows/${name}`, {
      method: "POST"
    })
    const data = await res.json()
    //  console.log("---------->data", data)
    dispatch(profileInfo(name, followersObj, followingObj))
    return (data)
  }



  const UnFollowButton = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/profiles/unfollows/${name}`, {
      method: "POST"
    })
    const data = await res.json()
    //  console.log("---------->data", data)
    dispatch(profileInfo(name, followersObj, followingObj))
    return   (data)
  }

  function ifUserIsMe() {
    if (username !== name && isFollowing() === true) {
      return (
        <button className="btn profile-follow-btn" onClick={UnFollowButton}>Following</button>
      )
    }
    else if (username !== name) {
      return (
        <button className="btn profile-follow-btn" onClick={FollowButton}>Follow</button>
      )
    }
  }

  useEffect(() => {
    dispatch(profileInfo(name, followersObj, followingObj))
  }, [name, dispatch]);

  const yourLike = (like) => {
    if(like?.length > 0) {
      for(let i = 0; i < like.length; i++) {
        if(like[i].userId === userId) {
          return like[i].id
        }
      }
    }
  }

  const likeCheck = (likeArr, postId, userId) => {
    if(likeArr?.length > 0) {
      for(let i = 0; i < likeArr.length; i++) {
        if(likeArr[i].userId === userId) {
          return (
            <div className="fas fa-heart unlike" onClick={() => unLike(likeArr)}></div>
          )
        }
      }
    }
    return (
      <div className="far fa-heart like" onClick={() => like(userId,postId)}></div>
    )
  }

  async function unLike(like) {
    const likeId = yourLike(like);
    await dispatch(unLikePost(likeId))
    dispatch(profileInfo(name, followersObj, followingObj))
  }

  async function like(userId, postId) {
    await dispatch(likePost(userId, postId))
    dispatch(profileInfo(name, followersObj, followingObj))
  }


  return (
    <div className='entireProfileContainer'>
      <div className='profileContainer'>
        <h1 className="profile-user-name">
          {profile.userDict['username']}
          {/* <button className="btn profile-edit-btn">Edit Profile</button> */}
        </h1>
        <div className="profile-stats">
          <div className="profile-stat-post"> {profile.userDict.posts.length} posts</div>
          <div className="profile-stat-followers">{countFollowers()} followers</div>
          <div className="profile-stat-following">{countFollowing()} following</div>
        </div>
        {/* if I follow: show following in span   */}
        {/* useParams to check against username and see if we follow them  */}
        {ifUserIsMe()}
        {/* <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button> */}
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
                  <div>
                    <img className='gallery-image' src={post.imageUrl}
                    ></img>
                  </div>
                    <div className='profileLikes'>
                    {likeCheck(post.likes, post.id, userId)}
                    <h5>Liked by {post.likes.length} users</h5>
                    </div>
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
