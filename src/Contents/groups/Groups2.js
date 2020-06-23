 /* eslint-disable */ 
import React from 'react';
import '../../App.css';
import Header from '../../Components/Header.js';
import Footer from '../../Components/Footer.js';
import $ from 'jquery';
import {Helmet} from "react-helmet"; 
import {councilGroupFormat} from './councilGroupFormat';
import {deptGroupFormat} from './deptGroupFormat';

class Groups extends React.Component {

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

	
					{councilGroupFormat.map((group)=>{
						return(

								<div className={"g-"+ group.id + "g-group g-group--council"} id={group.id}>
									<div className="group-front display--flex horizontal-align--center" id="group-front">
										<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
											<div className="group__info">
												<div className="front__paginate">
													<h2> {group.number + " of"} <span className="group-count--council "></span>
														<a href="#" className="previous"> &lt; </a>
														<a href="#" className="next">  &gt; </a>
													</h2>
												</div>
												<div className="front__head">
													<h1> {group.name}</h1>
													{
														
														<div className="front__sub-head">
															{
																group.tagline.length > 0 &&
																 <h2> {group.tagline} </h2>
															}
														</div>
													}
												</div>
												<div className="front__content">
													<p>{group.content}<br /></p>

												</div>
												<div className="front__contact">
													<div className="front__contact--name h2--large">
														{group.contactPerson}
													</div>
													<div className="front__contact--info">
														 {group.contactNumber}
													</div>
													<div className="front__contact--links"> 

														<a href={group.socialMedia.facebook}> <i className="fa fa-facebook"> </i> </a>
								
														{
															group.socialMedia.twitter.length > 0 &&
															<a href={group.socialMedia.twitter}> <i className="fa fa-twitter"> </i> </a>
														}
														
														{
															group.socialMedia.linkedIn.length > 0 &&
															<a href={group.socialMedia.linkedIn}> <i className="fa fa-linkedin"> </i> </a>
														}	
														
														{
															group.socialMedia.instagram.length > 0 &&
															<a href={group.socialMedia.instagram}> <i className="fa fa-instagram"> </i> </a>
														}
														
														{
															group.socialMedia.github.length > 0 &&
															<a href={group.socialMedia.github}> <i className="fa fa-github"> </i> </a>
														}
														
														{
															group.socialMedia.personal.length > 0 &&
															<a href={group.socialMedia.personal}> <i className="fa fa-window-maximize"> </i> </a>
														}

													</div>
												</div>
											</div>
										</div>
										<div className="front__image">
											<img alt="group" src={ process.env.PUBLIC_URL+ "" + group.image}/>
										</div>
									</div>

									

									<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
									
									
									{
										group.projects.length > 0 &&	
											<div className="g-project--wraper">
													<div className="g-project-head">
														PROJECTS
													</div>
													{group.projects.map((pair)=>{
														return(
		
													<div className="g-project-row display--flex horizontal-align--space-between">
														{pair.map((project)=>{
															return(
		
																<div className="g-card display--flex">
																	<div className="g-card__image">
																		<img alt="group" src={ process.env.PUBLIC_URL + "/images/demo_project.jpg"}/>
																	</div>
		
																	<div className="g-card__data display--flex flex-direction-column">
																		<div className="g-card__head h1--smaller">
																			{project.projectName}
																		</div>
																		<div className="g-card__content h3--small">
																			<p>{project.projectContent}</p>
		
																		</div>
																		
																	</div>
																</div>
																);
														})}
													
													</div>	
															);
													})}
											</div>
									}
									
									{
										group.equipments.length > 0 &&
											<div>
												<div className="g-equipment-head">
													EQUIPMENT
												</div>
												
												<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
													<div className="equipment__list">	
													{group.equipments.map((item)=>{
															return(

															<div className="equipment__list--item display--flex vertical-align--center"> 
																<i className="fa fa-circle" aria-hidden="true"></i>
																<span className="g-equipment__item"> {item} </span> 
															</div>
															);
													})}
													</div>
												</div>
											</div>
									}
	
											<div className="g-recruitments-head">
												RECRUITMENTS  
											</div>
											<div className="g-recruitments-content">
												{group.recruitments}
											</div>
											<div className="g-recruitments-link">
												<a href="#"> Apply Now </a>
											</div>
										
									</div>
								</div>
							);
					})}


					{deptGroupFormat.map((group)=>{
						return(

								<div className={"g-"+ group.id + "g-group g-group--departmental"} id={group.id}>
									<div className="group-front display--flex horizontal-align--center" id="group-front">
										<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
											<div className="group__info">
												<div className="front__paginate">
													<h2> {group.number + " of"} <span className="group-count--departmental "></span>
														<a href="#" className="previous"> &lt; </a>
														<a href="#" className="next">  &gt; </a>
													</h2>
												</div>
												<div className="front__head">
													<h1> {group.name}</h1>
													{
														<div className="front__sub-head">
															{
																group.tagline.length > 0 &&
																 <h2> {group.tagline} </h2>
															}
														</div>
													}
												</div>
												<div className="front__content">
													<p>{group.content}<br /></p>

												</div>
												<div className="front__contact">
													<div className="front__contact--name h2--large">
														{group.contactPerson}
													</div>
													<div className="front__contact--info">
														 {group.contactNumber}
													</div>
													<div className="front__contact--links"> 

														<a href={group.socialMedia.facebook}> <i className="fa fa-facebook"> </i> </a>
								
														{
															group.socialMedia.twitter.length > 0 &&
															<a href={group.socialMedia.twitter}> <i className="fa fa-twitter"> </i> </a>
														}
														
														{
															group.socialMedia.linkedIn.length > 0 &&
															<a href={group.socialMedia.linkedIn}> <i className="fa fa-linkedin"> </i> </a>
														}	
														
														{
															group.socialMedia.instagram.length > 0 &&
															<a href={group.socialMedia.instagram}> <i className="fa fa-instagram"> </i> </a>
														}
														
														{
															group.socialMedia.github.length > 0 &&
															<a href={group.socialMedia.github}> <i className="fa fa-github"> </i> </a>
														}
														
														{
															group.socialMedia.personal.length > 0 &&
															<a href={group.socialMedia.personal}> <i className="fa fa-window-maximize"> </i> </a>
														}

													</div>
												</div>
											</div>
										</div>
										<div className="front__image">
											<img alt="group" src={group.image}/>
										</div>
									</div>

									

									<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
									
									
									{
										group.projects.length > 0 &&	
											<div className="g-project--wraper">
													<div className="g-project-head">
														PROJECTS
													</div>
													{group.projects.map((pair)=>{
														return(
		
													<div className="g-project-row display--flex horizontal-align--space-between">
														{pair.map((project)=>{
															return(
		
																<div className="g-card display--flex">
																	<div className="g-card__image">
																		<img alt="group" src={process.env.PUBLIC_URL + "/images/demo_project.jpg"}/>
																	</div>
		
																	<div className="g-card__data display--flex flex-direction-column">
																		<div className="g-card__head h1--smaller">
																			{project.projectName}
																		</div>
																		<div className="g-card__content h3--small">
																			<p>{project.projectContent}</p>
		
																		</div>
																		
																	</div>
																</div>
																);
														})}
													
													</div>	
															);
													})}
											</div>
									}
									
									{
										group.equipments.length > 0 &&
											<div>
												<div className="g-equipment-head">
													EQUIPMENT
												</div>
												
												<div className="equipment__list g-equipment__list display--flex flex-direction-column">		
													<div className="equipment__list">	
													{group.equipments.map((item)=>{
															return(

															<div className="equipment__list--item display--flex vertical-align--center"> 
																<i className="fa fa-circle" aria-hidden="true"></i>
																<span className="g-equipment__item"> {item} </span> 
															</div>
															);
													})}
													</div>
												</div>
											</div>
									}
	
											<div className="g-recruitments-head">
												RECRUITMENTS  
											</div>
											<div className="g-recruitments-content">
												{group.recruitments}
											</div>
											<div className="g-recruitments-link">
												<a href="#"> Apply Now </a>
											</div>
										
									</div>
								</div>
							);
					})}
				</div>	

				<div className="scroll-down hidden-arrow display--flex">
					<div className="scroll-down__text display--flex vertical-align--center horizontal-align--center"> Scroll Down For Projects </div>
					<div className="arrow-dw display--flex vertical-align--center horizontal-align--center"> &darr; </div>
				</div>
				<Footer />
			</div>
			);
		}
}

export default Groups;