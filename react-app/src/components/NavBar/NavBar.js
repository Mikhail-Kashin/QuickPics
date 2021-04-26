import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import pic from '../../images/QuickPics.png'


const NavBar = () => {
  // const sessionUser = useSelector(state => {
  //   state.session.user
  // })
  return (
    <nav>
      <ul className='nav'>
        <div>
          <img className="siteTitle" src={pic} ></img>
        </div>
        <div>
          <i className="fas fa-search"></i>
        </div>
        <div>
          <NavLink to="/" className="fas fa-home icon" exact={true} activeClassName="active">
          </NavLink>
        </div>
        {/* <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li> */}
        <div>
          <NavLink to='/username' className='icon' exact={true} activeClassName="active">
            Profile
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
