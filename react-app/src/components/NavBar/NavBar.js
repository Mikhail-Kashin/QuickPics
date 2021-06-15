import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import pic from '../../images/QuickPics.png'



const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const [searchTerm, setSearchTerm] = useState('none');
  const history = useHistory();

  const handleSubmit = async (e) => {
    history.push(`/users/search/${searchTerm}`)
  }


  return (
    <nav>
      <form className="searchBarNav" onSubmit={handleSubmit}>
        <input type='input' placeholder='Search for a user'  onChange={event => {setSearchTerm(event.target.value)}}></input>
        <button type='submit' className='fas fa-search navSearchButton'></button>
      </form>
      <div>
        <NavLink to="/">
          <img className="siteTitle" src={pic} ></img>
        </NavLink>
      </div>
      <ul className='nav'>
        <div>
          <NavLink to="/about" className="far fa-address-card icon" exact={true} activeClassName="active" >
          </NavLink>
        </div>
        <div>
          <NavLink to="/" className="fas fa-home icon" exact={true} activeClassName="active">
          </NavLink>
        </div>
        <div>
          <NavLink to="/upload" className="far fa-plus-square icon" exact={true} activeClassName="active">
          </NavLink>
        </div>
          <NavLink to={`/${user.username}`} className='fas fa-user-circle icon' exact={true} activeClassName="active">
          </NavLink>
        <div className='icon'>
          <LogoutButton/>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
