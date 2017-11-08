import React, { Component } from 'react';
import { render } from 'react-dom';
import 'anteros-react/lib/anteros-react.css';
import {AnterosSecurityRoute} from 'anteros-react';
import {AnterosNotFound} from 'anteros-react';

import MainLayout from '../components/MainLayout';
import Login from '../components/Login';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import {connect} from "react-redux";

class Application extends Component {

    constructor(props,context) {
        super(props);
    }

    componentDidMount(){
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to='/home/default' push={true}/>}/>
                        <AnterosSecurityRoute path="/home" component={MainLayout} allowAccess={this.props.isLoggedIn}/>
                        <Route path="/login" component={Login} />
                        <Route component={AnterosNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}



const mapStateToProps = (state) => {
  return {
      user: state.authenticationReducer.currentUser,
      isLoggedIn: state.authenticationReducer.isLoggedIn
  };
};



export default connect(mapStateToProps)(Application);



