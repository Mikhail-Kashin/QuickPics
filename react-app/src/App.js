import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/User/UsersList";
import User from "./components/User/User";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
import UploadPicture from "./components/upload/upload-img";
import Profile from "./components/Profile/Profile"
import Feed from  './components/Feed/Feed';


function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path='/upload' exact={true}>
          <UploadPicture />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <NavBar />
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/:name' exact={true}>
          <NavBar />
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true}>
          <NavBar />
          <Feed />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
