import React, {Component} from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import {filterAllShoes} from '../redux/allShoes'

const mapStateToProps = function (state, ownProps) {
  return {};
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return  {
    filterShoes: function (filterInfo, e) {
      e.preventDefault();
      let filterCriteria = {
        color: filterInfo.color,
        size: filterInfo.size,
        price: filterInfo.price,
      }
      dispatch(filterAllShoes(filterCriteria))
      filterInfo.this.setState({
        color: [],
        size: [],
        colorToggle: false,
        sizeToggle: false})
    }
  }
}

class SC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: [],
      colorToggle: false,
      sizeToggle: false,
      size: [],
      sliderBar: {
        min: 0,
        max: 200,
      },
      price: 200,
      filterShoes: props.filterShoes
    }
    this.addToFilter = this.addToFilter.bind(this);
    this.click = this.click.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  click(field) {
      this.setState({[field]: !this.state[field]});
   }

  addToFilter(filterItem, filterValue) {
    const nextState = Object.assign({}, this.state);
    const arrayPopValue = nextState[filterItem].indexOf(filterValue)

    if(arrayPopValue === -1) {
      nextState[filterItem] = [...nextState[filterItem], filterValue]
      this.setState({[filterItem]: nextState[filterItem]});

    } else {
      let before = nextState[filterItem].slice(0, arrayPopValue);
      let after = nextState[filterItem].slice(arrayPopValue + 1);

      nextState[filterItem] = [...before, ...after];
      this.setState({[filterItem]: nextState[filterItem]});
    }
  }

  handlePriceChange (event) {
    this.setState({price: Number(event.target.value)});
  }

  render() {
    return (
      <Sidebar
        color={this.state.color}
        colorToggle={this.state.colorToggle}
        size={this.state.size}
        sizeToggle={this.state.sizeToggle}
        sliderBar={this.state.sliderBar}
        price={this.state.price}
        addToFilter={this.addToFilter}
        click={this.click}
        filterShoes={this.state.filterShoes}
        handlePriceChange={this.handlePriceChange}
        this={this}/>
    );
  }
}
const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SC);

export default SidebarContainer;
