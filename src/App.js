import React from 'react';
import { Route } from 'react-router-dom';
import SearchBar from './components/SearchBar.js';
import BeerList from './components/BeerList.js';
import Axios from 'axios';
import './css/Card.css';
import './css/popup.css';
import './css/similar.css';
import './css/header.css';

class App extends React.Component {
  state = {
    beers : [],
    favs: [],
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
  }

  getAllBeer = async () => {
    let allBeers = await Axios.get("https://api.punkapi.com/v2/beers?per_page=12&page" + this.state.page);
    this.setState({beers:allBeers.data});
    //console.log("From getAllBeer: " + this.state.beerCount);
  }

  modifyFavoriteList = (isFavorite, beer) => {
    if(isFavorite)
    {
      console.log("implement remove later");
    } else {
      let current = this.state.favs;
      current.push(beer);
      this.setState({favs:current});
    }
    console.log("Favorite list: " + this.state.favs);
  }

  async componentDidMount() {
      let beerResult = await Axios.get("https://api.punkapi.com/v2/beers?per_page=12&page" + this.state.page);
      this.setState({beers:beerResult.data});
      console.log("App-componentDidMount");
  }

  render() {
    return (
      <div>
        <SearchBar getBeer = {this.getBeerOnSearch} />
          <Route exact path='/' render = {() => {return(<BeerList allBeer = {this.state.beers} modifyFavoriteList = {this.modifyFavoriteList}/>)}}/>
          <Route exact path='/favorite' render = {() => {return(<BeerList allBeer = {this.state.favs} modifyFavoriteList = {this.modifyFavoriteList}/>)}}/>
      </div>
    );
  };
};

export default App;
