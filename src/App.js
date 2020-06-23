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

class App extends React.Component {

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/Home" component={Home} />
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
            <Redirect to="/home"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;



