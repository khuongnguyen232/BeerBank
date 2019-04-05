import React from 'react';
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  state = {findBeer : ''};

  onFormSubmit = (event) => {
    event.preventDefault();
    //this.setState({findBeer:event.target.value});
    this.props.getBeer(this.state.findBeer);
  }

  onInputChange = (event) => {
    this.setState({findBeer:event.target.value});
  }

  render() {
    return(
      <div className = "ui segment header">
        <div className = "menu">
          <Link to="/favorite"><button className = "right-button" type = "button">Favorite</button></Link>
          <Link to="/"><button className = "right-button" type = "button">Home</button></Link>
        </div>
        <form className = "ui form" onSubmit = {this.onFormSubmit}>
          <h1 className = "ui center aligned icon header"> BEER BANK </h1>
          <span className = "ui center aligned icon header" >Find your favorite beer here</span>
          <input
            className = "ui input error" type = "text"
            placeholder = "Find your favorite beer here"
            onChange = {this.onInputChange}
          />
        </form>
      </div>
    );
  };
};

export default SearchBar;
