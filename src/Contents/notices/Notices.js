 /* eslint-disable */ 
import React from 'react';
import '../../App.css';
import Header from '../../Components/Header.js';
import Footer from '../../Components/Footer.js';
import $ from 'jquery';
import {Helmet} from "react-helmet";
import {noticeList} from './NoticesList'

class Notices extends React.Component{
	
	componentDidMount=()=>{
		var notices = $('.content__link');
		var length = notices.length;
		var readMore = function(e){
				e.preventDefault();
				var notice_no = e.data+1;
				$('.content__text.notice--'+notice_no).toggleClass('height--auto')
				$('.ellipsis.notice--'+notice_no).toggleClass('display--none');
				$('.content__link.notice--'+notice_no+' i').toggleClass('fa-chevron-down');
				$('.content__link.notice--'+notice_no+' i').toggleClass('fa-chevron-up');
			};
		

		for(var i=0;i<length; i++){
			$('.content__link').eq(i).on('click', i, readMore)
		}
	}

	render(){
		return(
			<div className="Notices">
				<Helmet>
		             <link rel="canonical" href="http://yourdomain.com/notices/"/>
		        </Helmet>
				<Header/>
				<div className="wrapper--notices display--flex vertical-align--center horizontal-align--center flex-direction-column">

					<div className="notices__element notices__element--head display--flex vertical-align--center">
						<h1> NOTICES </h1>
					</div>
					
					{noticeList.map((item)=>{
						return(

						<div className="notices__element notices--notice display--flex">
							<div className="notice--number h1--small"> 
									
										<div className="number__text"> {item.id} </div>
									
							</div>
							<div className="notice--content h1--smaller" data-number={"" + item.dataNumber }> 
								<div className={"content__text notice--" + item.dataNumber}>
									<p>{item.content}</p>

									<div className={"ellipsis notice--" + item.dataNumber}>...</div>
								</div>
								<div className={"content__link notice--" + item.dataNumber + "h1--smaller"}>
									<a href="#"> Read More </a>
									<i className="fa fa-chevron-down"></i>
								</div>
							</div>
							<div className="notice--date h1--smaller"> {item.date}</div>
						</div>
					
							);
					})}
				</div>
				<Footer/>
			</div>
			);
	}
}
export default Notices;
