import React from 'react';
import ReactModal from 'react-modal';
import Popup from './Popup.js';
import Axios from 'axios';

//use beer props to reduce the traffic to the API server when test

class PopUpCard extends React.Component {
  state = {showModal:false , beer: this.props.beer};

  handleOpenModal = () => {
     this.setState({ showModal: true });
   }

   handleCloseModal = () => {
     this.setState({ showModal: false });
   }

  componentDidMount() {
    ReactModal.setAppElement('body');
    Axios.get("https://api.punkapi.com/v2/beers/random")
    .then((response) => {this.setState({beer: response.data[0]})});
  }

renderCard = () => {
    if(this.state.beer == null)
    {
      return <div>Loading for data ...</div>;
    }

    return (
      <div className="wrap">
        <button className ="similar-card" onClick={this.handleOpenModal}>
          <div className="similar-image">
            <img src = {this.state.beer.image_url} alt = {this.state.beer.name}/>
          </div>

          <div className= "PopUpName">
            {this.state.beer.name}
          </div>
        </button>
        
        <ReactModal className = "modal" isOpen={this.state.showModal} contentLabel="Beer PopUp">
              <Popup beer = {this.state.beer} />
        </ReactModal>

      </div>
      )
};

render() {
  return (
    <div className = "wrap">
      {this.renderCard()}
    </div>
    );
  };
};


export default PopUpCard;
