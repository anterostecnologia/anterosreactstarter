import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
import axios from 'axios';
import { AnterosJacksonParser, AnterosPassword, AnterosEdit, AnterosLabel, AnterosFormGroup, AnterosCol, AnterosRow, AnterosForm } from 'anteros-react';
import { connect } from "react-redux";
import { handleLogin, handleLogout, setToken } from '../actions/authenticationActions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            redirectToReferrer: false,
            userName: '',
            password: '',
            error: undefined
        }
    }

    onChangeUser(event) {
        this.setState({ ...this.state, error: undefined, userName: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ ...this.state, error: undefined, password: event.target.value });
    }


    login(event) {
        if (!this.state.userName || this.state.userName == '') {
            this.setState({ ...this.state, error: 'Informe o nome do usuário' });
        } else if (!this.state.password || this.state.password == '') {
            this.setState({ ...this.state, error: 'Informe a senha do usuário' });
        } else {
            event.preventDefault();
            this.props.handleLogin({name:"NOME_USUARIO", login:this.state.userName});
            this.setState({ ...this.state, redirectToReferrer: true });
        }
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            return (
                <Redirect to="/home" />
            )
        }

        return (
            <div className="auth">
                <div className="auth-container">
                    <div className="card">
                        <header className="auth-header">
                            <img src={require('../assets/img/anteros.png')} />
                        </header>
                        <div className="auth-content">
                            <p className="text-xs-center">LOGIN</p>
                            <AnterosForm>
                                <AnterosRow>
                                    <AnterosCol medium={12}>
                                        <AnterosFormGroup>
                                            <AnterosLabel caption="Usuário" small={2} />
                                            <AnterosEdit small={10} id="userName" onChange={this.onChangeUser} value={this.state.userName} icon="fa fa-user-circle" />
                                        </AnterosFormGroup>
                                        <AnterosFormGroup>
                                            <AnterosLabel caption="Senha" small={2} />
                                            <AnterosPassword small={10} id="password" onChange={this.onChangePassword} value={this.state.password} required />
                                        </AnterosFormGroup>

                                        <div className="form-group">
                                            {this.state.error ? <label style={{ color: "red" }}>{this.state.error}</label> : null}
                                        </div>
                                        < br />
                                        <div className="form-group"> <button className="btn btn-block btn-primary" onClick={this.login}>Login</button> </div>
                                    </AnterosCol>
                                </AnterosRow>
                            </AnterosForm>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.authenticationReducer.currentUser,
        isLoggedIn: state.authenticationReducer.isLoggedIn,
        token: state.authenticationReducer.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (currentUser) => {
            dispatch(handleLogin(currentUser));
        },
        handleLogout: () => {
            dispatch(handleLogout());
        },
        setToken: (token) => {
            dispatch(setToken(token));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);