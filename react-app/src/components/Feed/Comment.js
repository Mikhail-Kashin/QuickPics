import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { feedInfo, uploadComment } from '../../store/feed';

function Comment(postId) {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feedReducer);
  const [comment, setComment] = useState('');
  const userId = useSelector(state => state.session.user.id);


  const createComment = (e, comment) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("comment", comment);
    dispatch(uploadComment(formData, postId));
    dispatch(feedInfo());
  }

  return (
    <>
      <div>
        <form onSubmit={createComment()}>
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </>
  )
}

export default Comment;