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
        beerResult = this.getAllBeer();
    } else {
        beerResult = this.getAllBeerSearch();
    }

    this.setState({beers:beerResult.data});
  }

  getAllBeer = async () => {
    let allBeers = await Axios.get("https://api.punkapi.com/v2/beers?per_page=12&page" + this.state.page);
    //add isFavorite prop here, easy to handle Favorite
    //console.log(allBeers);
    for(let i = 0; i < allBeers.data.length; ++i){
      allBeers.data[i].isFavorite = false;
    }
    return allBeers;
  }

  getAllBeerSearch = async (term) => {
    let allBeers = await Axios.get("https://api.punkapi.com/v2/beers?beer_name=" + term);
    //add isFavorite prop here, easy to handle Favorite
    for(let i = 0; i < allBeers.data.length; ++i){
      allBeers.data[i].isFavorite = false;
    }
    return allBeers;
  }

  //isFavorite is a state in BeerCard - add to favs beer if not exist, else remove it
  modifyFavoriteList = (beer) => {
    if(beer.isFavorite)
    {
      let result = this.state.favs.filter(fav => {
        return fav.id !== beer.id;
      })
      this.setState({favs:result});
    } else {
      let current = this.state.favs;
      current.push(beer);
      this.setState({favs:current});
    }
  }

  async componentDidMount() {
      let beerResult = await this.getAllBeer();
      this.setState({beers:beerResult.data});
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
