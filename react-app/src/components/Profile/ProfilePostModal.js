import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { profileInfo, deletePost } from '../../store/profile';
import { hidePost } from '../../store/modal'
import { getOnePost, likePost, unLikePost, createComment, deleteMyComment } from '../../store/feed';
import '../Feed/Feed.css'

function ProfilePostModal({ postId }) {
  const dispatch = useDispatch();
  let { name } = useParams();
  const [comment, setComment] = useState();
  const posts = useSelector(state => state?.profileReducer?.userDict?.posts);
  const postUsername = useSelector(state => state?.profileReducer?.userDict.username)
  const profile = useSelector(state => state.profileReducer);
  const userId = useSelector(state => state?.session?.user?.id);
  const username = useSelector(state => state.session.user.username)
  const followersObj = profile.followers
  const followingObj = profile.following
  var confirm;
  async function like(userId, postId) {
    await dispatch(likePost(userId, postId))
    dispatch(getOnePost(postId))
    dispatch(profileInfo(name, followersObj, followingObj))
  }

  async function deleteComment(commentId) {
    await dispatch(deleteMyComment(commentId))
    dispatch(getOnePost(postId))
  }
  async function deleteUserPost(postId) {
    var r = window.confirm('Are you sure you want to delete your post?')
    if(r === true) {
      confirm = true;
    }
    if(confirm === true) {
      await dispatch(deletePost(postId))
    dispatch(hidePost(postId))
    dispatch(profileInfo(name, followersObj, followingObj))
    }
    else {
      dispatch(hidePost(postId))
    dispatch(profileInfo(name, followersObj, followingObj))
    }
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
    dispatch(profileInfo(name, followersObj, followingObj))
  };


  const correctPost = (postId) => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === postId) {
        return posts[i]
      }
    }
  }

  function myComment(commentUserId, commentId) {
    if(userId === commentUserId) {
      return (
        <div>
          <button className='fas fa-trash profileDelete' onClick={() => deleteComment(commentId)}></button>
        </div>
      )
    }
  }

  function myPost(username) {
    if(username === postUsername) {
      return (
        <button className='fas fa-trash postDelete' onClick={() => deleteUserPost(postId)}></button>
      )
    }
  }

  const postComment = async (e) => {
    e.preventDefault();
    await dispatch(createComment(postId, comment))
    dispatch(getOnePost(postId))
    setComment('');
    dispatch(profileInfo(name, followersObj, followingObj))
  }

  return (
    <div className='modalContainer'>
      <img className='postModalImages' src={correctPost(postId)?.imageUrl}></img>
      <div className='modalUserName'>
        <Link to={`/${profile.userDict.username}`} className='far fa-user-circle  modalUserNameText'>&nbsp;&nbsp;&nbsp;&nbsp;{profile.userDict.username}</Link>
        <div className='modalCaption'>{correctPost(postId)?.caption}</div>
        {myPost(username)}
        <div className='line'></div>
        <div className='modalCommentsContainer'>
          {correctPost(postId)?.comments.map((comment) => (
            <div>
              <Link className='far fa-user-circle modalCommentUser' to={`/${comment.userId.username}`}>&nbsp;&nbsp;&nbsp;&nbsp;{comment.userId.username}</Link>
              <div key={comment.id} className='modalComments'>{comment.body}</div>
              {myComment(comment?.userId?.id,comment?.id)}
            </div>
          ))}
        </div>
        <div className='line'></div>
        <div className='modalLikes'>
          {likeCheck(correctPost(postId).likes, postId, userId)}
          &nbsp;&nbsp;&nbsp;&nbsp;liked by {correctPost(postId)?.likes?.length} users
        </div>
        <form onSubmit={postComment}>
          <div className='modalCommentBar'>
            <input
              placeholder='add a comment...'
              className='modalCommentInput'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></input>
            <button className='submitBtn' type="submit">Comment</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default ProfilePostModal;
