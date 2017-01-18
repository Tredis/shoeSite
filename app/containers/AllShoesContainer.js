import React, {Component} from 'react';
import { connect } from 'react-redux';
import AllShoes from '../components/AllShoes';
import axios from 'axios';

const mapStateToProps = (state, ownProps) => {
  return {
    allShoes: state.shoes,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

const AllShoesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllShoes);

export default AllShoesContainer;
