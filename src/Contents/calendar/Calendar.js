import React from 'react';
import $ from 'jquery';
import '../../App.css';
import Header from '../../Components/Header.js';
import Footer from '../../Components/Footer.js';
import {Helmet} from "react-helmet";

class Calendar extends  React.Component{

	componentDidMount = () => {
	$(document).ready(function() {
	const leftNavList = $('.c-left-nav__month');
	const arrowUp = $('.calendar--up');
	const arrowDown = $('.calendar--down');
	const months = $('.month');
	let translate = 0;
	let topInView = 0;
	let downInView = 2;
	let upActive = false; 
	let downActive = true; 
	let active = 0;
	let offsets = [];
	let offsetMargin = $(window).height()/3.5;
	let firstmonthOffset = months[0].offsetTop;

	let marginTop = $('.date__row').css('margin-top');
	marginTop= parseInt(marginTop.replace('px',''));

	const calcOffsets = function () {
		offsets = [0];
		$.each(months, (index, month) => {
			offsets.push(month.offsetTop + month.offsetHeight + marginTop - firstmonthOffset);
		});
	};

	const scrollTo = function(active) {
		$("html, body").animate({ scrollTop: offsets[active]},1000,'swing');	
	};

	const setScrollPermission = function (active) {
		if (active === 0)	{
			upActive = false;
			downActive = true;
		} else if (active === leftNavList.length - 1) {
			upActive = true;
			downActive = false;
		} else {
			upActive = downActive = true;
		}

		if(!upActive) {
			arrowUp.addClass('arrow--inactive');
		} else {
			arrowUp.removeClass('arrow--inactive');
		}

		if(!downActive) {
			arrowDown.addClass('arrow--inactive');
		} else {
			arrowDown.removeClass('arrow--inactive');
		}
	};

	const scrollAction = function(currentActive, nextActive, permission) {
		if (permission) {
			calcOffsets();
			
			leftNavList[currentActive].classList.remove('c-left-nav__month--active');
			leftNavList[nextActive].classList.add('c-left-nav__month--active');
			active = nextActive;
			
			if(active <topInView || active > downInView) {
				translate = (nextActive > currentActive) ? translate - 7.7: translate + 7.7;
				$('.c-left-nav__month').css('transform', 'translateY(' + translate + 'rem)');
				topInView = (nextActive > currentActive) ? topInView + 1: topInView - 1;
				downInView = (nextActive > currentActive) ? downInView + 1: downInView - 1;
			}

			setScrollPermission(active);
		}
	};

	calcOffsets();
	scrollTo(0);

	var tempactive = 0;
	$(window).on('scroll', function() {
		let pageOffset = window.pageYOffset + window.innerHeight;
		$.each(offsets, function(index, offset) {
			if(offsets[index] + firstmonthOffset + offsetMargin < pageOffset && pageOffset < offsets[index + 1] + firstmonthOffset + offsetMargin) {
				let nextActive = index;
				if(nextActive !== tempactive) {
					// console.log(tempactive, nextActive);
					scrollAction(tempactive, nextActive, true);
					tempactive = nextActive;
				}
			}
		});

	});

	$('.calendar--down').on('click', () => {
		let nextActive = active + 1;
		scrollAction(active, active + 1, downActive);
		scrollTo(nextActive);
	});

	$('.calendar--up').on('click', () => {
		let nextActive = active - 1;
		scrollAction(active, active - 1, upActive);
		scrollTo(nextActive);
	});

	$('.c-left-nav__month').on('click', function () {
		let nextActive = $(this).data('active');
		scrollAction(active, nextActive, true);
		scrollTo(nextActive);
	});

	const event_links = $('.c-read__more');

	const readMoreEvents = function(e) {
		let event_id = $(this).data('event');
		$('#' + event_id).toggleClass('height--auto');
		$(this).children('i').toggleClass('fa-chevron-down');
		$(this).children('i').toggleClass('fa-chevron-up');
		calcOffsets();
	}

	for(let i = 0; i < event_links.length; i++)
		event_links.eq(i).on('click', i, readMoreEvents);

	});
	}

	render(){
		return(
				<div className="Calendar">
					<Helmet>
			            <link rel="canonical" href="http://yourdomain.com/calendar/"/>
					</Helmet>
					<Header/>
					<div className="calendar__left-nav display--flex flex-direction-column vertical-align--flex-end">
						<div className="calendar--up arrow--inactive"> &uarr; </div>
						<div className="left-nav__list">
						
						
							
								<div className="c-left-nav__month c-left-nav__month--active" data-active="0"> Jan</div>
							
						
							
								<div className="c-left-nav__month" data-active="1"> Feb</div>
							
						
							
								<div className="c-left-nav__month" data-active="2"> March</div>
							
						
							
								<div className="c-left-nav__month" data-active="3"> Dec</div>
							
						
						</div>
						<div className="calendar--down"> &darr; </div>
					</div>

					<div className="wrapper--calendar">
						
						
								<div className="month">
									<div className="date__row display--flex">
									
										
										<div className="date">
											<div className="date__head">
												<div className="date__head--underline"> </div>
													01	
											</div>
											
												<div className="month__event display--flex flex-direction-column" id="Jan-01-1">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at SDS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> Mac Audi</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 6PM </div>		
													</div>
													<div className="c-read__more" data-event="Jan-01-1">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
												<div className="month__event display--flex flex-direction-column" id="Jan-01-2">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at DS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> STC</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 7PM </div>		
													</div>
													<div className="c-read__more" data-event="Jan-01-2">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
												<div className="month__event display--flex flex-direction-column" id="Jan-01-3">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at DS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> STC</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 7PM </div>		
													</div>
													<div className="c-read__more" data-event="Jan-01-3">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
											
												</div> 
											

									
										
										<div className="date">
											<div className="date__head">
												<div className="date__head--underline"> </div>
													02	
											</div>
											
												<div className="month__event display--flex flex-direction-column" id="Jan-02-1">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at SDS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> Mac Audi</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 6PM </div>		
													</div>
													<div className="c-read__more" data-event="Jan-02-1">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
												<div className="month__event display--flex flex-direction-column" id="Jan-02-2">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at DS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> STC</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 7PM </div>		
													</div>
													<div className="c-read__more" data-event="Jan-02-2">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
											
												</div> 
												</div> 
												<div className="date__row display--flex"> 
											

									
										
										<div className="date">
											<div className="date__head">
												<div className="date__head--underline"> </div>
													21	
											</div>
											
												<div className="month__event display--flex flex-direction-column" id="Jan-21-1">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at SDS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> Mac Audi</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 6PM </div>		
													</div>
													<div className="c-read__more" data-event="Jan-21-1">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
												<div className="month__event display--flex flex-direction-column" id="Jan-21-2">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at DS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> STC</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 7PM </div>		
													</div>
													<div className="c-read__more" data-event="Jan-21-2">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
											
												</div> 
											

									
									</div>
								</div>
						
								<div className="month">
									<div className="date__row display--flex">
									
										
										<div className="date">
											<div className="date__head">
												<div className="date__head--underline"> </div>
													01	
											</div>
											
												<div className="month__event display--flex flex-direction-column" id="Feb-01-1">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at SDS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> Mac Audi</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 6PM </div>		
													</div>
													<div className="c-read__more" data-event="Feb-01-1">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
												<div className="month__event display--flex flex-direction-column" id="Feb-01-2">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at DS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> STC</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 7PM </div>		
													</div>
													<div className="c-read__more" data-event="Feb-01-2">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
											
												</div> 
											

									
										
										<div className="date">
											<div className="date__head">
												<div className="date__head--underline"> </div>
													11	
											</div>
											
												<div className="month__event display--flex flex-direction-column" id="Feb-11-1">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at SDS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> Mac Audi</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 6PM </div>		
													</div>
													<div className="c-read__more" data-event="Feb-11-1">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
												<div className="month__event display--flex flex-direction-column" id="Feb-11-2">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at DS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> STC</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 7PM </div>		
													</div>
													<div className="c-read__more" data-event="Feb-11-2">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
											
												</div> 
												</div> 
												<div className="date__row display--flex"> 
											

									
									</div>
								</div>
						
								<div className="month">
									<div className="date__row display--flex">
									
										
										<div className="date">
											<div className="date__head">
												<div className="date__head--underline"> </div>
													13	
											</div>
											
												<div className="month__event display--flex flex-direction-column" id="March-13-1">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at SDS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> Mac Audi</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 6PM </div>		
													</div>
													<div className="c-read__more" data-event="March-13-1">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
												<div className="month__event display--flex flex-direction-column" id="March-13-2">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at DS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> STC</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 7PM </div>		
													</div>
													<div className="c-read__more" data-event="March-13-2">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
											
												</div> 
											

									
										
										<div className="date">
											<div className="date__head">
												<div className="date__head--underline"> </div>
													04	
											</div>
											
												<div className="month__event display--flex flex-direction-column" id="March-04-1">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at SDS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> Mac Audi</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 6PM </div>		
													</div>
													<div className="c-read__more" data-event="March-04-1">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
												<div className="month__event display--flex flex-direction-column" id="March-04-2">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at DS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> STC</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 7PM </div>		
													</div>
													<div className="c-read__more" data-event="March-04-2">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
											
												</div> 
												</div> 
												<div className="date__row display--flex"> 
											

									
										
										<div className="date">
											<div className="date__head">
												<div className="date__head--underline"> </div>
													01	
											</div>
											
												<div className="month__event display--flex flex-direction-column" id="March-01-1">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at SDS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> Mac Audi</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 6PM </div>		
													</div>
													<div className="c-read__more" data-event="March-01-1">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
												<div className="month__event display--flex flex-direction-column" id="March-01-2">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at DS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> STC</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 7PM </div>		
													</div>
													<div className="c-read__more" data-event="March-01-2">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
											
												</div> 
											

									
									</div>
								</div>
						
								<div className="month">
									<div className="date__row display--flex">
									
										
										<div className="date">
											<div className="date__head">
												<div className="date__head--underline"> </div>
													30	
											</div>
											
												<div className="month__event display--flex flex-direction-column" id="Dec-30-1">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at SDS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> Mac Audi</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 6PM </div>		
													</div>
													<div className="c-read__more" data-event="Dec-30-1">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
												<div className="month__event display--flex flex-direction-column" id="Dec-30-2">
													<div className="event__data display--flex">
														<i className="fa fa-calendar"></i>
														<div className="event__text"> Meeting at DS </div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-map-marker"></i>
														<div className="event__location"> STC</div>
													</div>
													<div className="event__data display--flex"> 
														<i className="fa fa-clock-o"></i>
														<div className="event__time"> 7PM </div>		
													</div>
													<div className="c-read__more" data-event="Dec-30-2">
														<i className="fa fa-chevron-down"></i>
													</div>
												</div>
											
											
												</div> 
											

									
									</div>
								</div>
						
					</div>
					<Footer/>
				</div>
			);
	}
}

export default Calendar;