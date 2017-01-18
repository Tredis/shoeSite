import React, { Component } from 'react'

export default function (props) {
const signupProps = props.signupProps;
  return (
    <div className="row" style={{marginTop: 50, marginBottom: 70}}>
      <div className="col-md-6 col-md-offset-3">
        <h1>Signup</h1>
        <form onSubmit={evt => {
              evt.preventDefault()
              signupProps.createUser(signupProps)
          } }>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              name="First Name"
              placeholder="First Name"
              type="text"
              className="form-control"
              id="firstname"
              onChange={(event) => { signupProps.handleChange(event, 'firstname')}}
              value={signupProps.firstname} />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              name="Last Name"
              placeholder="Last Name"
              type="text"
              className="form-control"
              id="lastname"
              onChange={(event) => { signupProps.handleChange(event, 'lastname')}}
              value={signupProps.lastname} />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(event) => { signupProps.handleChange(event, 'email')}}
              value={signupProps.email} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={ (event) => { signupProps.handleChange(event, 'password') }}
              value={signupProps.password}
              />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              name="Address"
              placeholder="Address"
              type="text"
              className="form-control"
              id="address"
              onChange={(event) => { signupProps.handleChange(event, 'address')}}
              value={signupProps.address}
              />
          </div>
          <div>
            <button
              type="submit" className="btn btn-primary"> Sign Up </button>
            <button className="btn btn-success" style={{float: 'right'}} onClick={(evt) => {
              evt.preventDefault()
              signupProps.handleLoginToggle()}}> Returning user? Log in! </button>
          </div>
        </form>
        <text style={{fontSize: 20, color: 'red'}}>
          {signupProps.error}
        </text>
      </div>
    </div>
  )
}
