import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePost } from '../../store/feed';

function PostModal({ postId }) {
  // const post = useSelector(state => state.post)
  console.log(postId, '-----');
  const dispatch = useDispatch();
  // let id = useParams();
  const post = useSelector(state => state.feedReducer?.currentPost);
  console.log(post);

  useEffect(() => {
    (async () => {
      await dispatch(getOnePost(postId));
    })()
  }, [dispatch])

  return (
    <>
      <div>{post?.user.username}</div>
      <img src={post?.imageUrl}></img>
      <div>{post?.caption}</div>
      {post?.comments.map((comment) => (
        <div key={comment.id}>{comment.body}</div>
      ))}
    </>
  )
}

export default PostModal;