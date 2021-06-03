import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { feedInfo, likePost } from '../../store/feed';
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

  return (
    <div>
      <div className="feed-container">
        <div className="post">
          {eachPost.slice(0).reverse().map((post,i) => {
            return (
              <div className='feedContainer' key={i}>
                <a>
                  <NavLink to={`/${post.user.username}`}>
                    <h1 className='far fa-user-circle feedUserName'>&nbsp;{post.user.username}</h1>
                  </NavLink>
                  <img className='feedImages' src={post.imageUrl}></img>
                  <div className='feedUserName'>
                    <NavLink to={`/${post.user.username}`} className='feedUserName2'>{post.user.username}</NavLink>
                    <button onClick={() => like(userId, post.id)}>Like</button>
                    <h1 className='feedCaption'>{post.caption}</h1>
                  </div>
                </a>
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
