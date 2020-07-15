 /* eslint-disable */ 
import React from 'react';
import '../../App.css';
import Header from '../../Components/Header.js';
import MobileHeader from '../../Components/MobileHeader.js';
import Footer from '../../Components/Footer.js';
import $ from 'jquery';
import {Helmet} from "react-helmet";

class Projects extends React.Component{
	isMobile(){
     let check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	  return check;
	  }	

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
			        {
			        	this.isMobile()===true
			        	?<div>
				        	<MobileHeader/>
				        	<div className="wrapper--open-projects">
						
								<div className="open-project position--fixed" id="open-project-1">
									<div className="open-project-front display--flex horizontal-align--center vertical-align--center">
										<div className="op-front__left display--flex vertical-align--center horizontal-align--center flex-direction-colum">
											<div className="mobile-op-project__info">
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
												<div className="mobile-op-front__content">
													Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, magni accusamus iste officiis repellat accusantium natus voluptate, doloremque molestiae minima. Quos ex molestiae quae
												</div>			
												<div className="op-front__know-more">
													<a href="#">
														<h2> To know more </h2>
													</a>	
												</div>	
											</div>
										</div>
										<div className="mobile-op-front__image">
											<img  src={process.env.PUBLIC_URL + "/images/demo_project.jpg"}/> 
										</div>
									</div>
								</div>

							</div>
			        	</div>
			        	:<div>
			        		<Header/>
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
			        	</div>
			        }
					
					<Footer/>
				</div>
			);
	}
}
export default Projects;