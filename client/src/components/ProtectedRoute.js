import React from 'react';
import { Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                //if authenticated === true
                //?
                <Component />
                //: <Redirect to="/" />
            }} />
    )


}


export default ProtectedRoute;