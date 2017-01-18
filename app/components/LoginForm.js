import React, { Component } from 'react'
import Login from './Login'
import Signup from './Signup'

export default function (props) {

  console.log("props:", props);
  const renderForm = () => {
    if (props.returningUser) {
      return (
        <Login loginProps={props} />
        )
    }
    else {
      return (
        <Signup signupProps={props} />
      )
    }
  }

  return (
    <div>
      {renderForm()}
    </div>
  )

}
