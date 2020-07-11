import React, { Component } from 'react';
import {Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Label, Col, Container, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


const required = (val) => val && val.length;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
const validPass = (val) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(val)

class CreateGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    handleSubmit = (values) => {
        console.log('Current State is: ' + JSON.stringify(values));
        fetch('http://162.243.168.224:3000/signUp',{
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password
            })
        })
        .then(response => {
            
                if(response.status!== 401 && response.status !== 400 ){
                  response.json()
                  .then((data) => {  
                    if (data.user.email) 
                        alert("Successfully Added!");
                })
                }

                else{
                    alert("Group Name already exists!");
                }
                
                
        }).catch(function(err){        
                        alert("Error! Group Details Not Sent");
                    });
        
    }
    componentDidMount(){
        document.head.innerHTML+= '<link id ="bootstrap " href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">' ;
    }
    componentWillUnmount(){

        document.querySelector("#bootstrap\\ ").remove();
    }

    render() { 
        return ( 
            <section>
                <Container>
                    <Row>
                        <Breadcrumb className="col-12 col-md-9">
                            <BreadcrumbItem><Link to="/admin/home">Admin Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Create Group</BreadcrumbItem>
                            <Link to="/admin/home" className="ml-auto">
                                <Button color="outline-primary">Back</Button>   
                            </Link>
                        </Breadcrumb>
                        <div className="col-12 col-md-9">
                            <h3>Create Group</h3>
                            <hr />
                        </div>
                    </Row>
                    <Row>
                        <div className="col-12 col-md-9">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor=".name" md={2}>Group Name:</Label>
                                    <Col md={10}>
                                        <Control.text model=".name"
                                            id="name"
                                            name="name"
                                            placeholder="Group Name"
                                            className="form-control"
                                            validators={{
                                                required
                                            }} 
                                        />
                                        <Errors 
                                            className="text-danger"
                                            show="touched"
                                            model=".name"
                                            messages={{
                                                required: 'This is a Required Field!'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor=".email" md={2}>Email:</Label>
                                    <Col md={10}>
                                        <Control.text 
                                            model=".email"
                                            id="email"
                                            name="email"
                                            placeholder="abc@xy.iitr.ac.in"
                                            className="form-control"
                                            validators={{required, validEmail}}
                                        />
                                       <Errors
                                            className="text-danger"
                                            show="touched"
                                            model=".email"
                                            messages={{
                                                required: 'Required! ',
                                                validEmail: 'Invalid Email! '
                                            }}
                                        /> 
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor=".password" md={2}>Password:</Label>
                                    <Col md={10}>
                                        <Control.text model=".password"
                                            id="password"
                                            name="password"
                                            placeholder="Enter Password "
                                            className="form-control"
                                            validators={{
                                                required,validPass,
                                            }} 
                                        />
                                        <Errors 
                                            className="text-danger"
                                            show="touched"
                                            model=".password"
                                            messages={{
                                                required: 'This is a Required Field! ',
                                                validPass: 'Must contain minimum 8 characters with atleast 1 number and 1 letter ',
                                            }}
                                        />
                                    </Col>
                                </Row>
                                
                                <Row className="form-group">
                                    <Col md={{size: 10, offset: 2}}>
                                        <Button type="submit" color="outline-primary">
                                            Submit
                                        </Button>
                                    </Col>
                                    
                                </Row>
                                
                            </LocalForm>
                        </div>
                    </Row>
                </Container>
            </section>
        );
    }
}
 
export default CreateGroup;