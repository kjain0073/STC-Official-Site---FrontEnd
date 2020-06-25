import React, { Component } from 'react';
import {Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Label, Col, Container, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

class CreateUser extends Component {

    handleSubmit = (values) => {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
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
                            <BreadcrumbItem active>Create User</BreadcrumbItem>
                            <Link to="/admin/home" className="ml-auto">
                                <Button color="outline-primary">Back</Button>   
                            </Link>
                        </Breadcrumb>
                        <div className="col-12 col-md-9">
                            <h3>Create User</h3>
                            <hr />
                        </div>
                    </Row>
                    <Row>
                        <div className="col-12 col-md-9">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor=".title" md={2}>Title:</Label>
                                    <Col md={10}>
                                        <Control.text model=".title"
                                            id="title"
                                            name="title"
                                            placeholder="Eg., ArIES Secy..."
                                            className="form-control"
                                            validators={{
                                                required
                                            }} 
                                        />
                                        <Errors 
                                            className="text-danger"
                                            show="touched"
                                            model=".title"
                                            messages={{
                                                required: 'This is a Required Field!'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor=".name" md={2}>Full Name:</Label>
                                    <Col md={10}>
                                        <Control.text model=".name"
                                            id="name"
                                            name="name"
                                            placeholder="Full Name"
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
                                    <Label htmlFor=".contact" md={2}>Contact:</Label>
                                    <Col md={10}>
                                        <Control.text model=".contact"
                                            id="contact"
                                            name="contact"
                                            placeholder="Contact No."
                                            className="form-control"
                                            validators={{
                                                required, isNumber , minLength: minLength(4), maxLength: maxLength(12)
                                            }} 
                                        />
                                        <Errors 
                                            className="text-danger"
                                            show="touched"
                                            model=".contact"
                                            messages={{
                                                required: 'This is a Required Field! ',
                                                isNumber: 'Not a Number! ',
                                                minLength: 'Must be >= 4 numbers! ',
                                                maxLength: 'Must be <= 12 numbers!'
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
 
export default CreateUser;