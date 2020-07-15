import React, { Component } from 'react';
import {Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Label, Col, Container, Breadcrumb, BreadcrumbItem, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;

class CreateEvent extends Component {

    handleSubmit = (values) => {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // Also take the values from Date, startTime & endTime to send to the backend..
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
                            <BreadcrumbItem><Link to="/home">Admin Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Create Event</BreadcrumbItem>
                            <Link to="/home" className="ml-auto">
                                <Button color="outline-primary">Back</Button>   
                            </Link>
                        </Breadcrumb>
                        <div className="col-12 col-md-9">
                            <h3>Create Event</h3>
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
                                            placeholder="Title for the Event..."
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
                                    <Label htmlFor=".venue" md={2}>Venue:</Label>
                                    <Col md={10}>
                                        <Control.text model=".venue"
                                            id="venue"
                                            name="venue"
                                            placeholder="Venue for the Event..."
                                            className="form-control"
                                            validators={{
                                                required
                                            }} 
                                        />
                                        <Errors 
                                            className="text-danger"
                                            show="touched"
                                            model=".venue"
                                            messages={{
                                                required: 'This is a Required Field!'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor=".date" md={2}>Date:</Label>
                                    <Col md={10}>
                                        <Input type="date"
                                            model=".date"
                                            id="date"
                                            name="date"
                                            defaultValue="2021-01-01"
                                            // value="2021-01-01"
                                            className="form-control"
                                            required
                                        />
                                        {/* <Errors 
                                            className="text-danger"
                                            show="touched"
                                            model=".date"
                                            messages={{
                                                required: 'This is a Required Field!'
                                            }}
                                        /> */}
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor=".startTime" md={2}>Start Time:</Label>
                                    <Col md={10}>
                                        <Input type="time"
                                            id="startTime"
                                            name="startTime"
                                            defaultValue="00:00"
                                            // value="2021-01-01"
                                            className="form-control"
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor=".endTime" md={2}>End Time:</Label>
                                    <Col md={10}>
                                        <Input type="time"
                                            id="endTime"
                                            name="endTime"
                                            defaultValue="00:01"
                                            // value="2021-01-01"
                                            className="form-control"
                                            required
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
 
export default CreateEvent;