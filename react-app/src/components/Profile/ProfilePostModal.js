import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { profileInfo } from '../../store/profile';
import { getOnePost, likePost, unLikePost } from '../../store/feed';
import '../Feed/Feed.css'

function ProfilePostModal({ postId }) {
  const dispatch = useDispatch();
  let { name } = useParams();
  const posts = useSelector(state => state?.profileReducer?.userDict?.posts);
  const profile = useSelector(state => state.profileReducer);
  const userId = useSelector(state => state?.session?.user?.id);
  const followersObj = profile.followers
  const followingObj = profile.following

  async function like(userId, postId) {
    await dispatch(likePost(userId, postId))
    dispatch(getOnePost(postId))
    dispatch(profileInfo(name, followersObj, followingObj))
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
    dispatch(getOnePost( postId ))
    dispatch(profileInfo(name, followersObj, followingObj))
  };


  const correctPost = (postId)  => {
    for(let i = 0; i < posts.length; i++) {
      if(posts[i].id === postId ) {
        return posts[i]
      }
    }
  }

  return (
    <div className='modalContainer'>
      <img className='postModalImages'src={correctPost(postId)?.imageUrl}></img>
      <div className='modalUserName'>
        <Link to={`/${profile.username}`} className='far fa-user-circle  modalUserNameText'>&nbsp;&nbsp;&nbsp;&nbsp;{profile.username}</Link>
        <div className='modalCaption'>{correctPost(postId)?.caption}</div>
        <div className='line'></div>
        <div className='modalCommentsContainer'>
          {correctPost(postId)?.comments.map((comment) => (
            <div>
              <Link className='far fa-user-circle modalCommentUser' to={`/${comment.userId.username}`}>&nbsp;&nbsp;&nbsp;&nbsp;{comment.userId.username}</Link>
              <div key={comment.id} className='modalComments'>{comment.body}</div>
            </div>
        ))}
        </div>
        <div className='line'></div>
        <div className='modalLikes'>
          {likeCheck(correctPost(postId).likes, postId, userId)}
          &nbsp;&nbsp;&nbsp;&nbsp;liked by {correctPost(postId)?.likes?.length} users
        </div>
        <div className='modalCommentBar'>
          <input placeholder='add a comment...' className='modalCommentInput'></input>
        </div>
      </div>

    </div>
  )
}

export default ProfilePostModal;
