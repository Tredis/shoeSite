import React, { Component } from 'react'
import axios from 'axios';

export default class SCC extends Component {
  constructor(props){
    super(props)
    this.state = {
      shoe: {},
      inventories: [],
      comments: [],
      inventoryId: 'SELECT SIZE / COLOR'
    }
    this.addShoeToState = this.addShoeToState.bind(this);
    this.orderSubmit = this.orderSubmit.bind(this);

  }

  addShoeToState(e){
    const value = e.target.value;
    this.setState({
      inventoryId: value
    });
  }

  orderSubmit(){
    const ID = this.state.inventoryId;
    console.log('HERES ID', ID);
    if(ID === 'SELECT SIZE / COLOR'){return alert('Please Select Color and Size')}
    axios.post('/api/orders/cartsubmit', {id:ID})
    .then(order=>console.log('!)!)!)!)!)!)!)!)!)!', order))
  }


  componentWillReceiveProps(nextProps){
    this.setState({shoe:nextProps.shoeModel, inventories:nextProps.shoeModel.shoe_inventories, comments:nextProps.shoeModel.comments})
  }

  render(){
    {console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', this.props)}
      return (
            <div>
              <div className="col-l-12">
                <p style={{fontSize: '2em'}}>
                  {this.state.shoe.brand} {this.state.shoe.name}
                </p>
                <img src={this.state.shoe.image_url} style={{height:500, width:500}} />
                </div>
                  <div className="col-xs-4">
                    <form className="form-horizontal">
                      <fieldset>
                    <div className="form-group" style={{display: 'block'}}>
                      <select onChange={this.addShoeToState} className="form-control" id="sel1" name='sizecolor'>
                        <option>SELECT SIZE / COLOR</option>
                          {this.state.inventories.map(shoe=> {
                            return <option key={shoe.id} value={shoe.id}>{shoe.size} / {shoe.color}</option>
                          })}
                      </select>
                    </div>
                      </fieldset>
                    </form>
                  </div>
                  <div>
                    <p style={{fontSize: '2em'}}>
                      {this.state.shoe.gender}
                    </p>
                  </div>
                  <div>
                    <p style={{fontSize: '2em'}}>
                      {this.state.shoe.price}
                    </p>
                  </div>
                  <h3>{this.state.shoe.description}</h3>
            <div>
              <a onClick={() => {this.orderSubmit()}} className="btn btn-primary btn-warning"><span className="glyphicon glyphicon-shopping-cart"></span> ADD TO CART</a>
              <h4>Product Reviews</h4>
              {this.state.comments.map(comment=> {
                return ( <div key={comment.id}>
                         <p>Date: {comment.created_at.slice(0,10)}</p>
                         <p>{comment.body}</p>
                         {/*<p>{comment.upvotes} users found this review helpful</p>
                       <div><p>Was this review helpful?</p><a className="btn btn-xs btn-success">YES</a><a className="btn btn-xs btn-danger">NO</a>
                       */}
                       </div>
                )
              })}
            </div>
            </div>
      )
    }
}
