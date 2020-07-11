import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Row, BreadcrumbItem, Breadcrumb, Button, CardText } from 'reactstrap'
import { Link } from 'react-router-dom';
import 'tachyons';


class AdminHome extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isSignedIn: false,
            route: 'signout',
            signInEmail: '',
            signInPassword: '',
            cardItems : [
                {   
                    id: 0,
                    title: 'Create Notice',
                    img: require('./assets/img/Notice.jpg'),
                    content: 'Any group Secy or Gensec has rights to add notice! But it will be approved by Gensec.',
                    link1: ['Add Notice','/admin/create/notice'],
                    link2: ['All Notices','/notices']
                },
                {
                    id: 1,
                    title: 'Create Achievement',
                    img: require('./assets/img/Notice.jpg'),
                    content: 'Only Gensec has rights to add an acheivement!',
                    link1: ['Add Achievement ','/admin/create/achievement'],
                    link2: ['All Achievements','/achievements']
                },
                {   
                    id: 2,
                    title: 'Create Award',
                    img: require('./assets/img/Notice.jpg'),
                    content: 'Only Gensec has rights to add an award!',
                    link1: ['Add Award','/admin/create/award'],
                    link2: ['All Awards','/achievements']
                },
                {
                    id: 3,
                    title: 'Create Project',
                    img: require('./assets/img/Notice.jpg'),
                    content: 'Any group Secy or Gensec has rights to add project!',
                    link1: ['Add Project','/admin/create/project'],
                    link2: ['All Projects','/projects/all']
                },
                {
                    id: 4,
                    title: 'Create Event (Calender Update)',
                    img: require('./assets/img/Notice.jpg'),
                    content: '',
                    link1: ['Add Event','/admin/create/event'],
                    link2: ['Calender','/calendar']
                },
            ],

        };
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
            
                if(response.status!== 401 && response.status !== 400 ){
                    response.json()
                    .then(data => {
   
                    if(data.user.email) { 
                        console.log(data);
                        localStorage.setItem('user',JSON.stringify(data.user))
                        if(data.user.role === 1)
                            {
                                this.onRouteChange('admin');
                            }
                        else
                            {
                                this.onRouteChange('home');
                            }

                    }
                })
                }

                else{
                    alert("Invalid Credentials.Please try Again!");
                }
                
                
        }).catch(function(err){        
                        alert("Invalid Credentials.Please try Again!");
                    });
    }

    onRouteChange = (route) => {
        if(route === 'signout')
        {
          this.setState({isSignedIn:false})
          localStorage.setItem('isSignedIn',false);
          localStorage.removeItem('user');
        }
        else if (route === 'home'|| route === 'admin')
        {
          this.setState({isSignedIn: true})
          localStorage.setItem('isSignedIn',true);
        }

        this.setState({route: route});
        localStorage.setItem('route',JSON.stringify(route));
    }

    hydrateStateWithLocalStorage() {
        let loggedState = localStorage.getItem('isSignedIn');
        let currentRoute = localStorage.getItem('route');
        let userData = localStorage.getItem('user');
        console.log(loggedState,currentRoute);
        console.log(userData);
        if(loggedState === true) {

            this.setState({
                isSignedIn: true,
                route: currentRoute,
            })
        }
        else
        {
            this.setState({
                isSignedIn: false,
                route: 'signout',
            })
        }
    }

    componentDidMount(){
        document.head.innerHTML+= '<link id ="bootstrap " href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">' ;
        this.hydrateStateWithLocalStorage();        

    }

    componentWillUnmount(){

        document.querySelector("#bootstrap\\ ").remove();
    }

    render() { 
        return (
            <div className="Adminhome">
                {   
                    this.state.isSignedIn === true
                    ?<div className="container">
                                    <Row>
                                        <Breadcrumb className="col-12 col-md-12">
                                            <BreadcrumbItem active>Admin Home</BreadcrumbItem>
                
                                            {/* This will be only visible to gensec */}
                                            <div className="ml-auto">
                                            { this.state.route==='admin'
                                                ? <div>
                                                        <p>Welcome,SuperAdmin</p>
                                                        <Link to="/admin/create/group" >
                                                            <Button color="outline-primary">Create Group</Button>   
                                                        </Link>
                                                    </div>
                                                :<div><p>Welcome,User</p></div>    
                                            }
                                            <Link to="/home">
                                                <Button color="outline-primary">Return to main page</Button>   
                                            </Link>                                             
                                              <Button color="outline-primary" onClick={() => this.onRouteChange('signout')} >Sign Out</Button>  
                                            </div>
                                            
                
                                        </Breadcrumb>
                                        <div className="col-12 col-md-12">
                                            <hr />
                                        </div>
                                    </Row>
                                    <div className="row">
                                        {this.state.cardItems.map((item)=>{
                                            return (
                                                <div key={item.id} className="col-12 col-sm-6 col-md-6 col-lg-4" style={{paddingBlock:"20px"}}>
                                                    <Card>
                                                        <CardBody>
                                                            <CardTitle><h5> {item.title} </h5></CardTitle>
                                                        </CardBody>
                                                        <img width="100%" src={item.img} alt={item.title} />
                                                        <CardBody>
                                                            <div className="row container">
                                                                <CardText> {item.content} </CardText><br />
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-6 col-sm-6">
                                                                    <Link to={item.link1[1]}>
                                                                        <Button className="btn-block"> {item.link1[0]} </Button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-6 col-sm-6">
                                                                    <Link to={item.link2[1]}>
                                                                        <Button className="btn-block"> {item.link2[0]} </Button>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                            );
                                        })}
                                        
                                    </div>
                                </div> 

                               : (
                                    <div className="SignIn">
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
                                    </div>        
                                                          ) 
                                                                                    
                                                    }
                                    </div>            
        );
    }
}
 
export default AdminHome;