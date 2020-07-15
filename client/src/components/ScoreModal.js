import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';



class ScoreModal extends React.Component {

    state = {
        courseName: "",
        frontNine: "",
        backNine: "",
        courseRating: "",
        courseSlope: "",
        totalScore: parseInt(0),
        formError: false
    }

    handleValidation = (state) => {
        console.log(state)
        if (state.courseName === "") {
            return false
        }
        if (state.frontNine === "") {
            return false
        }
        if (state.backNine === "") {
            return false
        }
        if (state.courseSlope === "") {
            return false
        }
        if (state.courseRating === "") {
            return false
        }
        else {
            return true
        }

    }


    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })


    }

    numberInputChange = (e) => {
        if (e.target.value === '' || /^\d+$/.test(e.target.value)) {
            this.setState({ [e.target.name]: e.target.value })
        } else {
            return false;
        }
    }


    onSubmit = (e) => {
        e.preventDefault();
        if (!this.handleValidation(this.state)) {
            console.log("Form Error")
            this.setState({ formError: true })

        } else {
            this.setState({ totalScore: Number(this.state.frontNine) + Number(this.state.backNine) }, () => {
                console.log("Form Submitted")
                this.setState({ formError: false })
                let newScore = {
                    //this will be the current user id
                    user: this.props.currentUser._id,
                    frontNine: this.state.frontNine,
                    backNine: this.state.backNine,
                    courseRating: this.state.courseRating,
                    courseSlope: this.state.courseSlope,
                    totalScore: this.state.totalScore,
                    courseName: this.state.courseName
                }

                axios.post(`/api/scores`, newScore)
                    .then(res => {
                        console.log(res)
                        this.setState({
                            courseName: "",
                            frontNine: parseInt(0),
                            backNine: parseInt(0),
                            courseRating: parseInt(0),
                            courseSlope: parseInt(0),
                            totalScore: parseInt(0)
                        })
                    })
                    .catch(err => console.log(err))
            })
            this.props.onHide();
            this.props.getScores();
        }
    }
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter text-center">
                        <div className="text-center">
                            <h1>Insert New Score</h1>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.onSubmit}
                    >
                        <Grid container spacing={4} className="text-center">
                            <Grid item xs={12} >
                                <TextValidator
                                    required
                                    fullWidth
                                    label="Course Name"
                                    onChange={this.handleInputChange}
                                    name="courseName"
                                    type="text"
                                    value={this.state.courseName}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6} className="text-center">
                                <TextValidator
                                    required
                                    label="Front Nine"
                                    onChange={this.numberInputChange}
                                    name="frontNine"
                                    type="number"
                                    value={this.state.frontNine}
                                    validators={['required', 'isNumber']}
                                    errorMessages={['this field is required']}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6} className="text-center">
                                <TextValidator
                                    label="Back Nine"
                                    onChange={this.numberInputChange}
                                    name="backNine"
                                    type="number"
                                    value={this.state.backNine}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6} className="text-center">
                                <TextValidator
                                    label="Course Rating"
                                    onChange={this.handleInputChange}
                                    name="courseRating"
                                    type="number"
                                    value={this.state.courseRating}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    margin="normal"

                                />
                            </Grid>
                            <Grid item xs={6} className="text-center">
                                <TextValidator
                                    label="Course Slope"
                                    onChange={this.numberInputChange}
                                    name="courseSlope"
                                    type="number"
                                    value={this.state.courseSlope}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <div className="text-center" style={{ marginTop: '25px' }}>
                            <button type="button" onClick={this.onSubmit} className="btn btn-success btn-block" >Submit Score</button>
                            <p>*All inputs must be filled out to properly access your handicap. If you need help read this <a href="https://golftips.golfweek.com/explanation-golf-scorecard-2458.html" target="_blank" rel="noopener noreferrer">article!</a> </p>
                            {this.state.formError ? <p style={{ color: 'red', fontSize: "12px", fontFamily: 'Roboto, sans-serif' }}>Error! Make sure all inputs are filled out correctly </p> : <p></p>}

                        </div>
                    </ValidatorForm>
                </Modal.Body>
            </Modal>
        )
    };
};



export default ScoreModal;