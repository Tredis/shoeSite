import React from 'react';
import {Link} from 'react-router';

export default function (props) {
  let shoe = props.shoe;

  return (
    <div>
      <div className="row thumbnail">
        <div>
          <div className="col-xs-4">
              <img src={shoe.image_url} style={{ height: 200, width: 200 }} />
          </div>
          <div className="col-xs-8">
            <Link  to={`shoe/${shoe.id}`}>
                <p style={{fontSize: '1.6em'}}>
                  {shoe.brand} "{ shoe.name }"
                </p>
                <p style={{fontSize: '1.6em'}}>
                  Gender: { shoe.gender }
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
