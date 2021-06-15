import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom";
import { userInfo } from "../../store/search"
import './search.css'

function Search() {
  const dispatch = useDispatch();
  let { userName } = useParams();
  const usersArr = useSelector(state => state.searchReducer.users);


  useEffect(() => {
    (async () => {
      await dispatch(userInfo())
    })();
  }, [dispatch]);


  return (
    <div className="searchPageContainer">
      {usersArr?.length ? usersArr.filter((val) => {
        if (userName === "") {
          return val
        }
        else if (val.username.toLowerCase().includes(userName.toLowerCase())) {
          return val
        }
      }).map((user, i) => {
        return (
          <div className="profileLinkDiv" key={i}>
            <Link className='fas fa-user-circle userProfileLinks' to={`/${user.username}`}>
              &nbsp;&nbsp;{user.username}
            </Link>
          </div>
        )
      })
        : null
      }

    </div>
  )




}

export default Search;
