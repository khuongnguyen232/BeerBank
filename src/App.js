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
    let allBeers = await Axios.get("https://api.punkapi.com/v2/beers?per_page=12&page=" + this.state.page);
    //add isFavorite prop here, easy to handle Favorite

    let currentFav = localStorage.getItem('favorite');
    currentFav = currentFav === null ? []:JSON.parse(currentFav);

    for(let i = 0; i < allBeers.data.length; ++i){
      allBeers.data[i].isFavorite = false;
      if(currentFav.some(fav => fav.id === allBeers.data[i].id))
        allBeers.data[i].isFavorite = true;
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
  modifyFavoriteList = async (beer) => {
    if(!beer.isFavorite)
    {
      let current = this.state.favs.filter(fav => {
        return fav.id !== beer.id;
      })
      await this.setState({favs:current});
    } else {
      let current = this.state.favs;
      //this if statement to support localStorage, in case the list is null
      if(current === null)
        current = [];

      current.push(beer);
      await this.setState({favs:current});
    }
    this.updateLocalStorage();
  }

  updateLocalStorage = () => {
    localStorage.setItem('favorite',JSON.stringify(this.state.favs));
  }

  addMoreBeer = async () => {
    let currentList = this.state.beers;
    this.setState({page:this.state.page + 1}, async () => {
      let moreBeer = await this.getAllBeer();
      this.setState({beers:currentList.concat(moreBeer.data)});
    });


  }

  async componentDidMount() {
      //currentFav will be a string
      let currentFav = localStorage.getItem('favorite');
      currentFav = currentFav === null ? []:JSON.parse(currentFav);

      let beerResult = await this.getAllBeer();
      this.setState({beers:beerResult.data, favs:currentFav});
  }

  render() {
    return (
      <div>
        <SearchBar getBeer = {this.getBeerOnSearch} />
          <Route exact path='/' render = {() => {return(<BeerList allBeer = {this.state.beers} modifyFavoriteList = {this.modifyFavoriteList}/>)}}/>
          <Route exact path='/favorite' render = {() => {return(<BeerList allBeer = {this.state.favs} modifyFavoriteList = {this.modifyFavoriteList}/>)}}/>
          <button className = "ui inverted orange button" onClick = {this.addMoreBeer}>LoadMore</button>
      </div>
    );
  };
};

export default App;
