import React from 'react';
import NavbarContainer from '../containers/NavbarContainer'
import SidebarContainer from '../containers/SidebarContainer'
import AllShoesContainer from '../containers/AllShoesContainer'

const App = (props) => {
  console.log('HOME page props', props);
  return (
    <div>
      <NavbarContainer />
        <div>
          <div className="col-xs-2 sidebar" style={{marginTop: 50}}>
            <SidebarContainer />
          </div>
          <div className="col-xs-10" style={{marginTop: 50, marginBottom: 70}}>
            {
              props.children && React.cloneElement(props.children, props)
            }
            {props.location.pathname === '/' && <AllShoesContainer />}
          </div>
        </div>
    </div>

  );
}

export default App;
