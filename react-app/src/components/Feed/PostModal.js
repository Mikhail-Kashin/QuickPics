import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOnePost } from '../../store/feed';
import './Feed.css'

function PostModal({ postId }) {
  const dispatch = useDispatch();
  const post = useSelector(state => state.feedReducer?.selectedPost?.currentPost);
  console.log(post);

  if (!post) return null;

  return (
    <div className='modalContainer'>
      <img className='postModalImages'src={post?.imageUrl}></img>
      <div className='modalUserName'>
        <Link to={`/${post?.user?.username}`} className='far fa-user-circle  modalUserNameText'>&nbsp;&nbsp;&nbsp;&nbsp;{post?.user.username}</Link>
        <div className='modalCaption'>{post?.caption}</div>
        <div className='line'></div>
        <div className='modalCommentsContainer'>
          {post?.comments.map((comment) => (
            <div>
              <Link className='far fa-user-circle modalCommentUser' to={`/${comment.userId.username}`}>&nbsp;&nbsp;&nbsp;&nbsp;{comment.userId.username}</Link>
              <div key={comment.id} className='modalComments'>{comment.body}</div>
            </div>
        ))}
        </div>
        <div className='modalCommentBar'>
          <input placeholder='add a comment...' className='modalCommentInput'></input>
        </div>
      </div>

    </div>
  )
}

export default PostModal;
