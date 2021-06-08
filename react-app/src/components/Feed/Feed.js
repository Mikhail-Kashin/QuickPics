import React, { useEffect } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { feedInfo, likePost, unLikePost, getOnePost } from '../../store/feed';
import './Feed.css'
import PostModal from './PostModal';
import { Modal } from '../../context/modal';
import { showPost, hidePost } from '../../store/modal'


function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feedReducer);
  const userId = useSelector(state => state.session.user.id);
  const modalState = useSelector(state => state.modal.postForm);
  //need to implement user posts in feed
  const eachPost = feed.followingPosts;


  useEffect(() => {
    (async () => {
      await dispatch(feedInfo())
    })();
  }, [dispatch]);

  async function like(userId, postId) {
    await dispatch(likePost(userId, postId))
    dispatch(feedInfo())
  }

  const yourLike = (like) => {
    if (like?.length > 0) {
      for (let i = 0; i < like.length; i++) {
        if (like[i].userId === userId) {
          return like[i].id
        }
      }
    }
  }

  const likeCheck = (likeArr, postId, userId) => {
    if (likeArr?.length > 0) {
      for (let i = 0; i < likeArr.length; i++) {
        if (likeArr[i].userId === userId) {
          return (
            <div className="fas fa-heart unlike" onClick={() => unLike(likeArr)}></div>
          )
        }
      }
    }
    return (
      <div className="far fa-heart like" onClick={() => like(userId, postId)}></div>
    )
  }

  async function unLike(like) {
    const likeId = yourLike(like);
    await dispatch(unLikePost(likeId))
    dispatch(feedInfo())
  }

  function handleClose(postId) {
    dispatch(hidePost(postId));
    dispatch(getOnePost(postId))
    console.log('-----------yayaya-----')
  }

  function handleOpen(postId) {
    dispatch(showPost(postId));
    dispatch(getOnePost(postId))
    console.log('------boobobobo-----')
  }

  return (
    <div>
      <div className="feed-container">
        <div className="post" >
          {eachPost?.slice(0)?.reverse().map((post, i) => {
            return (
              <div className='postContainer' key={i}>
                <button onClick={() => handleOpen(post.id)}>Open Modal</button>
                {modalState === post.id &&
                  <Modal onClose={() => handleClose(post.id)}>
                    <h1>test</h1>
                    <PostModal postId={post.id} />
                    {/* </PostModal> */}
                    <button onClick={() => dispatch(hidePost(post.id))}>close</button>
                  </Modal>
                }
                <div>
                  <NavLink to={`/${post.user.username}`}>
                    <h1 className='far fa-user-circle feedUserName'>{post.user.username}</h1>
                  </NavLink>
                  <img className='feedImages' src={post.imageUrl}></img>
                  <div className='feedUserName'>
                    {likeCheck(post.likes, post.id, userId)}
                    <h5 className='likeCounter'>Liked by {post.likes.length} users</h5>
                    <NavLink to={`/${post.user.username}`} className='feedUserName2'>{post.user.username}</NavLink>
                    <h1 className='feedCaption'>{post.caption}</h1>
                  </div>
                </div>
              </div>
            )
          })}
          {/* <h1 className="postedUser">{feed.followingPosts.user.username}</h1> */}
        </div>
      </div>
    </div>
  )
}

export default Feed;
