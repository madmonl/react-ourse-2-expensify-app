import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header'; 

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest 
}) => (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                    <Redirect to="/dashboard" />
                </div>
            ) : (
                // Redirect overrides the current 
                // location in the history stack, 
                // Whereas history pushes a new 
                // entry onto the history stack 
                <div>
                    <Component {...props} />
                </div>
                
            )
        )} />
    );

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);