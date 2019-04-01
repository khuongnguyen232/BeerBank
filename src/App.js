import React from 'react';
import SearchBar from './components/SearchBar.js';
import BeerList from './components/BeerList.js';
import Axios from 'axios';
import './css/Card.css';
import './css/popup.css';
import './css/similar.css';

class App extends React.Component {
  state = {
    beers : [],
    fav: [],
    page : 1,
    displaySearch:false
  }
  getBeerOnSearch = async (term) => {
    let beerResult;
    if(term === '')
    {
        beerResult = await Axios.get("https://api.punkapi.com/v2/beers?per_page=12&page" + this.state.page);
    } else {
        beerResult = await Axios.get("https://api.punkapi.com/v2/beers?beer_name=" + term);
    }

    this.setState({beers:beerResult.data});
    //console.log(this.state.beers);
  }

  getAllBeer = async () => {
    let allBeers = await Axios.get("https://api.punkapi.com/v2/beers?per_page=12&page" + this.state.page);
    this.setState({beers:allBeers.data});
    //console.log("From getAllBeer: " + this.state.beerCount);
  }

  render() {
    return (
      <div>
        <SearchBar getBeer = {this.getBeerOnSearch} />
        <BeerList allBeer = {this.state.beers} />
        Found : {this.state.beers.length} beers
      </div>
    );
  };
};

export default App;
