 /* eslint-disable */ 
import React from 'react';
import '../../App.css';
import Header from '../../Components/Header.js';
import Footer from '../../Components/Footer.js';
import $ from 'jquery';
import {Helmet} from "react-helmet";

class Projects extends React.Component{
	componentDidMount = () => {
		$(document).ready(function() {
		var url = document.location.pathname; 
		var path = url.split('/')[2];

		// array of all open_project tags
		var open_projects = ["open-project-1"];

		function matchProject(path){
			var found = 0;
			for(var index in open_projects){
				if (open_projects[index] === path){
					found =	1; 
					var tempURL = '/open_projects/'+ open_projects[index]; 
					updateProject(path);
					break;
				}
			}

			if(found === 0){
				var randomIndex = Math.floor(Math.random()	* open_projects.length);
				window.history.replaceState(null,null,open_projects[randomIndex]);
				matchProject(open_projects[randomIndex]);
			}
		}

		function updateProject(path){
			open_projects.forEach(function(open_project,index){
				if(open_project !== path){
					var openProjectContainer = document.getElementById(open_project);
					openProjectContainer.classList.add('invisible')
				}		
			});
			var currentProject = document.getElementById(path);
			currentProject.classList.remove('invisible');
			currentProject.classList.add('visible');
		}

		// next and previous handling

		$('.next').click(function(e){
			e.preventDefault();

			var currentPath = document.location.pathname.split('/')[2];
			for(var index in open_projects){
				if(open_projects[index] === currentPath){
					var nextIndex = (parseInt(index)+1)%open_projects.length;
					window.history.pushState(null,null,open_projects[nextIndex]);
					matchProject(open_projects[nextIndex]);
					break;
				}
			}
		});

		$('.previous').click(function(e){
			e.preventDefault();

			var currentPath = document.location.pathname.split('/')[2];
			for(var index in open_projects){
				if(open_projects[index] === currentPath){
					var tempIndex = parseInt(index)-1;
					var nextIndex = (tempIndex!==-1)?tempIndex:open_projects.length-1;
					window.history.pushState(null,null,open_projects[nextIndex]);
					matchProject(open_projects[nextIndex]);
					break;
				}
		}
	});

	// handling changes in states 

	window.onpopstate = function(){
		updateProject(document.location.pathname.split('/')[2]);
	}

	matchProject(path);
	});

	}	

	render(){
		return(
				<div className="AllProjects">
					<Helmet>
			            <link rel="canonical" href="http://yourdomain.com/projects/"/>
			        </Helmet>
					<Header />
					<div className="wrapper--open-projects">
						
						<div className="open-project position--fixed" id="open-project-1">
							<div className="open-project-front display--flex horizontal-align--center vertical-align--center">
								<div className="op-front__left display--flex vertical-align--center horizontal-align--center flex-direction-colum">
									<div className="op-project__info">
										<div className="op-front__paginate">
											<h2> 
												1	of 1
												<a href="#" className="previous"> &lt; </a>
												<a href="#" className="next"> &gt; </a>
											</h2>
										</div>
										<div className="op-front__head">
											<h1> Open Project </h1> 
											<div className="op-front__sub-head">
												<h2> Open for all </h2>
											</div>	
										</div>
										<div className="op-front__content">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, magni accusamus iste officiis repellat accusantium natus voluptate, doloremque molestiae minima. Quos ex molestiae quae
										</div>			
										<div className="op-front__know-more">
											<a href="#">
												<h2> To know more </h2>
											</a>	
										</div>	
									</div>
								</div>
								<div className="op-front__image">
									<img  src={process.env.PUBLIC_URL + "/images/demo_project.jpg"}/> 
								</div>
							</div>
						</div>

					</div>
					<Footer/>
				</div>
			);
	}
}
export default Projects;