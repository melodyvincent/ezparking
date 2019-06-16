import React, { Component } from "react";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";
import "./Wizards.css";
import cancel_icon from './../../newImages/cancel_icon.svg'
import rightarrow_icon from './../../newImages/rightarrow_icon.svg'
import { connect } from 'react-redux';
import { updateWizLat, updateWizLng, updateWizAddress } from './../redux/reducer'

class Wizard0 extends Component {

  componentDidMount() {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.enableDebug();
  }

  handleClick = () => {
    // console.log(this.props.address);
    Geocode.fromAddress(this.props.address).then(response => {
      // console.log(response)
      const { lat, lng } = response.results[0].geometry.location
      // console.log(lat, lng);
      this.props.updateWizAddress(this.props.address);
      this.props.updateWizLat(lat);
      this.props.updateWizLng(lng);
    },
      error => {
        console.error(error);
      }
    );
  }

  render() {

    const { updateWizAddress } = this.props;

    return (
      <div className= "reset">
          <div className='nav'>
            <Link to="#" style={{opacity:'0', width: '30px'}}></Link>
            <Link to="/search">
              <img className='wizardnav'alt="" src={cancel_icon} style={{ height: "30px", width: "30px" }} />
            </Link>
            <Link to="/wizard1" onClick={() => { this.handleClick() }}>
              <img className='wizardnav'alt="" src={rightarrow_icon} style={{ height: "30px", width: "30px" }} />
            </Link>
          </div> 
        <div className="wizard">
        <div className='card'>
          <h1>Where is your parking space(s) located?</h1>
          <input type="" className="input" onChange={e => { updateWizAddress(e.target.value) }} placeholder='Address' />
          <br />
        </div> 

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { lat, lng, address } = state;
  return {
    lat,
    lng,
    address
  }
}

// We must register the store with a dispatch function.
// The dispatch function is usually accessed using a helper like react-redux's connect(). 

export default connect(mapStateToProps, { updateWizLat, updateWizLng, updateWizAddress })(Wizard0);
