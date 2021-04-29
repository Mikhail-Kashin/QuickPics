import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { feedInfo } from '../../store/feed';


function Feed(){
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feedReducer);
  console.log("--------->feedcomponent", feed)

  useEffect(() => {
    (async () => {
      await dispatch(feedInfo())
    })();
  }, [dispatch]);

  return (
    <div>
      <h1>HELLO BROSEPH</h1>
    </div>
  )
}

export default Feed;
