import React from 'react';
import '../App.css';
import $ from 'jquery';

class SideBar extends React.Component{
	
	componentDidMount = () => {
	
		$(document).ready(function(){
			$('.arrow--right').click(function(){
			$('.h-notice').toggleClass('h-notice--main');
			$('.notices-list').toggleClass('notices-list--main')
			$('.arrow--right>i').toggleClass('arrow--left');
			$('.h-notice__all').toggleClass('h-notice__all--main');
			$('.main-bg').toggleClass('main-bg--blur');
			$('.h-head').toggleClass('h-head--disappear');
				});
			});
	}		

	render(){
		return(
			<div className="SideBar">
					<div className="notices-list notices-list--main display--flex vertical-align--center flex-direction-column horizontal-align--space-evenly">
        
        
				          <div className="h-notice h-notice--main display--flex">
				            <div className="h-notice__number">
				              <div>
				                01 
				              </div>
				            </div>
				            <div className="h-notice__content display--flex flex-direction-column">
				              <h2>
				                <p>Notice Content Lorem ipsum dolor sit amet, consectetur adipis . . . </p>
				              </h2>
				              <div className="h-notice__date">
				                  <h2> Aug 07 </h2>
				              </div>
				            </div>
				          </div>  
				        
				          <div className="h-notice h-notice--main display--flex">
				            <div className="h-notice__number">
				              <div>
				                02 
				              </div>
				            </div>
				            <div className="h-notice__content display--flex flex-direction-column">
				              <h2>
				                <p>Notice Content Lorem ipsum dolor sit amet, consectetur adipis . . . </p>
				              </h2>
				              <div className="h-notice__date">
				                  <h2> Aug 07 </h2>
				              </div>
				            </div>
				          </div>  
				        
				        <div className="h-notice__all h-notice__all--main h1--smaller">
				          <a href="/notices/"> ALL NOTICES </a>
				        </div>
				        <div className="arrow--right display--flex vertical-align--center horizontal-align--center">
				          <i className="fa fa-arrow-right" aria-hidden="true"></i>
				        </div>


			      </div>
			</div>
			);
	}
}

export default SideBar;