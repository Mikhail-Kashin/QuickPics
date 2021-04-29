import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import pic from '../../images/QuickPics.png'
import { profileInfo } from '../../store/profile'


const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <div>
        <NavLink to="/">
          <img className="siteTitle" src={pic} ></img>
        </NavLink>
      </div>
      <ul className='nav'>
        {/* <div>
          <i className="fas fa-search"></i>
        </div> */}
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
