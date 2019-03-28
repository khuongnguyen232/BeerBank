import React from 'react';
import SearchBar from './components/SearchBar.js';
import BeerList from './components/BeerList.js';
import Axios from 'axios';
import './components/Card.css'

class App extends React.Component {
  state = {
    beerCount : 0,
    beers : [],
    page : 1
  }
  getBeerOnSearch = async (term) => {
    let beerResult = await Axios.get("https://api.punkapi.com/v2/beers?beer_name=" + term);
    //console.log(beerResult);
  }

  getAllBeer = async () => {
    let allBeers = await Axios.get("https://api.punkapi.com/v2/beers?per_page=12&page" + this.state.page);
    this.setState({beers:allBeers.data});
    this.setState({beerCount:allBeers.data.length});
    //console.log("From getAllBeer: " + this.state.beerCount);
  }

  render() {
    return (
      <div>
        <SearchBar getBeer = {this.getBeerOnSearch} />
        <BeerList loadBeer = {this.getAllBeer} allBeer = {this.state.beers} />
      </div>
    );
  };
};

export default App;
