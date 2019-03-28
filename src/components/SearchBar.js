import React from 'react';

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
      <div className = "ui segment">
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
