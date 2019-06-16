import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from "react-redux";
import back_arrow from "./../newImages/leftarrow_icon_blk.svg";
import coverd_parking_icon from "./../newImages/covered_parking_icon.svg";
import lit_icon from "./../newImages/lit_icon.svg";
import charging_icon from "./../newImages/charging_icon.svg";
import camera_icon from "./../newImages/camera_icon.svg";
import fence_icon from "./../newImages/fence_icon.svg";
import police_icon from "./../newImages/police_icon.svg";
import delete_icon from "./../newImages/delete_icon.svg";
import edit_icon from "./../newImages/edit_icon.svg";
import coverd_parking_icon_off from "../newImages/covered_parking_iconoff.svg";
import lit_icon_off from "../newImages/lit_iconoff.svg";
import charging_icon_off from "../newImages/charging_iconoff.svg";
import camera_icon_off from "../newImages/camera_iconoff.svg";
import fence_icon_off from "../newImages/fence_iconoff.svg";
import police_icon_off from "../newImages/police_iconoff.svg";

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      features: [],
      pictureArray: [],
      isLoading: true,
      host: {}
    };
  }

  componentDidMount() {
    this.getListingById();
  }
  getListingById = () => {
    const { currentListing } = this.props;

    axios.get(`/api/listing/${currentListing.id}`).then(res => {
      this.setState({
        listing: res.data[0],
        isLoading: false
      });
      this.getPicArray();
      this.getHost(res.data[0].host_id);
    });
  };
  getHost = id => {
    axios.get(`/api/host/${id}`).then(res => {
      this.setState({
        host: res.data[0]
      });
    });
  };
  getPicArray = () => {
    const { pic_one, pic_two, pic_three, pic_four } = this.state.listing;
    let picArr = [];
    if (pic_one) {
      picArr.push(pic_one);
    }
    if (pic_two) {
      picArr.push(pic_two);
    }
    if (pic_three) {
      picArr.push(pic_three);
    }
    if (pic_four) {
      picArr.push(pic_four);
    }
    this.setState({ pictureArray: picArr });
  };

  render() {
    const { listing, pictureArray, host } = this.state;
    let mappedPictures = pictureArray.map((picture, i) => {
      return (
        <div key={i}>
          <img src={picture} alt="" />
        </div>
      );
    });
    return (
      <div>
        {this.state.isLoading ? (
          <div>
            <p>LOADING . . .</p>
          </div>
        ) : (
          <div>
            <br />
            <Link to="/search">
              <img
                style={{ float: "left", height: "25px" }}
                alt=""
                src={back_arrow}
              />
            </Link>
            <h1>Details</h1>
            <div>
              <Carousel
                showThumbs={false}
                showStatus={false}
                swipeScrollTolerance={10}
              >
                {mappedPictures}
              </Carousel>
            </div>
            <div>
              <div className="card">
                <p>Address: {listing.address}</p>
                <p>Number of Spaces: {listing.num_spaces}</p>
                <p>Space Size: {listing.space_size}</p>
              </div>
              {/* <div className='card'>
                                <p>covered:{listing.covered ? 'true' : 'false'}</p>
                                <p>lit:{listing.lit ? 'true' : 'false'}</p>
                                <p>charging:{listing.charging ? 'true' : 'false'}</p>
                                <p>camera:{listing.camera ? 'true' : 'false'}</p>
                                <p>fenced:{listing.fenced ? 'true' : 'false'}</p>
                                <p>guarded:{listing.guarded ? 'true' : 'false'}</p>
                            </div> */}

              <div className="card">
                <h1 style={{ textAlign: "center" }}>Features</h1>
                <hr />
                <div className="grid">
                  <div>
                    {listing.covered ? (
                      <div className="featureicon">
                        <img
                          alt=""
                          src={coverd_parking_icon}
                          className="mylistingicon"
                        />
                        Covered
                      </div>
                    ) : (
                      <div className="featureicon">
                        <img
                          alt=""
                          src={coverd_parking_icon_off}
                          className="mylistingicon"
                        />
                        Covered
                      </div>
                    )}
                  </div>
                  <div>
                    {listing.lit ? (
                      <div className="featureicon">
                        <img alt="" src={lit_icon} className="mylistingicon" />
                        Lit
                      </div>
                    ) : (
                      <div className="featureicon">
                        <img
                          alt=""
                          src={lit_icon_off}
                          className="mylistingicon"
                        />
                        Lit
                      </div>
                    )}
                  </div>
                  <div>
                    {listing.charging ? (
                      <div className="featureicon">
                        <img
                          alt=""
                          src={charging_icon}
                          className="mylistingicon"
                        />
                        Charging
                      </div>
                    ) : (
                      <div className="featureicon">
                        <img
                          alt=""
                          src={charging_icon_off}
                          className="mylistingicon"
                        />
                        Charging
                      </div>
                    )}
                  </div>
                  <div>
                    {listing.camera ? (
                      <div className="featureicon">
                        <img
                          alt=""
                          src={camera_icon}
                          className="mylistingicon"
                        />
                        Surveillance
                      </div>
                    ) : (
                      <div className="featureicon">
                        <img
                          alt=""
                          src={camera_icon_off}
                          className="mylistingicon"
                        />
                        Surveillance
                      </div>
                    )}
                  </div>
                  <div>
                    {listing.fenced ? (
                      <div className="featureicon">
                        <img
                          alt=""
                          src={fence_icon}
                          className="mylistingicon"
                        />
                        Fenced
                      </div>
                    ) : (
                      <div className="featureicon">
                        <img
                          alt=""
                          src={fence_icon_off}
                          className="mylistingicon"
                        />
                        Fenced
                      </div>
                    )}
                  </div>
                  <div>
                    {listing.guarded ? (
                      <div className="featureicon">
                        <img
                          alt=""
                          src={police_icon}
                          className="mylistingicon"
                        />
                        Security
                      </div>
                    ) : (
                      <div className="featureicon">
                        <img
                          alt=""
                          src={police_icon_off}
                          className="mylistingicon"
                        />
                        Security
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>About this Space</h3>
              <br />
              <p>Hosted by {host.username}</p>
              <br />
              <img src={host.user_pic} style={{ width: "50px" }} alt="" />
              <br />
              <Link to="/chat">
                <button>SEND EMAIL</button>
              </Link>

              <br />
              <p>About: {listing.about}</p>
            </div>

            <div className="card">
              <h3>Listing Schedule:</h3>
              <br />
              <div>
                <p className={listing.monday ? "visible" : "invisible"}>
                  Monday
                </p>
                <hr />
                <p className={listing.tuesday ? "visible" : "invisible"}>
                  Tuesday
                </p>
                <hr />
                <p className={listing.wednesday ? "visible" : "invisible"}>
                  Wednesday
                </p>
                <hr />
                <p className={listing.thursday ? "visible" : "invisible"}>
                  Thursday
                </p>
                <hr />
                <p className={listing.friday ? "visible" : "invisible"}>
                  Friday
                </p>
                <hr />
                <p className={listing.saturday ? "visible" : "invisible"}>
                  Saturday
                </p>
                <hr />
                <p className={listing.sunday ? "visible" : "invisible"}>
                  Sunday
                </p>
              </div>
            </div>

            <Link to="/checkout">
              <button className="bigbutton">Checkout</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentListing: state.currentListing
  };
}

export default connect(mapStateToProps)(Listing);
