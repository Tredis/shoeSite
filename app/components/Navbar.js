import React from 'react';
import {Link} from 'react-router';

const Navbar = (props) => {
  return (
    <div className="navbar navbar-fixed-top navbar" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#nav-items">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand navbar-brand-red" href="/"><span style={{color: 'white', textDecoration: 'none'}}>Shoe Site</span></a>
        </div>
        <div id="nav-items" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><Link href="/">Home</Link></li>
            { !props.auth ? (
              <li><Link href="/login">Login/SignUp</Link></li>
            ) : (
              <li><Link onClick={() => {props.loggingOut()}}>Logout</Link></li>
            )

            }
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Navbar;
