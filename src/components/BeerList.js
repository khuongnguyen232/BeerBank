import React from 'react';
import BeerCard from './BeerCard.js';

const BeerList = (props) => {
  if(!props.allBeer) {
    return <div>Loading Data ... </div>;
  };

  const list = props.allBeer.map((beer) => {
    return <BeerCard key = {beer.id} beer = {beer} modifyFavoriteList = {props.modifyFavoriteList}/>
  });
  
  return (
      <div className = "ui three column doubling stackable grid">
        <div className = "ui row">
          {list}
        </div>
      </div>
    )
};

export default BeerList;
