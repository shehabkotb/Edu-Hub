import React from 'react';
// import './App.css';
import { Route, Switch } from "react-router-dom";
import SignUp from '../SignUp/SignUp'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import NotFounded from '../NotFounded/NotFounded'
const App = ()=> {
  return (
    <div className="App">
      <Switch>
        {/* Adding Route Of Register */}
        <Route path="/Register" 
         render={() => (
          <SignUp />
        )}
        />

        {/* Adding Route Of Login */}
        <Route path="/Login" 
         render={() => (
          <Login />
        )}
        />

        {/* Adding Route Of Profile */}
        <Route path="/Profile" 
         render={() => (
          <Profile />
        )}
        />
        
        {/* Adding Route Of 404 */}
        <Route path="/*" 
         render={() => (
          <NotFounded />
        )}
        />
      </Switch>
    </div>
  );
}

export default App;
