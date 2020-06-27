import React from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from '../components/Homepage';
// plug in react router for signin - signup routes


class LandingPage extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={SignInForm} />
                    <Route path='/signup' component={SignUpForm} />
                    <Route path='/home' component={Homepage} />
                </Switch>

            </Router>
        )
    }

}


// const styles = {
//     background: {
//         background: 'linear-gradient(226deg, rgb(15, 114, 68) 48%, rgb(17, 97, 73) 100%)',
//         minHeight: '100vh',
//         width: '100vw',
//         margin: 0,
//         padding: 0
//     },
//     formDiv: {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)'
//     }

// }

export default LandingPage;