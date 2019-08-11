import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import About from './pages/about';

import ProjectsIndex from './projects/index';
import ProjectsNew from './projects/new';
import ProjectsShow from './projects/show';
import ProjectsRefreshTeamwork from './projects/refreshTeamwork';
import ProjectsEdit from './projects/edit';
import ProjectsDestroy from './projects/destroy';

// Users
import UsersIndex from './users/index';
import UsersNew from './users/new';
import UsersShow from './users/show';
import UsersRefreshTeamwork from './users/refreshTeamwork';
import UsersEdit from './users/edit';
import UsersDestroy from './users/destroy';

import Register from './sessions/register';
import Login from './sessions/login';
import Logout from './sessions/logout';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/about" component={ About } />
      <Route exact path="/projects" component={ ProjectsIndex } />
      <Route exact path="/projects/new" component={ ProjectsNew } />
      <Route exact path="/projects/refreshTeamwork" component={ ProjectsRefreshTeamwork } />
      <Route exact path="/projects/:id" component={ ProjectsShow } />
      <Route exact path="/projects/:id/edit" component={ ProjectsEdit } />
      <Route exact path="/projects/:id/refreshTeamwork" component={ ProjectsRefreshTeamwork } />
      <Route exact path="/projects/:id/destroy" component={ ProjectsDestroy } />
      <Route exact path="/users" component={ UsersIndex } />
      <Route exact path="/users/refreshTeamwork" component={ UsersRefreshTeamwork } />
      <Route exact path="/users/new" component={ UsersNew } />
      <Route exact path="/users/:id" component={ UsersShow } />
      <Route exact path="/users/:id/edit" component={ UsersEdit } />
      <Route exact path="/users/:id/refreshTeamwork" component={ UsersRefreshTeamwork } />
      <Route exact path="/users/:id/destroy" component={ UsersDestroy } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/logout" component={ Logout } />
      <Route exact path="/login" component={ Login } />
    </Switch>
  )
}

export default Routes;