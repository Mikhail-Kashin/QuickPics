import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { profileInfo, followersData } from '../../store/profile';
import { likePost, unLikePost } from '../../store/feed';
import { Modal } from '../../context/modal';
import ProfilePostModal from './ProfilePostModal';
import { showPost, hidePost } from '../../store/modal'
import './profile.css';

function Profile() {
  const dispatch = useDispatch();
  let { name } = useParams();
  const profile = useSelector(state => state.profileReducer);
  const username = useSelector(state => state.session.user.username);
  const followersObj = profile.followers
  const followingObj = profile.following
  const userId = useSelector(state => state.session.user.id)
  const modalState = useSelector(state => state?.modal?.postForm);
  const [followClicked, setFollowClicked] = useState(false)



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
    let followersArr = Object.keys(followersObj)
    if (followersArr.includes(username)) {
      console.log('this is true!!!!!!')
      return true
    } else {
      console.log('this is false!!!!')
    }
  }
  const FollowButton = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/profiles/follows/${name}`, {
      method: "POST"
    })
    const data = await res.json()
    dispatch(profileInfo(name, followersObj, followingObj))
    return (data)
  }



  const UnFollowButton = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/profiles/unfollows/${name}`, {
      method: "POST"
    })
    const data = await res.json()
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

  function handleOpen(postId) {
    dispatch(showPost(postId));
    dispatch(profileInfo(name, followersObj, followingObj))
  }

  function handleClose(postId) {
    dispatch(hidePost(postId));
    dispatch(profileInfo(name, followersObj, followingObj))
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
        </h1>
        <div className="profile-stats">
          <div className="profile-stat-post"> {profile.userDict.posts.length} posts</div>
          <div className="profile-stat-followers">{countFollowers()} followers</div>
          <div className="profile-stat-following">{countFollowing()} following</div>
        </div>
        {ifUserIsMe()}
        <div className="profile-bio">
        </div>
      </div>
      <main className='images-container'>
        <div className="gallery-item" tabIndex="0">
          <div className="imagesList">
            {profile.userDict.posts.slice(0).reverse().map((post, i) => {
              return (
                <div key={post.id}>
                  {modalState === post?.id &&
                  <Modal onClose={() => handleClose(post?.id)}>
                    <ProfilePostModal postId={post.id} />
                  </Modal>
                }
                  <div>
                    <img className='gallery-image' src={post.imageUrl} onClick={ () => handleOpen(post.id)}
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
