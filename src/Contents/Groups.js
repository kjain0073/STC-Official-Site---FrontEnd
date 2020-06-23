import React from 'react';
import '../App.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import $ from 'jquery';
import {Helmet} from "react-helmet"; 
import demoImg from './images/demo_project.jpg';

class Groups extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount= () =>{
		$(document).ready(function() {

	var lastScrollTop = $(window).scrollTop();

	var padding = $('.g-project-head').css('padding-top');
	 padding = parseInt(padding.replace('px',''));
	var group_full_ofset = $(".group-full").offset().top - padding;


	$(".scroll-down").click(() => scroll_to_head(true));

	if( $(window).scrollTop()===0){
		$('.scroll-down').removeClass("hidden-arrow");
	}

	$(window).scroll(() => scroll_to_head(false));
	$(window).scroll(() => {
		if ($(window).scrollTop() === 0){
			$('.scroll-down').removeClass('hidden-arrow');
		}
	});

	var scroll_to_head = function(clicked){
		 var st = $(window).scrollTop();
		if(lastScrollTop === 0)
		{
			if(st > lastScrollTop || clicked === true)
			{
				$('.scroll-down').addClass('hidden-arrow');
				$("html, body").animate({ scrollTop: group_full_ofset},1000,'swing');
			}
		}
		lastScrollTop = st;
	}

	/* GROUP CYCLE HANDLING */

	var url = document.location.pathname; 
	var path = url.split('/')[2];

	// array of all group tags
	var council_groups = ["aries","enactus","motorsport","paac","tinkeringlab","asme","ds","edc","mars","mdg","robocon","sds","share","teamknox"];
	var departmental_groups = ["igu","sae","acm","cec","mech"];

	// setting the groups lengths in individual places

	$('.group-count--council').html(council_groups.length)
	$('.group-count--departmental').html(departmental_groups.length)

	function matchGroup(path, groups){
		var found = 0;
		for(var index in groups){
			if (groups[index] === path){
				found =	1; 
				var tempURL = '/groups/'+ groups[index]; 
				// if( tempURL != document.location.pathname){ 
				// 	window.history.pushState(null,null,groups[index]);
				// }
				updateGroup(path, groups);
				break;
			}
		}

		if(found === 0){
			var randomIndex = Math.floor(Math.random()	* groups.length);
			window.history.replaceState(null,null,groups[randomIndex]);
			matchGroup(groups[randomIndex], groups);
		}
	}

	function updateGroup(path, groups){
		var all_groups = council_groups.concat(departmental_groups);
		all_groups.forEach(function(group,index){
			if(group !== path){
				var groupContainer = document.getElementById(group);
				groupContainer.classList.add('invisible')
			}		
		});
		var currentGroup = document.getElementById(path);
		currentGroup.classList.remove('invisible');
		currentGroup.classList.add('visible');
	}

	// next and previous handling

	$('.next').click(function(e){
		e.preventDefault();

		var currentPath = document.location.pathname.split('/')[2];
		var groups = council_groups.includes(currentPath) ? council_groups : departmental_groups;

		for( var index in groups){
			if(groups[index] === currentPath){
				var nextIndex = (parseInt(index)+1)%groups.length;
				window.history.pushState(null,null,groups[nextIndex]);
				matchGroup(groups[nextIndex], groups);
				break;
			}
		}
	});

	$('.previous').click(function(e){
		e.preventDefault();

		var currentPath = document.location.pathname.split('/')[2];
		var groups = council_groups.includes(currentPath) ? council_groups : departmental_groups;

		for(var index in groups){
			if(groups[index] === currentPath){
				var tempIndex = parseInt(index)-1;
				var nextIndex = (tempIndex!==-1)?tempIndex:groups.length-1;
				window.history.pushState(null,null,groups[nextIndex]);
				matchGroup(groups[nextIndex], groups);
				break;
			}
		}
	});

	var params = (new URL(document.location)).searchParams;
	var type = params.get('type');

	// handling changes in states 
	window.onpopstate = function(){
		// reload on pop state
		var new_path = document.location.pathname.split('/')[2];
		
		if (council_groups.includes(new_path))
			updateGroup(new_path, council_groups);
		else
			updateGroup(new_path, departmental_groups);
	}

	if (council_groups.includes(path))
		matchGroup(path, council_groups);
	else
		matchGroup(path, departmental_groups);
	});

	}

	render(){
		return(
			<div className="Groups">
				<Helmet>
		           <link rel="canonical" href="http://yourdomain.com/groups/"/>
		        </Helmet>
				<Header/>
					<div className="wrapper--group">

	

					<div className="g-aries g-group g-group--council" id="aries">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 1 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> ArIES</h1>
										<div className="front__sub-head">
											<h2> Go prototyping </h2>
										</div>
									</div>
									<div className="front__content">
										<p>Artificial Intelligence and Electronics Society (ArIES) is an open campus group of IIT Roorkee with the mission to solve impactful problems with Artificial Intelligence and Electronics. <br /></p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Vaibhav Garg
										</div>
										<div className="front__contact--info">
											 9557919720
										</div>
										<div className="front__contact--links"> 
											
											<a href="https://www.facebook.com/ariesiitr/"> <i className="fa fa-facebook"> </i> </a>
											
											
											<a href="https://www.facebook.com/ariesiitr/"> <i className="fa fa-twitter"> </i> </a>
											
											
											
											
											<a href="http://ariesiitr.com/"> <i className="fa fa-window-maximize"> </i> </a>
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/aries.jpg"/>
							</div>
						</div>

						

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
						
						
							
						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Bomb Defusal Bot
										</div>
										<div className="g-card__content h3--small">
											<p>To reduce the effort and danger for the armymen. It was meant to go to places to diffuse the bomb by replicating the hand movements of the driver.</p>

										</div>
										
									</div>
								</div>
									
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Cleaning Bot
										</div>
										<div className="g-card__content h3--small">
											<p>an autonomous bot that cleans floor</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Drone Light Show
										</div>
										<div className="g-card__content h3--small">
											<p>Used an autonomous quadcopter in InterIIT Tech meet 2018.  Programmed to detect a straight yellow line and follow it autonomously maintaining a fixed height.</p>

										</div>
										
									</div>
								</div>
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Gaze Player
										</div>
										<div className="g-card__content h3--small">
											<p>An interactive video player.  Can play or pause videos with hand gestures</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Handwriting Bot
										</div>
										<div className="g-card__content h3--small">
											<p>A bot that can write and mimic any person’s handwriting. We used the concept of OCR to recognise handwriting of a person.</p>

										</div>
										
									</div>
								</div>
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Maze solving Bot
										</div>
										<div className="g-card__content h3--small">
											<p>First it will perform dry run and then solve the maze by shortest path.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											MicroController based Quadcopter
										</div>
										<div className="g-card__content h3--small">
											<p>The project was started with a vision of fabricating a flight controller designed on our own using the most widely used microcontroller ‘Arduino</p>

										</div>
										
									</div>
								</div>
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Safety Band
										</div>
										<div className="g-card__content h3--small">
											<p>A safety-band in order to share your location with a link to google map with your guardians in case of trouble.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							

								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Text to narrate
										</div>
										<div className="g-card__content h3--small">
											<p>App which takes any text exerpt as input and shows the narrated film of that text with relevant images.</p>

										</div>
										
									</div>
								</div>
									
									</div>
						</div>	
						
							
								<div className="g-equipment-head">
									EQUIPMENT
								</div>
								
								<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
									<div className="equipment__list">	
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Nvidia 1080 Ti </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Nvidia 1060 </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Raspberry Pi </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Kinect </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> PixHawk </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> EEG HEadset </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Drones </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Projector and Projector Screen </span> 
										</div>
									
									</div>
								</div>
							

							
								
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									The recruitment for the group is held post Srishti based on one's involvement in the project, dedication and the initiatives took to complete the project during Srishti.<br/> There are no prerequisites. 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					<div className="g-enactus g-group g-group--council" id="enactus">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 2 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> Enactus IIT Roorkee</h1>
										<div className="front__sub-head">
											<h2>  </h2>
										</div>
									</div>
									<div className="front__content">
										<p>Enactus is an international non-profit organization that believes in investing in students who take ENTrepreneurial ACTion for others to create a better world for US all. Enactus IIT Roorkee aims to further the cause of social entrepreneurship by providing an opportunity to innovative students to collaborate with each other on real-time projects, which would solve societal problems in the long run.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Abhi Gawri
										</div>
										<div className="front__contact--info">
											 7253046261
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/enactusiitroorkee/"> <i className="fa fa-facebook"> </i> </a>
											
											<a href="https: //www.linkedin.com/company/enactusiitroorkee/"> <i className="fa fa-linkedin"> </i> </a>
											
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/enactus.jpg"/>
							</div>
						</div>
	

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
						
						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Divyang - Ek Ummeed
										</div>
										<div className="g-card__content h3--small">
											<p>The mission is currently providing information through a Mobile App about special services and assistance that are available for Divyangjan. In collaboration with  the Government, NGOs and Corporate, it will soon offer facility for skill development and employment.</p>

										</div>
										
									</div>
								</div>
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Kaagaz
										</div>
										<div className="g-card__content h3--small">
											<p>The aim of Kaagaz is to reduce paper wastage by introducing products which can be manufactured from waste and used paper. 
				As a complementary effect of  the initiative, creation of jobs by upcycling paper primarily with production of paper mache products in a sustainable manner will be achieved.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
	
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											SNAP
										</div>
										<div className="g-card__content h3--small">
											<p>SNAP is an optical imaging device, that determines the optimum fertiliser inputs by the hyper-spectral imaging of crop leaves.
				The target is to eliminate the biggest hindrance to the availability of smart soil analysis solutions to the small farmers, i.e the size, cost and complexity of the traditional machines, with a much simpler, smaller and cheaper device</p>

										</div>
										
									</div>
								</div>
							
							
							</div>
						</div>	
						
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									Group discussion shortlisting followed by multiple rounds of interviews <br/> Prerequisites:At Enactus we firmly believe skills can be taught but values can't be. So we keep values, aptitude and skills in that order of priority while recruiting team members. We also have a set of well defined values of our group which is available at our group's facebook page, having an inclination towards group's values certainly helps, so does interest in entrepreneurship. 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					<div className="g-igu g-group g-group--departmental" id="igu">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 1 of <span className="group-count--departmental "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> IIT Roorkee IGU Student Chapter</h1>
										<div className="front__sub-head">
											<h2> Student Chapter </h2>
										</div>
									</div>
									<div className="front__content">
										<p>IGU Student Chapter, IIT Roorkee is a non-profit organisation, which aim towards making coveted efforts to pursue and disseminate Geo-scientific knowledge and activities among the fellow students at the Department of Earth sciences IIT Roorkee.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Vishvendra Singh
										</div>
										<div className="front__contact--info">
											 7455840360
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/iguiitr/"> <i className="fa fa-facebook"> </i> </a>
													
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/igu.jpg"/>
							</div>
						</div>

						

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
							
								
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									Pre-requisites: - Student of GT/GPT only, modest communication and presentation skills.<br/> Recruitment: - 1st Round:  Online Google Form having to submit general information of interest and personal details.<br/> 2nd Round:  Interview.<br/> 3rd Round:  Presentation on different associations of earth sciences across the world. 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					<div className="g-motorsport g-group g-group--council" id="motorsport">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 3 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> IIT Roorkee Motorsports</h1>
										<div className="front__sub-head">
											<h2> Formula Style Electric car developer </h2>
										</div>
									</div>
									<div className="front__content">
										<p>We are a group of interdisciplinary students from IIT Roorkee. We design and build Formula style Electric race cars and participate in national and international Formula student competitions organized by Formula Society of Automotive Engineers (FSAE).
				Our vision is to serve as a breeding ground for India”s finest engineers who shall lead the automotive sector in future.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Harshit Singh
										</div>
										<div className="front__contact--info">
											 8650267812
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/iitrms.in/"> <i className="fa fa-facebook"> </i> </a>	
											
											<a href="https: //www.instagram.com/iitrms/?hl=en"> <i className="fa fa-instagram"> </i> </a>
	
											<a href="https: //www.linkedin.com/company/iitroorkeemotorsports/"> <i className="fa fa-linkedin"> </i> </a>	
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/motorsports.jpg"/>
							</div>
						</div>

						

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
						
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									Recruitment process - Written test followed by a small project followed by interview round.<br/> Prerequisites - Basic 12th class mechanics and enthusiastic mind . 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					<div className="g-paac g-group g-group--council" id="paac">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 4 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> PAAC</h1>
										<div className="front__sub-head">
											<h2> Physics and astronomy club </h2>
										</div>
									</div>
									<div className="front__content">
										<p>A group of Science enthusiasts interested in creating an environment where one can pursue and cherish one’s love for Physics, Astronomy, and Science.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Purushottam Abhisheik
										</div>
										<div className="front__contact--info">
											 8797319775
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/physastroclubiitr"> <i className="fa fa-facebook"> </i> </a>
											
				
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/paac.jpg"/>
							</div>
						</div>

						

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
						
		
						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Near Space Balloon
										</div>
										<div className="g-card__content h3--small">
											<p>These balloons are designed to carry upto 5 pounds of payload and upto 100,000 feet which is equivalent to 30 kms higher. These balloon record their whole path of travelling with pressure, temperature and some more parametersof their environment.</p>

										</div>
										
									</div>
								</div>
									
						
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											CCD Photometry Derotator
										</div>
										<div className="g-card__content h3--small">
											<p>To nullify the effect of field rotation that occurs in Alt-Az mount while tracing any celestial object.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Radio JOVE
										</div>
										<div className="g-card__content h3--small">
											<p>The Radiojove monitors the storms of Jupiter, Solar acivity and the galactic background.</p>

										</div>
										
									</div>
								</div>
									
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Wireless telescope automation
										</div>
										<div className="g-card__content h3--small">
											<p>The Celestron Omni XLT120 is a manually operated telescope. The project emphasizes on complete automation of telescope in an equatorial coordinate system, controlled wirelessly through Laptop or Desktop using Stellarium app.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											GLP Automation
										</div>
										<div className="g-card__content h3--small">
											<p>Green Laser Pointer automation.GLPs are useful on public astronomy nights. The narrow beam from laser pointer can be used to unambiguously point to celsetial objects. The project involves the total automation of the GLPs.</p>

										</div>
										
									</div>
								</div>
									

								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											KURT
										</div>
										<div className="g-card__content h3--small">
											<p>KU band Radio Telescope KURT is a from of directional antenna used in radio astronomy.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
										
							
							</div>
						</div>	
						
							
								<div className="g-equipment-head">
									EQUIPMENT
								</div>
								
								<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
									<div className="equipment__list">	
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Meade 8 inchnSchimdt-Cassegrain Telescope with Altazimuth mount(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Clestron 6 inch refractor telescope with Equatorial mount(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> 6 inch newtonian reflector with equatorial mount(2) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> 4 inch newtonian reflector with Altazimuth mount(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Nikon D-5500 DSLR Camera (1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Nikon binoculars(3) </span> 
										</div>
									
									</div>
								</div>
							
	
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									No pre-requisite, anyone with interest can join the club 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>

					<div className="g-sae g-group g-group--departmental" id="sae">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 2 of <span className="group-count--departmental "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> SAE Chapter IIT Roorkee</h1>
										<div className="front__sub-head">
											<h2> Society of Automotive Engineers-Chapter IIT Roorkee </h2>
										</div>
									</div>
									<div className="front__content">
										<p>SAE IIT Roorkee is a group of enthusiastic and self-motivated undergraduate engineers who thrive to pursue their interest in automobiles. The mission is to create a pool of inquisitive and innovative minds by means of sharing knowledge and fuelling passion.
				It is a collegiate chapter of SAE INDIA, which is affiliated to SAE International.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Debjit Tripathy
										</div>
										<div className="front__contact--info">
											 9437284363
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/SAEIITR/"> <i className="fa fa-facebook"> </i> </a>				
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/sae.jpg"/>
							</div>
						</div>

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
	
						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											RC Cars
										</div>
										<div className="g-card__content h3--small">
											<p>Students work on a scaled down model of an IC engine car that is remote controlled. The manufacturing and tuning of the components provides a thorough learning of how an IC engine driven vehicle works. 
				The team then participates in Powerdrift, the centrestage event at Cognizance-the annual technical fest of IIT Roorkee.</p>

										</div>
										
									</div>
								</div>
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											SAE Aero
										</div>
										<div className="g-card__content h3--small">
											<p>A relatively new initiative by SAE IIT Roorkee, it caters to the needs of all aeromodelling enthusiasts on campus. 
				Tinkering with UAVs and participating in national level competitions, the group is already brimming with innovative individuals working together, with a will to fly higher.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">		
							
							</div>
						</div>	
						
	
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									SAE IIT Roorkee runs a lecture series for freshers in their first semester itself. These serve the purpose of getting students acquainted with the technical knowledge about automobiles. The recruitment process begins in the Spring semester with a written test revolving around basic knowhow of automobiles and reasoning. The study material is also made available on SAE IITR's blog. 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>
					

					<div className="g-tinkeringlab g-group g-group--council" id="tinkeringlab">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 5 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> Rethink! The Tinkering lab</h1>
										<div className="front__sub-head">
											<h2>  </h2>
										</div>
									</div>
									<div className="front__content">
										<p>Tinkering Lab is a 3D printing laboratory equipped with technology, workstations and power tools. 
				It provides a platform to the students’ where they can come with an idea and make it true. 
				It provides ample opportunities to the students’ to do something innovative and new.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Anant Vashistha
										</div>
										<div className="front__contact--info">
											 9413993311
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/tinkeringlab.iitr/"> <i className="fa fa-facebook"> </i> </a>
											
											<a href="https: //www.linkedin.com/company/tinkering-lab-iit-roorkee/?originalSubdomain=in"> <i className="fa fa-linkedin"> </i> </a>
																					
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/tinkeringlab.jpg"/>
							</div>
						</div>

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
								
						</div>
					</div>

					<div className="g-acm g-group g-group--departmental" id="acm">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 3 of <span className="group-count--departmental "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> ACM IIT Roorkee Chapter</h1>
										<div className="front__sub-head">
											<h2> Association of Computer Machinery </h2>
										</div>
									</div>
									<div className="front__content">
										<p>It is an official student body incepted in 2014 under the aegis of Department of Computer Science and Engineering, IIT Roorkee. 
				It organizes a number of events including programming contests, talks by renowned speakers, workshops etc. which gives the students an exposure to the competitive computing world as well as allows them to understand the advancements going on in the computing sphere worldwide.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Akash Gupta
										</div>
										<div className="front__contact--info">
											 8226050690
										</div>
										<div className="front__contact--links"> 
											
											<a href="https://www.facebook.com/groups/acmiitrteam/"> <i className="fa fa-facebook"> </i> </a>
													
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/acm.jpg"/>
							</div>
						</div>

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
								
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									ACM IITR Chapter is open as of now. 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>

					<div className="g-asme g-group g-group--council" id="asme">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 6 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> ASME IIT-R Student Society</h1>
										<div className="front__sub-head">
											<h2> Compete in Robotics and Automobile competitions,Organising technical events </h2>
										</div>
									</div>
									<div className="front__content">
										<p>The ASME Student Chapter at IIT Roorkee is an undergraduate club comprised of students majoring in various fields of Engineering. 
				Our mission is to promote and enhance technical competency and professional well-being of our members through quality programs and activities in engineering. 
				 Brought into existence in the year 2007, this society has offered a plethora of technical knowledge and opportunities to aspiring students.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Harshvardhan
										</div>
										<div className="front__contact--info">
											 9566070030
										</div>
										<div className="front__contact--links"> 
											
											<a href="https://www.facebook.com/asmeiitr"> <i className="fa fa-facebook"> </i> </a>		
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/asme.jpg"/>
							</div>
						</div>


						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
								
						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											HPVC
										</div>
										<div className="g-card__content h3--small">
											<p>Human Powered Vehicle Challenge. HPVC(Human Powered Vehicle Challenge)-provides an opportunity for students to bring sound engineering design principles in the development of efficient, sustainable, fast and practical transportation alternatives. 
				ASME IIT R has engineered two vehicles on account of our two-year participation, Team Faith (2017) and Team Nimbus 2k18(2018).</p>

										</div>
										
									</div>
								</div>
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											IRC
										</div>
										<div className="g-card__content h3--small">
											<p>International Robotic Challenge.Organisied by IIT Bomaby,the event poses challenging problem statements in the field of robotics. ASME IITR has particiapted twice in year 2016 and 2017 and won the seccond time.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									

								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Organising Armagadon
										</div>
										<div className="g-card__content h3--small">
											<p>ASME IITR chapter organises this robot battle event in Congnizance Fest every year,we design the battle arena and host the event.</p>

										</div>
										
									</div>
								</div>
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											SDC: Student Design Competition
										</div>
										<div className="g-card__content h3--small">
											<p>SDC(Student Design Competion)-SDC Conducted as part of E-fest ASME Asia Pacific challenges the technical skills, to create robots that perform various competitive tasks. 
				Team SDC participated for the first time  in 2018 and engineered Robots that play football.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
										
							</div>
						</div>	
						
								
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									Recruitment is done at the start of spring semester, it is a three stage process which are -a written test(Logic+Technical knowlege), Technical Interivew based on problem statements and a final Interivew. <br/> Prerequisites-Sound technical Knowlege in electronics ,coding and mechanical Concepts.<br/> Requirements-Open to all departments. 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					<div className="g-cec g-group g-group--departmental" id="cec">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 4 of <span className="group-count--departmental "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> CEC IITR</h1>
										<div className="front__sub-head">
											<h2> Civil Engineering Consortium </h2>
										</div>
									</div>
									<div className="front__content">
										<p>Civil Engineering Consortium is the departmental group of Civil Engineering Department, IIT Roorkee. The group was established to act as a bridge between the students ( of both, Btech and Mtech programmes) and the faculty.
				We at CEC carry out activities all the year round to provide the stage for the budding talent amongst the civilians and also help provide them aid in their academic journey here at IITR and beyond.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Pracheer Mehra
										</div>
										<div className="front__contact--info">
											 7500320832
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/ceconsortium.iitr/"> <i className="fa fa-facebook"> </i> </a>
											
			
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/cec.jpg"/>
							</div>
						</div>


						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
						
								<div className="g-equipment-head">
									EQUIPMENT
								</div>
								
								<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
									<div className="equipment__list">	
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Modem(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Black board(1) </span> 
										</div>
									
									</div>
								</div>
	
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									A written test to sort the requisites into various verticals.(May involve submission of past works based on questionnaire).And then followed by formal interviews. 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					<div className="g-ds g-group g-group--council" id="ds">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 7 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> Design Studio</h1>
										<div className="front__sub-head">
											<h2>  </h2>
										</div>
									</div>
									<div className="front__content">
										<p>At Design Studio, we aspire to inspire. We work to create experiences and products to improve lives. Inspired by Leonardo Da Vinci, we combine science and design to create and innovate.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Jayant Mishra
										</div>
										<div className="front__contact--info">
											 8126481212
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/designstudio.iitr"> <i className="fa fa-facebook"> </i> </a>

											<a href="https: //www.behance.net/designstudioiitr"> <i className="fa fa-instagram"> </i> </a>
										
											<a href="https: //designstudio.cc/portfolio"> <i className="fa fa-window-maximize"> </i> </a>
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/designstudio.png"/>
							</div>
						</div>

						
						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
					

						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">

								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Cognizance Branding
										</div>
										<div className="g-card__content h3--small">
											<p>Design Studio did the entire branding for Cognizance 2017.</p>

										</div>
										
									</div>
								</div>
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Cognizance Graphic Design
										</div>
										<div className="g-card__content h3--small">
											<p>Design Studio designed posters, flexes and other graphics for Cognizance, the annual technical festival of IIT Roorkee.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Crutches (Product Design)
										</div>
										<div className="g-card__content h3--small">
											<p>Making the world a better place to live in for the specially-abled with our new product</p>

										</div>
										
									</div>
								</div>
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Mascot Design
										</div>
										<div className="g-card__content h3--small">
											<p>Mascot design which grabbed the first runner-up position during Inter-IIT Cultural Meet 2017.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Memento (Product Design)
										</div>
										<div className="g-card__content h3--small">
											<p>Memento designed for a competition organised by Tinkering Lab IITR</p>

										</div>
										
									</div>
								</div>
									
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Plan ET A.R. App
										</div>
										<div className="g-card__content h3--small">
											<p>The first Augmented Reality (AR) based treasure-hunt game of IITR campus.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							
							</div>
						</div>	
						
							
								<div className="g-equipment-head">
									EQUIPMENT
								</div>
								
								<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
									<div className="equipment__list">	
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> iMac(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Cintiq Graphic Tablet(1i) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Workstation(1) </span> 
										</div>
									
									</div>
								</div>
							
								
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									Written test followed by two rounds of interviews.<br/> Prerequisites - None. <br/> Requirements - Applicants must be creative and should have a knack for innovation. 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					<div className="g-edc g-group g-group--council" id="edc">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 8 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> EDC IIT Roorkee</h1>
										<div className="front__sub-head">
											<h2> Entrepreneurship Developement Cell </h2>
										</div>
									</div>
									<div className="front__content">
										<p>We aim to foster the idea of entrepreneurship and raise awareness about it in our institute and also provide help and resources to existing startups on the campus.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Aayush Gupta
										</div>
										<div className="front__contact--info">
											 8872205522
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/edciitr/"> <i className="fa fa-facebook"> </i> </a>
												
											<a href="https: //www.instagram.com/edciitr/"> <i className="fa fa-instagram"> </i> </a>
											
											<a href="https: //www.linkedin.com/company/entrepreneurship-development-cell-iit-roorkee/"> <i className="fa fa-linkedin"> </i> </a>	
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/edc.jpg"/>
							</div>
						</div>
	

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
						
							
						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											E-Talks
										</div>
										<div className="g-card__content h3--small">
											<p>A new initiative undertaken last year, E-talks is a talk series which involves guest lectures, workshops and discussions led by expert guests in a particular field like design, management, or entrepreneurship in general.</p>

										</div>
										
									</div>
								</div>
									

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Entrepreneurial Summit (E-Summit)
										</div>
										<div className="g-card__content h3--small">
											<p>The flagship event of EDC, this event brings together experts in the startup community and enthusiasts as part of a two day fiesta.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
							
							

								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Endeavor
										</div>
										<div className="g-card__content h3--small">
											<p>A five-day event exclusive for freshers, it focuses on knowledge-gain and understanding the world of entrepreneurship and business via able mentors and interactive activities.</p>

										</div>
										
									</div>
								</div>
									

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											TEDx IITRoorkee
										</div>
										<div className="g-card__content h3--small">
											<p>It is the independently organised TED event of our institute which involves guest lectures by exceptional individuals from diverse fields under a day-long program.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
							
							</div>
						</div>	
						
							
								<div className="g-equipment-head">
									EQUIPMENT
								</div>
								
								<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
									<div className="equipment__list">	
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Printer(1) </span> 
										</div>
									
									</div>
								</div>
							

								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									The annual recruitment process takes place in the month of January.<br/> The process involves a Group Discussion round followed by a couple of interview rounds, with the candidates being tested for their teamwork abilities, work ethic and the passion to learn. The recruitment isn't strict though, with EDC being open to any new member throughout the year along with volunteering activities in multiple events. 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>



					<div className="g-mars g-group g-group--council" id="mars">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 9 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> MaRS</h1>
										<div className="front__sub-head">
											<h2> Models and Robotics Section </h2>
										</div>
									</div>
									<div className="front__content">
										<p>MaRS provides the perfect platform for students to develop their innovative and technical skills such as mechanical, electronics and architectural.
				Over the past years, this section has focused more on the ‘robotics’ part, conducting lectures on microcontrollers, sensors, actuators, etc.; conducting workshops. 
				Also, the first year students get a chance to build their bots independently and they are displayed in ‘Srishti’ ; the Annual Exhibition of Student Technical Club, and attract a lot of appreciation from various professors, and other visitors.”</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Aayushi Shrivastava
										</div>
										<div className="front__contact--info">
											 7500471230
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/groups/mnrsectioniitr/"> <i className="fa fa-facebook"> </i> </a>	
											
											<a href="https: //github.com/marsiitr"> <i className="fa fa-window-maximize"> </i> </a>
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/mars.jpg"/>
							</div>
						</div>

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
						
	
						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">


								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											3D Printers
										</div>
										<div className="g-card__content h3--small">
											<p>MaRS members made our own 3D printer from scratch, with a reduced cost of around 12k compared to available 3D printers in market which are in lacs.</p>

										</div>
										
									</div>
								</div>
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Balancing Bot
										</div>
										<div className="g-card__content h3--small">
											<p>It was made by First Year students which has wide applications from Camera stabilization and in Phones to Stabilization of patient’s bed in a moving Ambulance.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Graffitti Bot
										</div>
										<div className="g-card__content h3--small">
											<p>A Wall Painting Robot was made by MaRS and showcased as Srishti’18 which could paint any image automatically of the size of a wall painting.</p>

										</div>
										
									</div>
								</div>
									
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Martian Harmony
										</div>
										<div className="g-card__content h3--small">
											<p>India’s first Robotic Band which plays three instruments Synthesizers, flute and Guitar. Probably this year the band will perform in certain coming fests in our college as well as other colleges too.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
							
							</div>
						</div>	
						

								<div className="g-equipment-head">
									EQUIPMENT
								</div>
								
								<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
									<div className="equipment__list">	
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Pedestrial drill(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Pedestrial Grinding Machine(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Lathe(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Band saw/Jig saw(1) </span> 
										</div>
									
									</div>
								</div>

								
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									There are no prerequisites to be a member of MaRS. You can start from scratch and learn here at MaRS. Anyone can do a project here. The projects in the section are allotted to all the students from 1st to 3rd year and the 4th year students act as mentors for those projects. We also have a core team of MaRS which undertakes some major projects and takes part in big competitions. To become a core team member you have to do a project in Srishti- Annual Exhibition of Student Technical Club. After Srishti, interviews are taken to select the students with the right mental caliber and team spirit who can take the team ahead.  
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					<div className="g-mdg g-group g-group--council" id="mdg">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 10 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> MDG</h1>
										<div className="front__sub-head">
											<h2> Mobile Developement Group </h2>
										</div>
									</div>
									<div className="front__content">
										<p>Mobile Development Group, IIT Roorkee is an active student group directing its efforts towards creating useful mobile applications and promoting tech-based learning for the same.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Harjot Singh Oberoi
										</div>
										<div className="front__contact--info">
											 9760826870
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/mdgiitr/"> <i className="fa fa-facebook"> </i> </a>
	
											<a href="https: //in.linkedin.com/company/mdgiitr"> <i className="fa fa-linkedin"> </i> </a>
												
											<a href="http: //mdg.iitr.ac.in"> <i className="fa fa-window-maximize"> </i> </a>
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/mdg.jpg"/>
							</div>
						</div>

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
						
	
						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">


								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Appetizer
										</div>
										<div className="g-card__content h3--small">
											<p>The official Mess App for IIT Roorkee, used to track student leaves and provide feedback to mess administration</p>

										</div>
										
									</div>
								</div>
									
							

								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Campus Buddy
										</div>
										<div className="g-card__content h3--small">
											<p>Campus Buddy is an assistant who helps you access the Telephone Directory of IIT Roorkee and keeps you updated with the facebook feed of campus groups at IIT Roorkee.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Citadel
										</div>
										<div className="g-card__content h3--small">
											<p>A book sharing platform with GoodReads and other useful integrations.</p>

										</div>
										
									</div>
								</div>
									
														
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											MusicDNA
										</div>
										<div className="g-card__content h3--small">
											<p>MusicDNA is a full featured Music Player that combines the usefulness of a clean traditional music player with amazing visualizations or DNAs generated based on the currently playing music. 
				The app has been downloaded over 50,000 times from the Play Store.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Splitter
										</div>
										<div className="g-card__content h3--small">
											<p>A mobile arcade game built using Unity game engine, with more than 7000 downloads on the android app store.</p>

										</div>
										
									</div>
								</div>
										
							
							</div>
						</div>	
						

							
								<div className="g-equipment-head">
									EQUIPMENT
								</div>
								
								<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
									<div className="equipment__list">	
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> iMac(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Kinect for Xbox(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> MacBook pro(2) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> PC(i7, 16gb)(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Hackintosh(1) </span> 
										</div>
									
									</div>
								</div>

								
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									MDG usually recruits in January, after conclusion of Droid Wars which is a month long competition for freshers during the winter break, organised and judged by MDG. The students are required to work on a few problem statements. At the end of the competition 25-30 students are shotlisted for technical interviews.<br/> MDG doesn't expect students to have any knowledge of programming prior to Droid Wars and shortlisting of students is purely based on their performance in Droid Wars. <br/> We also have problem statements for Designers and recruit arounf 3-4 students as designers each year.<br/> Apart from this, we are are open to scheduling interviews for enthusiastic and deserving students any time of the year and have usually recruited 2-3 students at the end of year as well. 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					<div className="g-mech g-group g-group--departmental" id="mech">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 5 of <span className="group-count--departmental "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> MIESS</h1>
										<div className="front__sub-head">
											<h2> Mechanical and Industrial Engineering Student's Society </h2>
										</div>
									</div>
									<div className="front__content">
										<p>The official student body of the Mechanical and Industrial Engineering Department IIT Roorkee. The primary objectives of MIESS for the next session will be to act as a helping platform to increase the participation of students in Technical events and competitions. Increasing Inter-college collaboration to enable the students to get the much-wanted exposure. Establish an identity outside of being the official group representing our department.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Samarth Gubrele
										</div>
										<div className="front__contact--info">
											 8349146260
										</div>
										<div className="front__contact--links"> 
											
											<a href="https://www.facebook.com/MIESS.IITR/?hc_ref=ARTJuAiTse4hRKOeuQpQNVz40bJEGzdcFOqFqXK0CDrLR8Ux_uOid5W-spMry2mAc5o&fref=nf"> <i className="fa fa-facebook"> </i> </a>		
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/miess.jpg"/>
							</div>
						</div>

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
								
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									The recruitment process consists of two steps: <br/> 1)Written test/Submission for designers and developers.<br/> 2)Personal Interviews 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					<div className="g-robocon g-group g-group--council" id="robocon">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 11 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> Team Robocon IITR</h1>
										<div className="front__sub-head">
											<h2> Competetive Robotics and Learning </h2>
										</div>
									</div>
									<div className="front__content">
										<p>We make Bots that throw, Bots that steer, Bots that climb, Bots that play, Bots that shoot, BOTS THAT COMPETE,  COMPETE HARD IN ABU ROBOCON.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Bhavya Giri Goswami
										</div>
										<div className="front__contact--info">
											 8755175975
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/roboconiitr/"> <i className="fa fa-facebook"> </i> </a>

											<a href="https: //www.linkedin.com/company/team-robocon-iit-roorkee/"> <i className="fa fa-linkedin"> </i> </a>
																					
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/robocon.jpg"/>
							</div>
						</div>

						

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
							
						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Baaz
										</div>
										<div className="g-card__content h3--small">
											<p>A full automatic robot, which takes shuttle from another bot and throw it consistently through rings at height.</p>

										</div>
										
									</div>
								</div>
									

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Fluffy o.6
										</div>
										<div className="g-card__content h3--small">
											<p>The frisbee throwing bot 2017. A Semi-automatic bot which accurately throw frisbees on any position you want.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Hawaa
										</div>
										<div className="g-card__content h3--small">
											<p>The Shuttle collecting and transferring bot 2018. A Semi-automatic robot, which collect shuttle form rack and pass it furiously to the Baaz.</p>

										</div>
										
									</div>
								</div>
										


								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Mousa
										</div>
										<div className="g-card__content h3--small">
											<p>Eco Bot 2016. A light bot with single actuation working with the help of renewable energy source, moving through slopes and obstructions.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Pappu
										</div>
										<div className="g-card__content h3--small">
											<p>Hybrid Bot 2016. A bot designed to help the Mousa to run through its path. It’s the source of renewable energy.</p>

										</div>
										
									</div>
								</div>
									
							
							</div>
						</div>	
						

								<div className="g-equipment-head">
									EQUIPMENT
								</div>
								
								<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
									<div className="equipment__list">	
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Manufacturing Machines </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Fabrication Tools </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> 3D Printers </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Industrial Sensors </span> 
										</div>
									
									</div>
								</div>
							
]

								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									Recruitment Process: Written Test -> Interview -> Project In Srishti -> Final Group Project.<br/> Pre-requisites -> Deep interest and great dedication towards robotics 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					<div className="g-sds g-group g-group--council" id="sds">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 12 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> SDS</h1>
										<div className="front__sub-head">
											<h2> Software Development Section </h2>
										</div>
									</div>
									<div className="front__content">
										<p>SDS is a student group that constantly tries to innovate and foster technical activities in campus. We conduct lectures and workshops on all these topics and also conduct monthly competitions on our various self developed applications.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Utkarsh Gupta
										</div>
										<div className="front__contact--info">
											 7060906519
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/SDSLabs/"> <i className="fa fa-facebook"> </i> </a>
											
											<a href="https: //www.instagram.com/sdslabs/"> <i className="fa fa-instagram"> </i> </a>
											
											<a href="https: //www.linkedin.com/company/sdslabs/"> <i className="fa fa-linkedin"> </i> </a>
											
											<a href="https: //sdslabs.co/"> <i className="fa fa-window-maximize"> </i> </a>
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/sds.jpg"/>
							</div>
						</div>


						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
		
						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">

								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Backdoor
										</div>
										<div className="g-card__content h3--small">
											<p>Backdoor is a platform for hackers to show their talent in a competitive environment.</p>

										</div>
										
									</div>
								</div>
									

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											BruteDC
										</div>
										<div className="g-card__content h3--small">
											<p>DC by SDSLabs aims to create a more visually pleasing interface over the generic DC++. While DC++ is required in some way to use the application, you, the user can view all content in a better way with proper design.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Campus Omegle
										</div>
										<div className="g-card__content h3--small">
											<p>All work and no play makes Jack a dull boy. Omegle is an intranet application that comes alive around 2am when the campus internet begins. Omegle allows people to chat anonymously. Omegle has been built in Node.js and employs socket.io for real time communication</p>

										</div>
										
									</div>
								</div>
									
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Cerebro
										</div>
										<div className="g-card__content h3--small">
											<p>Cerebro is an online competition platform with a core philosophy of improving the machine learning and data science skills of the IITR.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											CodeVillage
										</div>
										<div className="g-card__content h3--small">
											<p>Codevillage is an online judge with a core philosophy of improving the programming skills of the IITR junta.</p>

										</div>
										
									</div>
								</div>
									
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Echo
										</div>
										<div className="g-card__content h3--small">
											<p>This interactive search app lets you download the book you need from the millions in the collection using its lightning fast search relying on a massive collection of indexed books.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							

								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Erdos
										</div>
										<div className="g-card__content h3--small">
											<p>Erdos is an application for Math Geeks to try out new mathematical problems and keep track of who solves what.</p>

										</div>
										
									</div>
								</div>
									


								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											File Panda
										</div>
										<div className="g-card__content h3--small">
											<p>File Panda is the intranet repository of free and open source applications. It is a self updating application which ensure that it always has the latest version of each software. 
				File Panda has been developed in PHP and uses the Limonade microframework.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Live
										</div>
										<div className="g-card__content h3--small">
											<p>Live is a live streaming app develop by SDSLabs, it streams sports matches and displays TV schedule when the matches will be hosted. 
				People can vote on what they have to watch and based on the voting the channel is switched.</p>

										</div>
										
									</div>
								</div>
									
						
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Muzi
										</div>
										<div className="g-card__content h3--small">
											<p>With over 200,000 tracks by 25,000 artists and updating daily, Muzi is the one stop online music player for the IIT Roorkee intranet.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
						
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Play
										</div>
										<div className="g-card__content h3--small">
											<p>Play is an application we use internally to manage music playback inside our lab. It acts as a central hub for managing music submissions from all users and handles the queue to accomodate everyone’s interests.</p>

										</div>
										
									</div>
								</div>
									
							

								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Quizio
										</div>
										<div className="g-card__content h3--small">
											<p>A platform to hold online tests including quizes with both descriptive and multiple choice questions.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Search
										</div>
										<div className="g-card__content h3--small">
											<p>A search engine developed by SDSLabs for the residents of IITR.</p>

										</div>
										
									</div>
								</div>
									
							
							

								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Slack lens
										</div>
										<div className="g-card__content h3--small">
											<p>Written in Clojure, we use Slack Lens to archive our Slack history and get around its limitation of 10,000 messages.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											StudyPortal
										</div>
										<div className="g-card__content h3--small">
											<p>Study Portal allows anyone to upload files to courses that are taught in IITR. These files can be professors handouts, practical manuals, tutorial solutions, class notes etc.</p>

										</div>
										
									</div>
								</div>
										
							
							</div>
						</div>	
						


								<div className="g-equipment-head">
									EQUIPMENT
								</div>
								
								<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
									<div className="equipment__list">	
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Oculus Rift </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Intuos Tablets </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Mac Mini </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> GTX 1080 Ti </span> 
										</div>
									
									</div>
								</div>
							


								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									All details are available at https: //join.sdslabs.co/ 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					

					<div className="g-share g-group g-group--council" id="share">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 13 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> ShARE-IITR</h1>
										<div className="front__sub-head">
											<h2> Sharing Analysis of Regional Economies </h2>
										</div>
									</div>
									<div className="front__content">
										<p>ShARE is an international student think tank conceived in Shanghai in 2002 which is now present in around 30 universities in 10 countries. 
				ShARE connects students around the world through an online platform to discuss economic and business issues with corporates, start-ups or global leaders. 
				Students work on hot topics and exchange their views with students from 3 other continents, big corporate, startups or social leaders.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Uday Shinghal
										</div>
										<div className="front__contact--info">
											 9997859777
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/shareiitr/"> <i className="fa fa-facebook"> </i> </a>

										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/share.jpg"/>
							</div>
						</div>

						

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
							
						<div className="g-project--wraper">
							<div className="g-project-head">
								PROJECTS
							</div>

							<div className="g-project-row display--flex horizontal-align--space-between">

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Digitising IITR
										</div>
										<div className="g-card__content h3--small">
											<p>ShARE presented a report to the administration, outlining the various solutions using which the campus can be efficiently digitally enabled.</p>

										</div>
										
									</div>
								</div>
									
							

							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											Rise of tier 1 cities
										</div>
										<div className="g-card__content h3--small">
											<p>In collaboration with Ernst and Young: 
				An 8-membered team from ShARE explored the geographical advantages and favourable government policies that led to the growth of tier 1 cities from the year 2000.</p>

										</div>
										
									</div>
								</div>
								
									</div>
									<div className="g-project-row display--flex horizontal-align--space-between">	
									
							
							
							
								<div className="g-card display--flex">
									<div className="g-card__image">
										<img alt="group" src={demoImg}/>
									</div>

									<div className="g-card__data display--flex flex-direction-column">
										<div className="g-card__head h1--smaller">
											TPO
										</div>
										<div className="g-card__content h3--small">
											<p>Looking on the possible changes in the placement scenario of IIT Roorkee.</p>

										</div>
										
									</div>
								</div>	
							
							</div>
						</div>	
						
							
							
							
								<div className="g-equipment-head">
									EQUIPMENT
								</div>
								
								<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
									<div className="equipment__list">	
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> White Board </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Markers and Dusters </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Router and LAN Cable </span> 
										</div>
									
									</div>
								</div>
							

							
								
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									A three round recruitment process. <br/> Round 1:  A written test; questions covering areas of basic general knowledge, puzzles; guesstimates and analytical problems.<br/> Round 2:  A personal interview; basic problems are asked to solve. (Simple Business Cases)<br/> Round 3:  A panel interview to gain multiple outlook on the candidate. 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


					

					<div className="g-teamknox g-group g-group--council" id="teamknox">
						<div className="group-front display--flex horizontal-align--center" id="group-front">
							<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
								<div className="group__info">
									<div className="front__paginate">
										<h2> 14 of <span className="group-count--council "></span>
											<a href="#" className="previous"> &lt; </a>
											<a href="#" className="next">  &gt; </a>
										</h2>
									</div>
									<div className="front__head">
										<h1> Team KNOx</h1>
										<div className="front__sub-head">
											<h2>  </h2>
										</div>
									</div>
									<div className="front__content">
										<p>A group of enthusiasts who design and fabricate off-road vehicles and participate in National level competitions like BAJA SAE India and BAJA Student India.</p>

									</div>
									<div className="front__contact">
										<div className="front__contact--name h2--large">
											Abhishek Gattani
										</div>
										<div className="front__contact--info">
											 9468643803
										</div>
										<div className="front__contact--links"> 
											
											<a href="https: //www.facebook.com/bajasaeiitr/"> <i className="fa fa-facebook"> </i> </a>
											
											<a href="https: //www.instagram.com/team_knox/"> <i className="fa fa-instagram"> </i> </a>
											
										</div>
									</div>
								</div>
							</div>
							<div className="front__image">
								<img alt="group" src="./images/knox.jpg"/>
							</div>
						</div>

						

						<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
						

								<div className="g-equipment-head">
									EQUIPMENT
								</div>
								
								<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
									<div className="equipment__list">	
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Cutting machine(3) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Grinders(3) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Drilling machine(1) </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Complete mechanical toolkit </span> 
										</div>
									
										<div className="equipment__list--item display--flex vertical-align--center"> 
											<i className="fa fa-circle" aria-hidden="true"></i>
											<span className="g-equipment__item"> Welding machine(1) </span> 
										</div>
									
									</div>
								</div>
							

							
								
								<div className="g-recruitments-head">
									RECRUITMENTS  
								</div>
								<div className="g-recruitments-content">
									Recruitment process is conducted in 3 stages: -<br/> 1. Recruitment Test<br/> 2. Projects<br/> 3. Interview<br/> Prerequisites: -<br/> 1. Basic automobile Engineering<br/> 2. Basic mechanics 
								</div>
								<div className="g-recruitments-link">
									<a href="#"> Apply Now </a>
								</div>
							
						</div>
					</div>


				</div>

				<div className="scroll-down hidden-arrow display--flex">
					<div className="scroll-down__text display--flex vertical-align--center horizontal-align--center"> Scroll Down For Projects </div>
					<div className="arrow-dw display--flex vertical-align--center horizontal-align--center"> &darr; </div>
				</div>
				{/*<Footer />*/}
			</div>
			);
		}
}

export default Groups;