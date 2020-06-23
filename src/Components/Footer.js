 /* eslint-disable */ 
import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Footer extends React.Component{
	render(){
		return(
				<div className="Footer">
					  <footer className="background--primary position--fixed display--flex vertical-align--center horizontal-align--center">
					        <Link to="/about" className="footer__head display__flex vertical-align--center horizontal-align--center">
						        <h3> ABOUT STC </h3>
					        </Link>
					        <a href="https://www.facebook.com/stciitr" className="footer__link"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a>
						    <a href="#" className="footer__link"><i className="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
					  </footer>
				</div>
	
			);
	}
}

export default Footer;

	
