import React from 'react';
import 'tachyons';

class AdminSignIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
		}
	}
	onEmailChange = (event) =>{
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) =>{
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('http://162.243.168.224:3000/signIn',{
			method: 'post',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => {
				response.json()
				.then(data => {
					if(data.user.email) {
						console.log(data);
						this.props.onRouteChange('home');
					}
				})
		}).catch(function(err){
						alert("Invalid Credentials.Please try Again!");
					});
	}

	render() {
		// const {onRouteChange}=this.props;
		return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f4 fw6 ph0 mh0">Admin Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
			        type="email" 
			        name="email-address"  
			        id="email-address" 
			        onChange={this.onEmailChange}
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        className="b pa2 input-reset ba bg-transparent hover-bg-black w-100" 
			        type="password" 
			        name="password"  
			        id="password" 
			        onChange={this.onPasswordChange}
			        />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      onClick={this.onSubmitSignIn}
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign in" />
			    </div>	
			  </div>
			</main>
		</article>		
		);
	}
}

export default AdminSignIn;