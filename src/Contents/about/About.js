import React from 'react';
import '../../App.css';
import Header from '../../Components/Header.js';
import Footer from '../../Components/Footer.js';
import {council} from './council';

class About extends React.Component{

	render(){
		return(
			<div className="About">
          <Header />
          <div className="wrapper--about display--flex flex-direction-column vertical-align--center horizontal-align--center">
          <div className="about__row about__head display--flex vertical-align--center">
            <h1> ABOUT </h1>
          </div>  
          <div className="about__head--description about__row h2--large"> 
            The Student Technical Council is the official technical faction of IIT Roorkee, which consists of 14 multi faceted groups and respective Departmental Societies. These groups work on different sectors of the tech world and participate in competitions around the globe.
          </div>
          <div className="about__row about__head display--flex vertical-align--center">
            <h1> COUNCIL </h1>
          </div>
          <div>
            {council.map((item)=>{
                  return (
                    <div className="about__row a-cards__row display--flex">
                      {item.map((student)=>{
                        return(
                        <div className="about-card display--flex">
                          <div className="about-card__image">
                            <img src={process.env.PUBLIC_URL + '/images/demo_council.jpg'} alt="user"/>
                          </div>
                          <div className="about-card--data display--flex horizontal-align--space-evenly flex-direction-column ">
                            <div className="about-card__head">
                              {student.name} 
                            </div>
                            <div className="about-card__description">
                              {student.designation} 
                            </div>
                          </div>
                        </div>      
                            );
                             })
                        }
                    </div>
                    );
            })
          }
        </div>
         </div> 
       <Footer />  
       </div> 
			);
	}
}

export default About;