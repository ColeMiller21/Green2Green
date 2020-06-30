import React from 'react';
import { Link } from 'react-router-dom';


class SignInForm extends React.Component {

    state = {
        email: "",
        password: ""
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("button clicked")

    }

    render() {
        return (
            <div style={styles.background}>
                <div style={styles.formDiv}>
                    <div className="justify-content-md-center col-md-auto" style={styles.formStyle}>
                        <h1 className="text-center">Sign In!</h1>
                        <label>Email</label>
                        <div className="input-group mb-3">
                            <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} required className="form-control" id="username" aria-describedby="basic-addon3" />
                        </div>
                        <label>Password</label>
                        <div className="input-group mb-3">
                            <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required className="form-control" id="password" aria-describedby="basic-addon3" />
                        </div>
                        <div className="text-center">
                            <Link to="/home">
                                <button type="button" name="password" onClick={this.onSubmit} className="btn btn-success" style={{ marginBottom: '6px' }} >Log In</button>
                            </Link>
                            <p>Not a member yet? Sign up <Link to="/signup">here!</Link></p>
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