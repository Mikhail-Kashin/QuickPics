import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOnePost, likePost, unLikePost, feedInfo, createComment } from '../../store/feed';

import './Feed.css'

function PostModal({ postId }) {
  const dispatch = useDispatch();
  const post = useSelector(state => state.feedReducer?.selectedPost?.currentPost);
  const userId = useSelector(state => state?.session?.user?.id);
  const likesArr = useSelector(state => state?.feedReducer?.selectedPost?.currentPost?.likes);
  const [body, setBody] = useState('');

  async function like(userId, postId) {
    await dispatch(likePost(userId, postId))
    dispatch(getOnePost(postId))
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
    dispatch(getOnePost(postId))
    dispatch(feedInfo())
  }

  function postComment(comment) {
    dispatch(createComment(postId, comment))
    dispatch(getOnePost(postId))
  }


  if (!post) return null;

  return (
    <div className='modalContainer'>
      <img className='postModalImages' src={post?.imageUrl}></img>
      <div className='modalUserName'>
        <Link to={`/${post?.user?.username}`} className='far fa-user-circle  modalUserNameText'>&nbsp;&nbsp;&nbsp;&nbsp;{post?.user.username}</Link>
        <div className='modalCaption'>{post?.caption}</div>
        <div className='line'></div>
        <div className='modalCommentsContainer'>
          {post?.comments.map((comment) => (
            <div key={comment.id}>
              <Link className='far fa-user-circle modalCommentUser' to={`/${comment.userId.username}`}>&nbsp;&nbsp;&nbsp;&nbsp;{comment.userId.username}</Link>
              <div key={comment.id} className='modalComments'>{comment.body}</div>
            </div>
          ))}
        </div>
        <div className='line'></div>
        <div className='modalLikes'>
          {likeCheck(likesArr, postId, userId)}
          &nbsp;&nbsp;&nbsp;&nbsp;liked by {likesArr.length} users
        </div>
        <form onSubmit={postComment(body)}>
          <div className='modalCommentBar'>
            <input
              onChange={(e) => setBody(e.target.value)}
              value={body}
              // placeholder='add a comment...'
              className='modalCommentInput'
            ></input>
          </div>
        </form>
        <button type="submit">Comment</button>
      </div>

    </div>
  )
}

export default PostModal;
