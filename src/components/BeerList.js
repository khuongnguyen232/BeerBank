import React from 'react';
import BeerCard from './BeerCard.js';

class BeerList extends React.Component {
  state = {beers : []};

  //use this function when we have an update
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      //await this.props.loadBeer();
      let list = this.props.allBeer.map((beer) => {
        return <BeerCard key = {beer.id} beer = {beer}/>
      });
      this.setState({beers:list});
    }
  }

  renderContent = () => {
    if(this.state.beers.length === 0){
      return<div>Loading ...</div>;
    }
    return (
        <div className = "ui three column grid">
          {this.state.beers}
        </div>
      )
    };



  render() {
    return(
        <div>
          {this.renderContent()}
        </div>
    );
  };
};

export default BeerList;
