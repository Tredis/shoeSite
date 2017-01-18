import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import {logout} from '../redux/auth.jsx'


const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loggingOut: function () {
      dispatch(logout());
    }
  };
}

const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

export default NavbarContainer;

