import React from 'react';
import { NavLink } from 'react-router-dom';

function MainNav(){
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Project Report Dashboard</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><NavLink activeClassName="active" exact className="nav-link" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink activeClassName="active" exact className="nav-link" to="/about">About</NavLink></li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Projects</a>
            
            <div className="dropdown-menu">
              <NavLink activeClassName="active" exact className="dropdown-item" to="/projects">Projects</NavLink>
              <NavLink activeClassName="active" exact className="dropdown-item" to="/projects/new">New Project</NavLink>
              <div className="dropdown-divider" ></div>
              <NavLink activeClassName="active" exact className="dropdown-item" to="/projects/refreshTeamwork">Refresh Teamwork Projects</NavLink>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Users</a>
            
            <div className="dropdown-menu">
              <NavLink activeClassName="active" exact className="dropdown-item" to="/users">Users</NavLink>
              <NavLink activeClassName="active" exact className="dropdown-item" to="/users/new">New User</NavLink>
              <div className="dropdown-divider" ></div>
              <NavLink activeClassName="active" exact className="dropdown-item" to="/users/refreshTeamwork">Refresh Teamwork Users</NavLink>
            </div>
          </li>

          <li className="nav-item"><NavLink activeClassName="active" exact className="nav-link" to="/login">Login</NavLink></li>
          <li className="nav-item"><NavLink activeClassName="active" exact className="nav-link" to="/register">Register</NavLink></li>
          <li className="nav-item"><NavLink activeClassName="active" exact className="nav-link" to="/logout">Logout</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default MainNav;