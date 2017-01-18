import React from 'react';
import {Link} from 'react-router';

export default function (props) {
  let shoe = props.shoe;
  return (
    <div>
      <div className="row thumbnail">
        <div>
          <div className="col-xs-4">
            <img src={shoe.shoe_model.image_url} style={{ height: 200, width: 200 }} />
          </div>
          <div className="col-xs-8">
            <Link  to={`shoe/${shoe.id}`}>
                <p style={{fontSize: '1.6em'}}>
                  Name: {shoe.shoe_model.brand} { shoe.shoe_model.name }
                </p>
                <p style={{fontSize: '1.6em'}}>
                  Size: { shoe.size }
                </p>
                <p style={{fontSize: '1.6em'}}>
                  Color: { shoe.color }
                </p>
                <p style={{fontSize: '1.6em'}}>
                  Gender: { shoe.shoe_model.gender }
                </p>
                <p style={{fontSize: '1.6em'}}>
                  Price: { shoe.price }
                </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
