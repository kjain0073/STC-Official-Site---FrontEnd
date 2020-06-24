import React, { Component } from 'react';
import {Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Label, Col, Container, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;

class CreateNotice extends Component {

    handleSubmit = (values) => {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() { 
        return ( 
            <section>
                <Container>
                    <Row>
                        <Breadcrumb className="col-12 col-md-9">
                            <BreadcrumbItem><Link to="/admin/home">Admin Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Create Notice</BreadcrumbItem>
                            <Link to="/admin/home" className="ml-auto">
                                <Button color="outline-primary">Back</Button>   
                            </Link>
                        </Breadcrumb>
                        <div className="col-12 col-md-9">
                            <h3>Create Notice</h3>
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
                                            placeholder="Title for the Notice..."
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
                                    <Label htmlFor=".content" md={2}>Content:</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".content"
                                            id="content"
                                            name="content"
                                            rows="12"
                                            placeholder="Notice Content..."
                                            className="form-control"
                                            validators={{
                                                required
                                            }} 
                                        />
                                        <Errors 
                                            className="text-danger"
                                            show="touched"
                                            model=".content"
                                            messages={{
                                                required: 'This is a Required Field!'
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
 
export default CreateNotice;