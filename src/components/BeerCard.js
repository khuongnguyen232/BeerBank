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

render() {
  return(
      <div className="ui card column segment" >
        <button className ="ui card column" onClick={this.handleOpenModal}>
          <div className="image">
            <img src = {this.props.beer.image_url} alt = {this.props.beer.image_url.name}/>
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

        <ReactModal isOpen={this.state.showModal} contentLabel="Beer PopUp">
              <Popup {...this.props}/>
              <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  };
};


export default BeerCard;
