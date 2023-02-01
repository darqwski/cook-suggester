import React from "react";
import { useApplicationContext } from "../../context/application-context-manager/ApplicationContextManager.context";

const NavigationBar = () => {
  const { user } = useApplicationContext();
  const isLogged = !!user
  console.log(user)
  return <nav className="navigation-container">
    <div>

    </div>
    <div>

    </div>
    <div className="navigation__user-info">
      {isLogged ? (<p>
        <i className="material-icons">user</i>
        <span>{user.userLogin}</span>
      </p>) : <a href="/login">Log in</a> }
    </div>
  </nav>;
};

export default NavigationBar;
