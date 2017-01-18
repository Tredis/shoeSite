import React, { Component } from 'react'

export default function (props) {
const loginProps = props.loginProps;
    return (
      <div className="row" style={{marginTop: 50, marginBottom: 70}}>
        <div className="col-md-4 col-md-offset-4">
          <h1>Login</h1>
          <form onSubmit={evt => {
              evt.preventDefault()
              loginProps.loginUser(loginProps)
            } }>
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(event) => { loginProps.handleChange(event, 'email')}}
                value={loginProps.email} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                placeholder="Password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={ (event) => { loginProps.handleChange(event, 'password') }}
                value={loginProps.password}
                />
            </div>
            <div>
              <button type="submit" className="btn btn-primary"> Login </button>
              <button className="btn btn-success" style={{float: 'right'}} onClick={(evt) => {
                evt.preventDefault()
                loginProps.handleLoginToggle()}}> New User? Sign Up! </button>
            </div>
          </form>
        </div>
      </div>
    )
}
