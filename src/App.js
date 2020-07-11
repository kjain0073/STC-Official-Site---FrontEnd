import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import About from './Contents/about/About.js';
import Home from './Home';
import Notices from './Contents/notices/Notices';
import Achievements from './Contents/achievements/Achievements';
import AllProjects from './Contents/projects/all/AllProjects';
import Calendar from './Contents/calendar/Calendar';
import AllGroups from './Contents/groups/all/AllGroups';
import Equipment  from './Contents/equipments/Equipment';
import Projects from './Contents/projects/Projects';
import Groups from './Contents/groups/Groups2';
import CreateGroup from './Contents/admin/CreateGroup';
import CreateProject from './Contents/admin/CreateProject';
import CreateNotice from './Contents/admin/CreateNotice';
import CreateEvent from './Contents/admin/CreateEvent';
import CreateAchievement from './Contents/admin/CreateAchievement';
import CreateAward from './Contents/admin/CreateAward';
import AdminHome from './Contents/admin/AdminHome';

class App extends React.Component {

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/notices" component={Notices} />
            <Route exact path="/achievements" component={Achievements} />
            <Route exact path="/groups/all" component={AllGroups} />
            <Route exact path="/projects/all" component={AllProjects} />
            <Route exact path="/equipments" component={Equipment} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/projects/open-project-1" component={Projects} />
            <Route exact path="/groups/enactus" component={Groups} />
            <Route exact path="/groups/aries" component={Groups} />
            <Route exact path="/groups/motorsport" component={Groups} />
            <Route exact path="/groups/tinkeringlab" component={Groups} />
            <Route exact path="/groups/asme" component={Groups} />
            <Route exact path="/groups/dc" component={Groups} />
            <Route exact path="/groups/edc" component={Groups} />
            <Route exact path="/groups/mars" component={Groups} />
            <Route exact path="/groups/mdg" component={Groups} />
            <Route exact path="/groups/robocon" component={Groups} />
            <Route exact path="/groups/sds" component={Groups} />
            <Route exact path="/groups/share" component={Groups} />
            <Route exact path="/groups/teamknox" component={Groups} />
            <Route exact path="/groups/igu" component={Groups} />
            <Route exact path="/groups/sae" component={Groups} />
            <Route exact path="/groups/acm" component={Groups} />
            <Route exact path="/groups/cec" component={Groups} />
            <Route exact path="/groups/miess" component={Groups} />
            <Route exact path="/admin/home" component={AdminHome} />
            <Route exact path="/admin/create/group" component={CreateGroup} />
            <Route exact path="/admin/create/project" component={CreateProject} />
            <Route exact path="/admin/create/notice" component={CreateNotice} />
            <Route exact path="/admin/create/event" component={CreateEvent} />
            <Route exact path="/admin/create/achievement" component={CreateAchievement} />
            <Route exact path="/admin/create/award" component={CreateAward} />
            <Route path="/home" component={Home} />
            <Redirect to="/home"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;



