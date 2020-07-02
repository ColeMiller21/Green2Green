import React from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from '../components/Homepage';


class LandingPage extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={SignInForm} />
                    <Route path='/signup' component={SignUpForm} />
                    {/* Change to ProtectedRoute */}
                    <Route path='/home' component={Homepage} />
                </Switch>

            </Router>
        )
    }
}


export default LandingPage;