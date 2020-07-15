 /* eslint-disable */ 
import React from 'react';
import '../../App.css';
import Header from '../../Components/Header.js';
import MobileHeader from '../../Components/MobileHeader.js';
import Footer from '../../Components/Footer.js';
import $ from 'jquery';
import {Helmet} from "react-helmet"; 
import {councilGroupFormat} from './councilGroupFormat';
import {deptGroupFormat} from './deptGroupFormat';

class Groups extends React.Component {

	isMobile(){
     let check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	  return check;
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
		        {
		        	this.isMobile()===true
		        	?<div>
		        		<MobileHeader/>
		        		<div className="mobile-wrapper--group">

	
							{councilGroupFormat.map((group)=>{
								return(

										<div className={"g-"+ group.id + "g-group g-group--council"} id={group.id}>
											<div className="group-front display--flex horizontal-align--center" id="group-front">
												<div className="front__left-leaf display--flex vertical-align--center horizontal-align--center flex-direction-column">
													<div className="mobile-group__info">
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
														<div className="mobile-front__content">
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
												<div className="mobile-front__image">
													<img alt="group" src={ process.env.PUBLIC_URL+ "" + group.image}/>
												</div>
											</div>

											

											<div className="group-full display--flex vertical-align--center horizontal-align--center flex-direction-column">
											
											
											{
												group.projects.length > 0 &&	
													<div className="g-project--wraper">
															<div className="mobile-g-project-head">
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
		        	 </div>
		        	:<div>
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
		        	 </div>
		        }
					

				
				<Footer />
			</div>
			);
		}
}

export default Groups;