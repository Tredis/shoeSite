import React from 'react';
import {Link} from 'react-router';

export default function (props) {
  const colorArr = ['Red', 'Blue', 'Green', 'Black', 'White', 'Brown', 'Grey'];
  const sizeArr = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];
  return (
    <sidebar>
      <section>
        <h4 className="menu-item" onClick={() => {props.click('colorToggle')}}>
          <label>Color</label>
        </h4>
        { props.colorToggle ? (
          colorArr.map((color, i) => {
            return <div key={i}>
              <p style={{marginLeft: 25}}><input type="checkbox" id="cbox1" value="color"
                onChange={() => {props.addToFilter('color', color)}} /> {color}</p>
              </div>
          })
          ) : null }
      </section>
      <section>
        <h4 className="menu-item" onClick={() => {props.click('sizeToggle')}}>
          <label>Size</label>
        </h4>
        { props.sizeToggle ? (
          sizeArr.map((size, i) => {
            return <div key={i}>
              <p style={{marginLeft: 25}}> <input type="checkbox" value="second_checkbox"
                onChange={() => {props.addToFilter('size', size)}}/> {size}</p>
              </div>
          })
        ) : null }
      </section>
      <section>
        <h4 className="menu-item">
          <label htmlFor="cbox3">Price Range</label>
        </h4>
        <div>
          <div id="slider">
                   <input
                       name="pricing"
                       type="range"
                       min={props.sliderBar.min}
                       max={props.sliderBar.max}
                       step={1}
                       value={props.price}
                       onInput={(e) => {props.handlePriceChange(e)}}
                       onChange={(e) => {props.handlePriceChange(e)}}
                       id="price_id"
                       />
                   <span style={{ paddingLeft: 2}} >0 - {props.price}</span>
               </div>
        </div>
      </section>
      <button className="btn btn-primary" style={{marginLeft: 25, marginBottom: 10}} onClick={(e) => {
        props.filterShoes(props, e)
      }}>Search</button>
      <hr />
    </sidebar>
  );
}
