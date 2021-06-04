import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { feedInfo, likePost, unLikePost } from '../../store/feed';
import './Feed.css'


function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feedReducer);
  const userId = useSelector(state => state.session.user.id)
  const eachPost = feed.followingPosts


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
    dispatch(feedInfo())
  }

  return (
    <div>
      <div className="feed-container">
        <div className="post">
          {eachPost.slice(0).reverse().map((post,i) => {
            return (
              <div className='feedContainer' key={i}>
                <div>
                  <NavLink to={`/${post.user.username}`}>
                    <h1 className='far fa-user-circle feedUserName'>&nbsp;{post.user.username}</h1>
                  </NavLink>
                  <img className='feedImages' src={post.imageUrl}></img>
                  <div className='feedUserName'>
                    {likeCheck(post.likes, post.id, userId)}
                    <h5 className='likeCounter'>Liked by {post.likes.length} user</h5>
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
