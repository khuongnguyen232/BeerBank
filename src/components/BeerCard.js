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

   componentDidMount() {
    ReactModal.setAppElement('body');
 }

render() {
  return(
      <div className="ui card column segment" >
        <button className ="ui card column" onClick={this.handleOpenModal}>
          <div className="image">
            <img src = {this.props.beer.image_url} alt = {this.props.beer.name}/>
          </div>

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
