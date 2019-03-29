import React from 'react';
import ReactModal from 'react-modal';
import Popup from './Popup.js';
import Axios from 'axios';

class PopUpCard extends React.Component {
  state = {showModal:false , beer: null};

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
    console.log(this.state.beer);
    if(this.state.beer == null)
    {
      return <div>Loading for data ...</div>;
    }

    return (
        <button className ="" onClick={this.handleOpenModal}>
          <div className="">
            <img src = {this.state.beer.image_url} alt = {this.state.beer.name}/>
          </div>

          <div className= "PopUpName">
            {this.state.beer.name}
          </div>
        </button>

        /*<ReactModal className = "modal" isOpen={this.state.showModal} contentLabel="Beer PopUp">
              <button className= "close-button" onClick={this.handleCloseModal}>Close Modal</button>
              <Popup beer = {this.state.beer} />
        </ReactModal>*/
      )

};

render() {
  return (
    <div className = "#">
      {this.renderCard()}
    </div>
    );
  };
};


export default PopUpCard;
