import React, { Component } from "react";
import Map from "./../Map/Map";
import Nav from "./../Nav/Nav";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "./../redux/reducer";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      markers: []
    };
  }

  componentDidMount() {
    this.props.getUser();
    this.getListings();
  }

  getListings() {
    axios.get("api/listing").then(res => {
      this.setState({
        markers: res.data,
        isLoading: false
      });
    });
  }

  render() {
    return (
      <div>
        {!this.state.isLoading ? (
          <div className="">
            <Nav />
            <div className="">
              <Map
                zoom={14}
                markers={this.state.markers}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                  process.env.REACT_APP_GOOGLE_API_KEY
                }&v=3.exp&libraries=geometry,drawing,places`}
                containerElement={<div style={{ height: `400px` }} />}
                loadingElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
          </div>
        ) : (
          <div>
            <Nav />
            <p>Loading</p>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(
  mapStateToProps,
  { getUser }
)(Search);
