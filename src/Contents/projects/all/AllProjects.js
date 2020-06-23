import React from 'react';
import '../../../App.css';
import Header from '../../../Components/Header.js';
import Footer from '../../../Components/Footer.js';
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';

class AllProjects extends React.Component{
	render(){
		return(
				<div className="AllProjects">
					<Helmet>
			            <link rel="canonical" href="http://yourdomain.com/projects/all/"/>
			        </Helmet>
					<Header />
					<div className="wrapper--projects display--flex horizontal-align--center flex-direction-column vertical-align--center">
						<div className="projects__head h2--large">
							Lorem ipsum dolor sit amet, consecte adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. lorem ipsum dolor simit amet conscete 
						</div>
							
						<div className="wrapper--project__card display--flex">
						
									<div className="project__card">
										<div className="project__head h1--smaller">
											OPEN PROJECT
										</div>
										<div className="project__content"> Open for all </div>
										<div className="wrapper--projects__link">
											<div className="project__link--border"> </div>
											<Link to="/projects/open-project-1" className="project__link h2--large display--block" >
												VIEW DETAILS
											</Link>
										</div>
									</div>

						</div>
					</div>
					<Footer/>
				</div>
			);
	}
}
export default AllProjects;