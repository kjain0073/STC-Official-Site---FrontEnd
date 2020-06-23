import React from 'react';
import './App.css';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import SideBar from './Components/SideBar.js';
import {Helmet} from "react-helmet"; 
 

class Home extends React.Component {

  render(){
    return (
      <div className="Home">
          <Helmet>
            <link rel="canonical" href="http://yourdomain.com/"/>
          </Helmet>
             <Header/>
          <div className="wrapper--home position--fixed">
             <SideBar />
            <div className="main-bg">
            </div>
            <div className="h-head">
              <div className="h-head-main">
                STUDENTS' <br/> TECHNICAL COUNCIL
              </div>
              <div className="h-head-content h2--large">
                “Dreams transform into thoughts and thoughts result in actions” -  ABJ Abdul Kalam  
              </div>
            </div>
          </div>  
          <Footer/>
      </div>
    );
  }
}

export default Home;



