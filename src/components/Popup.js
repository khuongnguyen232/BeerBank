import React from 'react';
import PopUpCard from './PopUpCard';

const Popup = (props) => {

  const food_pairing = props.beer.food_pairing.map((food) => {return <li className ="list">{food}</li>} );

  return (
    <div className = "popup-container">
      <div className = "flex-container">
        <img className = "image-pop" src = {props.beer.image_url} alt = {props.beer.name}/>
        <div className="info-pop">
          <h2>{props.beer.name}</h2>
          <h3>{props.beer.tagline}</h3>
          <div className = "line"></div>
          <strong>IBU:<span>{props.beer.ibu} </span>ABV:<span>{props.beer.abv}%</span> EBC:<span>{props.beer.ebc}</span></strong>
          <p className = "dis-pop">{props.beer.description}</p>
          <strong>Best serve with:</strong>
          <ui>
            {food_pairing}
          </ui>
        </div>
      </div>

      <div className = "similar-container">
        <h1>You Might Also Like:</h1>
        <div className = "similar">
          <PopUpCard {...props}/>
        </div>
      </div>
    </div>
  )
}

export default Popup;
