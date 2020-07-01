import React from 'react';
import axios from 'axios';
import "./mediastyles.css";

class SignUpForm extends React.Component {
    state = {
        email: "",
        password: "",
        passwordConfirm: ""
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
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
                }
            })
            .catch(err => console.log(err))


    }
    render() {
        return (
            <div style={styles.background}>
                <div className="text-center">
                    <h1 className="heading">Green 2 Green</h1>
                </div>
                <div style={styles.formDiv}>
                    <div className="justify-content-md-center col-md-auto" style={styles.formStyle}>
                        <h1 className="text-center">Sign Up!</h1>
                        <label>Email</label>
                        <div className="input-group mb-3">
                            <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" aria-describedby="basic-addon3" />
                        </div>
                        <label>Password</label>
                        <div className="input-group mb-3">
                            <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" aria-describedby="basic-addon3" />
                        </div>
                        <label>Confirm Password</label>
                        <div className="input-group mb-3">
                            <input type="password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleInputChange} className="form-control" aria-describedby="basic-addon3" />
                        </div>
                        <div className="text-center">

                            <button type="button" onClick={this.onSubmit} className="btn btn-success" >Sign Up</button>

                        </div >
                    </div >
                </div>
            </div>
        )
    };
};

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


