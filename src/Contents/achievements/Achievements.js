import React from 'react';
import '../../App.css';
import Header from '../../Components/Header.js';
import Footer from '../../Components/Footer.js';
import $ from 'jquery';
import {Helmet} from "react-helmet"; 
import {achievements} from './AchievementsList';

class Achievements extends React.Component{

	componentDidMount = () => {
		$('.achievements__head--awards').click(function() {
		$('.achievements__head--awards').addClass('achievements__head--active');
		$('.achievements__head--recent').removeClass('achievements__head--active');
		$('.all-achievements').addClass('display--none');
		$('.all-awards').removeClass('display--none');
	});

	$('.achievements__head--recent').click(function() {
		$('.achievements__head--recent').addClass('achievements__head--active');
		$('.achievements__head--awards').removeClass('achievements__head--active');
		$('.all-achievements').removeClass('display--none');
		$('.all-awards').addClass('display--none');
	});
	}	

	render(){
		return(
			<div className="Achievements">
				<Helmet>
		            <link rel="canonical" href="http://yourdomain.com/achievements/"/>
		        </Helmet>
				<Header />
						 <div className="wrapper--achievements">
						<div className="achievements__head display--flex vertical-align--center">
							<div className="h1--smaller achievements__head--recent achievements__head--active"> RECENT </div>
							<div className="h1--smaller achievements__head--awards"> AWARDS </div>
						</div>	
						
						<div className="all-awards display--none">
						
							{achievements.map((item)=>{
                            return (
                                
									<div className="award">
										<div className="award__info display--flex">
											<i className="fa fa-star"> </i>
											<p>	<p>{item}</p>
							 </p>
										</div>
									</div>
		                            );
	                        })}
						
							
						</div>
							
						<div class = "all-achievements">
						
							
								<div className="achievement__card display--flex">
									<div className="achievement__image">
										<img src={process.env.PUBLIC_URL + '/images/achievements1.png'} alt="achievements"/>
									</div>
									<div className="achievement__info">
										<div className="achievement__head h1--smaller">
											Achievement Title
										</div>
										<div className="achievement__content h3--small">
											<p>IIT Roorkee was the Runner-up at the 6th Inter IIT Tech Meet 2017 held at IIT Madras.</p>

										</div>
									</div>
								</div>
							
						</div>
					</div>
				<Footer />
			</div>
			);
	}
}
export default Achievements;