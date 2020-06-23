import React from 'react';
import '../../App.css';
import Header from '../../Components/Header.js';
import Footer from '../../Components/Footer.js';
import {Helmet} from "react-helmet"; 
import {equipmentList} from './EquipmentList';

class Equipment extends React.Component{
	render(){
		return(	
				<div className="Equipment">
					<Helmet>
			            <link rel="canonical" href="http://yourdomain.com/equipments/"/>
			        </Helmet>
					<Header />
					 <div className="wrapper--equipment flex-direction-column display--flex vertical-align--center horizontal-align--center">
						<div className="equipments__head">
							<div className="equipments__head--main" > <h1> EQUIPMENT </h1></div>
						</div>
						{equipmentList.map((item)=>{
							return(
							<div className="equipments__row display--flex">
								{item.map((group)=>{
									return(
											<div className="equipment">
												<div className="equipment__head">
													{group.name}
												</div>
												<div className="equipment__list">	
													{group.equipment.map((things)=>{
														return(
																<div className="equipment__list--item display--flex"> 
																		<i className="fa fa-circle" aria-hidden="true"></i>
																		<span className="h2--large">{things}</span> 
																</div>
															);
													})}
													
												</div>
											</div>	
										);
								})}
							</div>	
								);

						})}
						
						</div>
					<Footer />
				</div>
			);
	}
}

export default Equipment;