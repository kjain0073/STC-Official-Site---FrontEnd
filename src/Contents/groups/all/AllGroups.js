import React from 'react';
import '../../../App.css';
import Header from '../../../Components/Header.js';
import Footer from '../../../Components/Footer.js';
import $ from 'jquery';
import {Helmet} from "react-helmet"; 
import {councilGroupList} from './CouncilGroupList';
import {deptGroupList} from './DeptGroupList';

class AllGroups extends React.Component {
	
	componentDidMount =() => {
		$('.group__type--departmental').click(function() {
		$('.group__type--departmental').addClass('group__type--active');
		$('.group__type--council').removeClass('group__type--active');
		$('.groups--council').addClass('display--none');
		$('.groups--departmental').removeClass('display--none');
	});

	$('.group__type--council').click(function() {
		$('.group__type--council').addClass('group__type--active');
		$('.group__type--departmental').removeClass('group__type--active');
		$('.groups--departmental').addClass('display--none');
		$('.groups--council').removeClass('display--none');
	});
	
	}

	render(){
		return(
			<div className = "groupsAll">
					<Helmet>    
			            <link rel="canonical" href="http://yourdomain.com/groups/all/"/>
			        </Helmet>
					<Header />
				    <div className="wrapper--groups flex-direction-column display--flex vertical-align--center horizontal-align--center">
					<div className="groups__head">
						<h1> GROUPS </h1>
						<div className="groups__description h1--smaller"> The Student Technical Council consists of 14 Groups as well as various Departmental Societies, they function as the ‘Hub of Technovation’ of IITR </div>
					</div>

					<div className="group__switcher display--flex"> 
						<div className="group__type--council h2--large group__type--active">
							COUNCIL
						</div>
						<div className="group__type--departmental h2--large">
							DEPARTMENTAL	
						</div>
					</div>

					<div className="wrapper--group-cards">
						
						<div className="groups--council">


								{councilGroupList.map((groups) => {
									return(
							<div className="display--flex group-cards">
									{groups.map((group)=>{
										return(

									<div className="group-card">
										<a href={"/groups/"+ group.name } className="group-card-hover display--flex horizontal-align--center vertical-align--center">
											<h2> VIEW MORE </h2>
										</a>
										<div className="group-card__name display--flex vertical-align--center"> 
											<h2> {group.title} </h2> 
										</div>
										<div className="group-card__img-div">
											<img className="group-card__img" alt="group-pic" src={process.env.PUBLIC_URL+ "/images/" + group.name + ".jpg"}/>
										</div>
									</div>
											);
									})}

							</div>
										);
								})}
						</div>

					<div className="groups--departmental display--none">
							{deptGroupList.map((groups) => {
									return(
							<div className="display--flex group-cards">
									{groups.map((group)=>{
										return(

									<div className="group-card">
										<a href={"/groups/"+ group.name } className="group-card-hover display--flex horizontal-align--center vertical-align--center">
											<h2> VIEW MORE </h2>
										</a>
										<div className="group-card__name display--flex vertical-align--center"> 
											<h2> {group.title} </h2> 
										</div>
										<div className="group-card__img-div">
											<img className="group-card__img" alt="group-pic" src={process.env.PUBLIC_URL + "/images/" + group.name + ".jpg"}/>
										</div>
									</div>
											);
									})}
									
							</div>
										);
								})}
					</div>
					</div>
				</div>
				<Footer/>
			</div>
			);
	}
}

export default AllGroups;