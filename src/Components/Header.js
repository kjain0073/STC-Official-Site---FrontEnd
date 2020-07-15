import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Header extends React.Component{

	
	render(){
		return(
			<div className="Header">
				  <nav className="display--flex col-sm-12">
				      <div className="nav__head display--flex background--primary horizontal-align--center vertical-align--center">
				        <Link to="/home" className="stc-icon" ><img src={process.env.PUBLIC_URL + '/images/logo.png'} className="nav__logo" alt="stcOfficalLogo" /></Link>
				      </div>
				      <Link to="/notices" className="nav__element display--flex vertical-align--center horizontal-align--center" id="notices"> <h3> NOTICES </h3> </Link>
				      <Link to="/achievements" className="nav__element display--flex vertical-align--center horizontal-align--center" id="achievements"> <h3> ACHIEVEMENTS </h3> </Link>
				      <Link to="/projects/all" className="nav__element display--flex vertical-align--center horizontal-align--center" id="projects"> <h3> PROJECTS </h3> </Link>
				      <Link to="/calendar" className="nav__element display--flex vertical-align--center horizontal-align--center" id="event-calendar"> <h3> EVENT CALENDAR </h3> </Link>
				      <Link to="/groups/all/" className="nav__element display--flex vertical-align--center horizontal-align--center" id="groups"> <h3> GROUPS </h3> </Link>
				      <Link to="/equipments" className="nav__element display--flex vertical-align--center horizontal-align--center" id="equipments"> <h3> EQUIPMENT </h3> </Link>
				      <Link to="/admin/home" className="nav__element display--flex vertical-align--center horizontal-align--center" id="admin"> <h3> ADMIN </h3> </Link>
				  </nav>
			</div>
			);
	}
}

export default Header;