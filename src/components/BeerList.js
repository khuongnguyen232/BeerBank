import React from 'react';
import BeerCard from './BeerCard.js';

const BeerList = (props) => {
  const list = props.allBeer.map((beer) => {
    return <BeerCard key = {beer.id} beer = {beer} modifyFavoriteList = {props.modifyFavoriteList}/>
  });

  if(list === null){
    return<div>Loading ...</div>;
  }
  return (
      <div className = "ui three column doubling stackable grid">
        <div className = "ui row">
          {list}
        </div>
      </div>
    )
};

export default BeerList;
