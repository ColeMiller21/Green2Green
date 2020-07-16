import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import "./mediastyles.css";


class SignInForm extends React.Component {

    state = {
        email: "",
        password: "",
        currentUser: {},
        submitError: false
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        //values from the input fields 
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(`/api/auth`, user)
            .then(res => {
                if (res.data) {
                    let data = res.data
                    //setting currentUser to use the token in header of axios.get req
                    this.setState({
                        currentUser: {
                            token: data.token,
                            email: data.user.email,
                            id: data.user.id
                        }
                    })
                    ///////set local storage with token and user information///////
                    localStorage.setItem('token', this.state.currentUser.token)
                    //pushing to Homepage once user is given a token
                    this.props.history.push('/home');
                }
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                    this.setState({ submitError: true })
                }
            })
    }

    render() {
        return (
            <div style={styles.background}>
                <div className="text-center">
                    <h1 className="heading">Green 2 Green</h1>
                </div>
                <div style={styles.formDiv}>
                    <div className="justify-content-md-center col-md-auto" style={styles.formStyle}>
                        <h1 className="text-center" style={{ fontFamily: 'Rock Salt, cursive' }}>Sign In!</h1>

                        <div className="text-center">
                            <TextField
                                name="email"
                                label="Email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                margin="normal"
                            />
                        </div>
                        <div className="text-center">
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                margin="normal"
                            />
                        </div>
                        <div className="text-center">
                            <Link to="/home">
                                <button type="button" name="password" onClick={this.onSubmit} className="btn btn-success" style={{ marginBottom: '6px', marginTop: '15px' }} >Log In</button>
                            </Link>
                            <p>Not a member yet? Sign up <Link to="/signup">here!</Link></p>
                            {this.state.submitError ? <p style={{ color: 'red', fontSize: "12px" }}>Error logging up make sure information is correct </p> : <p></p>}

                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

const styles = {
    formStyle: {
        backgroundColor: 'white',
        padding: '2rem 3rem 2rem 3rem ',
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





export default SignInForm;