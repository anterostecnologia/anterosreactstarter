import React, { Component } from 'react';
import { AnterosHeader } from 'anteros-react';
import { AnterosMenu } from 'anteros-react';
import { AnterosMenuItem } from 'anteros-react';
import { AnterosFooter, AnterosMainLayout } from 'anteros-react';
import { AnterosMainContainer } from 'anteros-react';
import { AnterosNotFound } from 'anteros-react';
import { AnterosFullScreen } from 'anteros-react';
import { AnterosLabel } from 'anteros-react';
import { AnterosNavigatorLinkDropdown } from "anteros-react";
import { AnterosNavigatorLink } from "anteros-react";
import { AnterosDropdownMenu } from "anteros-react";
import { AnterosDropdownMenuItem } from "anteros-react";
import { AnterosDropdownDivider } from "anteros-react";
import { If, Then } from "anteros-react";
import { AnterosBadge } from "anteros-react";
import { connect } from "react-redux";
import { handleLogout } from '../actions/authenticationActions';
import 'font-awesome/css/font-awesome.min.css';
import {
  Route, Link, Switch, NavLink
} from 'react-router-dom';
import { AnterosSecurityRoute } from "anteros-react";
import { AnterosStringUtils } from "anteros-react";
import HomeView from '../containers/HomeView';

class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.onSelectMenuItem = this.onSelectMenuItem.bind(this);
    this.onHandleLogout = this.onHandleLogout.bind(this);
    this.onSidebarOverlayClick = this.onSidebarOverlayClick.bind(this);
  }

  onSelectMenuItem(menuItem) {
    this.props.history.push(menuItem.props.route);
  }

  onHandleLogout() {
    this.props.history.push("/home");
    this.props.handleLogout();
  }

  onSidebarOverlayClick() {
    $("#app").removeClass("sidebar-open");
  }

  render() {
    let user = this.props.user;
    if (user.name) {
      user = user.name.split(' ');
      user = user[0];
    } else {
      user = user.login;
    }

    return (
      <AnterosMainLayout containerAppId="app">
        <AnterosHeader logo={require('../assets/img/anteros.png')}>
          <AnterosNavigatorLink caption="" badge={<AnterosBadge caption=" 7 " success />} icon="fa fa-envelope-o" />
          <AnterosNavigatorLink caption="" badge={<AnterosBadge caption=" 2 " warning />} icon="fa fa-comment-o" />
          <AnterosNavigatorLink caption="" badge={<AnterosBadge caption=" 3 " danger />} icon="fa fa-bell-o" />
          <AnterosFullScreen />
          <AnterosNavigatorLinkDropdown caption={this.props.isLoggedIn ? user : ""}>
            <AnterosDropdownMenu className="profile-dropdown-menu">
              <AnterosDropdownMenuItem caption="Perfil" icon="fa fa-user icon" />
              <AnterosDropdownMenuItem caption="Notificações" icon="fa fa-bell icon" />
              <AnterosDropdownMenuItem caption="Configurações" icon="fa fa-gear icon" />
              <AnterosDropdownDivider />
              <AnterosDropdownMenuItem caption="Sair" icon="fa fa-power-off icon" onSelectMenuItem={this.onHandleLogout} />
            </AnterosDropdownMenu>
          </AnterosNavigatorLinkDropdown>
        </AnterosHeader>

        <AnterosMenu logo={require('../assets/img/anteros.png')}>
          <AnterosMenuItem id="mniMenu" icon="fa fa-home white" caption="Cadastros">
            <AnterosMenuItem id="mniMenuItem1" route="/home/cadastros/item1" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-home green" caption="Menu item 1" ></AnterosMenuItem>
            <AnterosMenuItem id="mniMenuItem2" route="/home/cadastros/item2" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-home green" caption="Menu item 2" ></AnterosMenuItem>
            <AnterosMenuItem id="mniMenuItem3" route="/home/cadastros/item3" onSelectMenuItem={this.onSelectMenuItem} icon="fa fa-home green" caption="Menu item 3" ></AnterosMenuItem>
          </AnterosMenuItem>
        </AnterosMenu>

        <AnterosMainContainer >
          <Switch>
            <AnterosSecurityRoute path='/home/default' component={HomeView} allowAccess={this.props.isLoggedIn} />
          {/* <AnterosSecurityRoute path='/home/cadastros/item1' component={ItemView} allowAccess={this.props.isLoggedIn} /> */}

          </Switch>
          {this.props.children}
        </AnterosMainContainer>

        <AnterosFooter>Versão 1.0.0</AnterosFooter>
      </AnterosMainLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authenticationReducer.currentUser,
    isLoggedIn: state.authenticationReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => {
      dispatch(handleLogout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);