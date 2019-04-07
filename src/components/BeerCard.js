import React from 'react';
import ReactModal from 'react-modal';
import Popup from './Popup.js';

class BeerCard extends React.Component {
  state = {showModal:false};

  handleOpenModal = () => {
     this.setState({ showModal: true });
   }

   handleCloseModal = () => {
     this.setState({ showModal: false });
   }

   //get the callback function to add favorite
   onClickFavorite = () => {
     let toogleFavorite = !this.props.beer.isFavorite;
     this.props.beer.isFavorite = toogleFavorite;
     this.props.modifyFavoriteList(this.props.beer);
   }

   componentDidMount() {
    ReactModal.setAppElement('body');
    //console.log(this.props.beer.isFavorite);
 }

render() {
  return(
      <div className="ui card column segment" key = {this.props.beer.id}>
        <button className="star-button" onClick = {this.onClickFavorite}>
            {this.props.beer.isFavorite === false && <i className="far fa-star"></i>}
            {this.props.beer.isFavorite === true && <i className="fas fa-star"></i>}
        </button>
        <div className="image">
          <img src = {this.props.beer.image_url} alt = {this.props.beer.name}/>
        </div>
        <button className ="ui card column" onClick={this.handleOpenModal}>

          <div className="description">
            <div className="configName">
              {this.props.beer.name}
            </div>
            <div className="configTagline">
              {this.props.beer.tagline}
            </div>
          </div>
        </button>

        <ReactModal className = "modal" isOpen={this.state.showModal} contentLabel="Beer PopUp">
              <button className= "close-button" onClick={this.handleCloseModal}>Close Modal</button>
              <Popup {...this.props}/>
        </ReactModal>
      </div>
    );
  };
};


export default BeerCard;
