import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { feedInfo } from '../../store/feed';


function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feedReducer);
  const eachPost = feed.followingPosts

  // console.log("--------->eachPost", eachPost)

  useEffect(() => {
    (async () => {
      await dispatch(feedInfo())
    })();
  }, [dispatch]);

  return (
    <div>
      <div className="feed-container">
        <div className="post">
          {eachPost.slice(0).reverse().map((post) => {
            console.log('---------------', post.user.username)
            return (
              <div>
                <h1>{post.user.username}</h1>
                <a>
                  <img src={post.imageUrl}></img>
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
