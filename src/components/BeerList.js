import React from 'react';
import BeerCard from './BeerCard.js';

class BeerList extends React.Component {
  state = {beers : []};

  async componentDidMount() {
    await this.props.loadBeer();
    //console.log("From BeerList:" + this.props.allBeer.length);
    let list = this.props.allBeer.map((beer) => {
      return <BeerCard key = {beer.id} beer = {beer}/>
    });
    this.setState({beers:list});
  }

  render() {
    return(
        <div className = "ui three column grid">
          {this.state.beers}
        </div>
    );
  };
};

export default BeerList;
