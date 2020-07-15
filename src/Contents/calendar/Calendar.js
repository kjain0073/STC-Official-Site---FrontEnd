/*eslint-disable*/
import React from 'react';
import $ from 'jquery';
import '../../App.css';
import Header from '../../Components/Header.js';
import MobileHeader from '../../Components/MobileHeader.js';
import Footer from '../../Components/Footer.js';
import {Helmet} from "react-helmet";

class Calendar extends  React.Component{

	isMobile() {
     let check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	  return check;
	  }	

	componentDidMount = () => {
	let mobile= this.isMobile()
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
	let marginTop =parseInt($('.date__row').css('margin-top'));
	let mobileMarginTop = parseInt($('.mobile-date__row').css('margin-top'));

	const calcOffsets = function () {
		offsets = [0];
		
		if(mobile===true)
		{	
			$.each(months, (index, month) => {
				offsets.push(month.offsetTop + month.offsetHeight + mobileMarginTop - firstmonthOffset);
			});
		}
		else
		{
			$.each(months, (index, month) => {
				offsets.push(month.offsetTop + month.offsetHeight + marginTop - firstmonthOffset);
			});
		}	
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
					{this.isMobile()===true
						?<div>
							<MobileHeader/>
							<div className="mobile-calendar__left-nav display--flex flex-direction-column vertical-align--flex-end">
								<div className="calendar--up arrow--inactive"> &uarr; </div>
								<div className="left-nav__list">
								
								
									
										<div className="c-left-nav__month c-left-nav__month--active" data-active="0"> Jan</div>
									
								
									
										<div className="c-left-nav__month" data-active="1"> Feb</div>
									
								
									
										<div className="c-left-nav__month" data-active="2"> March</div>
									
								
									
										<div className="c-left-nav__month" data-active="3"> Dec</div>
									
								
								</div>
								<div className="calendar--down"> &darr; </div>
							</div>

							<div className="mobile-wrapper--calendar">
								
								
										<div className="month">
											<div className="mobile-date__row display--flex">
											
												
												<div className="date">
													<div className="mobile-date__head">
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
													<div className="mobile-date__head">
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
														<div className="mobile-date__row display--flex"> 
													

											
												
												<div className="date">
													<div className="mobile-date__head">
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
											<div className="mobile-date__row display--flex">
											
												
												<div className="date">
													<div className="mobile-date__head">
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
													<div className="mobile-date__head">
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
														<div className="mobile-date__row display--flex"> 
													

											
											</div>
										</div>
								
										<div className="month">
											<div className="mobile-date__row display--flex">
											
												
												<div className="date">
													<div className="mobile-date__head">
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
													<div className="mobile-date__head">
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
														<div className="mobile-date__row display--flex"> 
													

											
												
												<div className="date">
													<div className="mobile-date__head">
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
											<div className="mobile-date__row display--flex">
											
												
												<div className="date">
													<div className="mobile-date__head">
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
						</div>
						:<div>
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

							<div className="mobile-wrapper--calendar">
								
								
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
						</div>
					}
					
					<Footer/>
				</div>
			);
	}
}

export default Calendar;