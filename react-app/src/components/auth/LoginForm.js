import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import './loginform.css'

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <main>
      <div className="login">
        <div className="head">
          <h1 className="logo1">QuickPics</h1>
          <button><a href='//facebook.com'><i className="fab fa-facebook-square" />Log in with Facebook</a></button>
          <div>
            <hr />
            <p>OR</p>
            <hr />
          </div>
        </div>
        <div className="contain">
          <form onSubmit={onLogin}>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}/>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}/>

            <button type="submit">Login</button>
                <div>
                  {errors.map((error) => (
                    <div>{error}</div>
                  ))}
                </div>
          </form>
              <div className="not">
                <p>Not a QuickPics member? <NavLink to='/sign-up'>Sign up here</NavLink></p>
              </div>
      </div>
      </div>
    </main>
  );
};

export default LoginForm;
