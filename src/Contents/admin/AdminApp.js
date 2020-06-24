import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AdminHome from './AdminHome';
import CreateUser from './CreateUser';
import CreateProject from './CreateProject';
import CreateNotice from './CreateNotice';
import CreateEvent from './CreateEvent';
import CreateAchievement from './CreateAchievement';
import CreateAward from './CreateAward';
import Home from '../../Home';



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin/home" component={AdminHome} />
        <Route exact path="/create/user" component={CreateUser} />
        <Route exact path="/create/project" component={CreateProject} />
        <Route exact path="/create/notice" component={CreateNotice} />
        <Route exact path="/create/event" component={CreateEvent} />
        <Route exact path="/create/achievement" component={CreateAchievement} />
        <Route exact path="/create/award" component={CreateAward} />
        <Route path="/home" component={Home} />
        <Redirect to="/admin/home"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
