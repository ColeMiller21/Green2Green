import React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './mediastyles.css';

class SignUpForm extends React.Component {
    state = {

        email: '',
        password: '',
        confirmPassword: "",
        submitError: false,
        buttonDisabled: true
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {

                return false
            }
            this.setState({ buttonDisabled: false })
            return true;
        })
    }

    componentWillUnmount() {
        ValidatorForm.removeValidationRule('isPasswordMatch')
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.submitError) {
            this.setState({ submitError: true })

        }
        else {

            let newUser = {
                email: this.state.email,
                password: this.state.password
            }
            axios.post(`/api/users`, newUser)
                .then(res => {
                    if (res.data) {
                        console.log(res.data)
                        let data = res.data;
                        console.log(data.user.id)
                        this.props.history.push('/');
                    } else {
                        alert("Sign up unsuccessful")
                        //maybe submit error here 
                    }
                })
                .catch(err => {
                    if (err) {
                        this.setState({ submitError: true })
                    }
                })
        }
    }
    render() {
        return (
            <div style={styles.background}>
                <div className="text-center">
                    <h1 className="heading">Green 2 Green</h1>
                </div>
                <div style={styles.formDiv}>
                    <div className="justify-content-md-center col-md-auto" style={styles.formStyle}>
                        <h1 className="text-center" style={{ fontFamily: 'Rock Salt, cursive' }}>Sign Up!</h1>

                        <ValidatorForm
                            ref="form"
                            onSubmit={this.onSubmit}
                        >
                            <div className="text-center">
                                <TextValidator
                                    label="Email"
                                    onChange={this.handleChange}
                                    name="email"
                                    value={this.state.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                    margin="normal"
                                />
                            </div>
                            <div className="text-center">
                                <TextValidator
                                    label="Password"
                                    onChange={this.handleChange}
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    margin="normal"
                                />
                            </div>
                            <div className="text-center">
                                <TextValidator
                                    label="Confirm Password"
                                    onChange={this.handleChange}
                                    name="confirmPassword"
                                    type="password"
                                    validators={['isPasswordMatch', 'required']}
                                    errorMessages={['password mismatch', 'this field is required']}
                                    value={this.state.confirmPassword}
                                    margin="normal"
                                />
                            </div>

                            <div className="text-center">
                                <Link to="/home">
                                    <button type="submit" name="password" disabled={this.state.buttonDisabled} onClick={this.onSubmit} className="btn btn-success" style={{ marginBottom: '10px', marginTop: '20px' }} >Sign Up</button>
                                </Link>
                            </div>
                            <div className="text-center">
                                {this.state.submitError ? <p style={{ color: 'red', fontSize: "12px", fontFamily: 'Roboto, sans-serif' }}>Error signing up make sure information is correct </p> : <p></p>}
                            </div>
                        </ValidatorForm>
                    </div>
                </div>
            </div >
        );
    }
}

const styles = {
    formStyle: {
        backgroundColor: 'white',
        padding: '2rem 3.5rem 2rem 3.5rem',
        borderRadius: '25px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
    background: {
        background: 'linear-gradient(226deg, rgb(15, 114, 68) 48%, rgb(17, 97, 73) 100%)',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0
    },
    formDiv: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

export default SignUpForm;

