import React, { Component } from "react";
import axios from "axios";
import "./edit_listing.css";
// import { Link } from 'react-router-dom'
import Nav from "../Nav/Nav";
import checkmark_icon from "./../newImages/checkmark_icon.svg";
import "./../../animate.css";
import Geocode from "react-geocode";
import { storage } from "../Firebase/index";
import add_image_icon from "../Images/add_image_icon.svg";

export default class EditListing extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      lat: 0,
      lng: 0,
      buildingType: "",
      spaceType: "",
      numSpaces: 0,
      spaceSize: "",
      about: "",
      instructions: "",
      price: 0,
      cash: false,
      credit: false,
      venmo: false,
      payPal: false,
      applePay: false,
      picOne: false,
      picTwo: false,
      picThree: false,
      picFour: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      covered: false,
      lit: false,
      charging: false,
      camera: false,
      fenced: false,
      guarded: false
    };
  }

  componentDidMount() {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.enableDebug();

    axios.get(`/api/listing/${this.props.match.params.id}`).then(res => {
      this.setState({
        address: res.data[0].address,
        buildingType: res.data[0].building_type,
        spaceType: res.data[0].space_type,
        numSpaces: res.data[0].num_spaces,
        spaceSize: res.data[0].space_size,
        about: res.data[0].about,
        instructions: res.data[0].instructions,
        price: res.data[0].price,
        cash: res.data[0].cash,
        credit: res.data[0].credit,
        venmo: res.data[0].venmo,
        payPal: res.data[0].pay_pal,
        applePay: res.data[0].apple_pay,
        picOne: res.data[0].pic_one,
        picTwo: res.data[0].pic_two,
        picThree: res.data[0].pic_three,
        picFour: res.data[0].pic_four,
        monday: res.data[0].monday,
        tuesday: res.data[0].tuesday,
        wednesday: res.data[0].wednesday,
        thursday: res.data[0].thursday,
        friday: res.data[0].friday,
        saturday: res.data[0].saturday,
        sunday: res.data[0].sunday,
        covered: res.data[0].covered,
        lit: res.data[0].lit,
        charging: res.data[0].charging,
        camera: res.data[0].camera,
        fenced: res.data[0].fenced,
        guarded: res.data[0].guarded
      });
    });
  }

  updateListing() {
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

        axios
          .put(`/api/listing/${this.props.match.params.id}`, {
            address: this.state.address,
            lat: lat,
            lng: lng,
            building_type: this.state.buildingType,
            space_type: this.state.spaceType,
            num_spaces: this.state.numSpaces,
            space_size: this.state.spaceSize,
            about: this.state.about,
            instructions: this.state.instructions,
            price: this.state.price
          })
          .then(res => {
            axios
              .put(`/api/feature/${this.props.match.params.id}`, {
                covered: this.state.covered,
                lit: this.state.lit,
                charging: this.state.charging,
                camera: this.state.camera,
                fenced: this.state.fenced,
                guarded: this.state.guarded
              })
              .then(res => {
                axios
                  .put(`api/picture/${this.props.match.params.id}`, {
                    pic_one: this.state.picOne,
                    pic_two: this.state.picTwo,
                    pic_three: this.state.picThree,
                    pic_four: this.state.picFour
                  })
                  .then(res => {
                    axios
                      .put(`/api/availability/${this.props.match.params.id}`, {
                        monday: this.state.monday,
                        tuesday: this.state.tuesday,
                        wednesday: this.state.wednesday,
                        thursday: this.state.thursday,
                        friday: this.state.friday,
                        saturday: this.state.saturday,
                        sunday: this.state.sunday
                      })
                      .then(res => {
                        axios
                          .put(`/api/payment/${this.props.match.params.id}`, {
                            cash: this.state.cash,
                            credit: this.state.credit,
                            venmo: this.state.venmo,
                            pay_pal: this.state.payPal,
                            apple_pay: this.state.applePay
                          })
                          .then(res => {
                            this.props.history.push("/mylistings");
                          });
                      });
                  });
              });
          });
      },
      error => {
        console.error(error);
      }
    );
  }

  handleClick(e) {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleListingPic(e, picNum) {
    if (e.target.files[0]) {
      const listing_pic = e.target.files[0];
      const uploadTask = storage
        .ref(`main_images/${listing_pic.name}`)
        .put(listing_pic);
      uploadTask.on("state_changed", () => {
        storage
          .ref("main_images")
          .child(listing_pic.name)
          .getDownloadURL()
          .then(url => {
            if (picNum === 1) {
              this.setState({ picOne: url });
            } else if (picNum === 2) {
              this.setState({ picTwo: url });
            } else if (picNum === 3) {
              this.setState({ picThree: url });
            } else {
              this.setState({ picFour: url });
            }
          });
      });
    }
  }

  render() {
    return (
      <div className="reset">
        <Nav />
        <div>
          <div className="card" style={{ textAlign: "center" }}>
            <h1>Pictures</h1>
            <hr />
            <div
              class="pictureContainer"
              style={{
                display: "grid",
                gridTemplateColumns: "100px 100px",
                width: "300px",
                justifyContent: "center"
              }}
            >
              <div style={{ height: "100px", width: "100px" }}>
                <label htmlFor="picture_input1">
                  <img
                    src={this.state.picOne ? this.state.picOne : add_image_icon}
                    alt=""
                    style={{ height: "100px" }}
                  />
                </label>
                <input
                  type="file"
                  id="picture_input1"
                  onChange={e => {
                    this.handleListingPic(e, 1);
                  }}
                  style={{ display: "none" }}
                />
              </div>

              <div style={{ height: "100px", width: "100px" }}>
                <label htmlFor="picture_input2">
                  <img
                    src={this.state.picTwo ? this.state.picTwo : add_image_icon}
                    alt=""
                    style={{ height: "100px" }}
                  />
                </label>
                <input
                  type="file"
                  id="picture_input2"
                  onChange={e => {
                    this.handleListingPic(e, 1);
                  }}
                  style={{ display: "none" }}
                />
              </div>

              <div style={{ height: "100px", width: "100px" }}>
                <label htmlFor="picture_input3">
                  <img
                    src={
                      this.state.picThree ? this.state.picThree : add_image_icon
                    }
                    alt=""
                    style={{ height: "100px" }}
                  />
                </label>
                <input
                  type="file"
                  id="picture_input3"
                  onChange={e => {
                    this.handleListingPic(e, 1);
                  }}
                  style={{ display: "none" }}
                />
              </div>

              <div style={{ height: "100px", width: "100px" }}>
                <label htmlFor="picture_input4">
                  <img
                    src={
                      this.state.picFour ? this.state.picFour : add_image_icon
                    }
                    alt=""
                    style={{ height: "100px" }}
                  />
                </label>
                <input
                  type="file"
                  id="picture_input4"
                  onChange={e => {
                    this.handleListingPic(e, 1);
                  }}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>

          <div className="card" style={{ textAlign: "center" }}>
            <div>
              Address <hr />
              <input
                type=""
                className="input"
                name="address"
                onChange={e => {
                  this.handleInput(e);
                }}
                value={this.state.address}
              />
            </div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <h1>Building Type</h1>
            <hr />
            <div style={{ flexDirection: "column" }}>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="buidlingType"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Residential"}
                >
                  Residential
                  {this.state.buidlingType === "Residential" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="buidlingType"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Business"}
                >
                  Business
                  {this.state.buidlingType === "Business" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="buidlingType"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Other"}
                >
                  Other
                  {this.state.buidlingType === "Other" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <h1>Space Type</h1>
            <hr />
            <div style={{ flexDirection: "column" }}>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="spaceType"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Driveway"}
                >
                  Driveway
                  {this.state.spaceType === "Driveway" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="spaceType"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Home Garage"}
                >
                  Home Garage
                  {this.state.spaceType === "Home Garage" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="spaceType"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Parking Garage"}
                >
                  Parking Garage
                  {this.state.spaceType === "Parking Garage" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="spaceType"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Parking Lot"}
                >
                  Parking Lot
                  {this.state.spaceType === "Parking Lot" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="spaceType"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Unpaved Lot"}
                >
                  Unpaved Lot
                  {this.state.spaceType === "Unpaved Lot" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
            </div>
            <br />
            <br />
            <div>
              Number of Available Spaces: <hr />
              <input
                type=""
                className="input"
                name="numSpaces"
                onChange={e => {
                  this.handleInput(e);
                }}
                value={this.state.numSpaces}
              />
            </div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <h1>Space Size</h1>
            <hr />
            <div style={{ flexDirection: "column" }}>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="spaceSize"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Compact"}
                >
                  Compact
                  {this.state.spaceSize === "Compact" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="spaceSize"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Midsized"}
                >
                  Midsized
                  {this.state.spaceSize === "Midsized" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="spaceSize"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Large"}
                >
                  Large
                  {this.state.spaceSize === "Large" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="spaceSize"
                  onClick={e => {
                    this.handleInput(e);
                  }}
                  value={"Oversized"}
                >
                  Oversized
                  {this.state.spaceSize === "Oversized" ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div>
              <h1>About</h1>
              <hr />
              <input
                type=""
                className="input"
                name="about"
                onChange={e => {
                  this.handleInput(e);
                }}
                value={this.state.about}
              />
            </div>
            <div>
              Instructions:{" "}
              <input
                type=""
                className="input"
                name="instructions"
                onChange={e => {
                  this.handleInput(e);
                }}
                value={this.state.instructions}
              />
            </div>
            <div>
              Hourly Rate: <br />$
              <input
                type=""
                className="input"
                name="price"
                onChange={e => {
                  this.handleInput(e);
                }}
                value={this.state.price}
              />
            </div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <h1>Features</h1>
            <hr />
            <div style={{ flexDirection: "column" }}>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="covered"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.covered}
                >
                  Covered
                  {this.state.covered ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="lit"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.lit}
                >
                  Lit
                  {this.state.lit ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="charging"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.charging}
                >
                  Charging
                  {this.state.charging ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="camera"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.camera}
                >
                  Camera
                  {this.state.camera ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="fenced"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.fenced}
                >
                  Fenced
                  {this.state.fenced ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="guarded"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.guarded}
                >
                  Guarded
                  {this.state.guarded ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <h1>Availability</h1>
            <hr />
            <div style={{ flexDirection: "column" }}>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="monday"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.monday}
                >
                  Monday
                  {this.state.monday ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="tuesday"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.tuesday}
                >
                  Tuesday
                  {this.state.tuesday ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="wednesday"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.wednesday}
                >
                  Wednesday
                  {this.state.wednesday ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="thursday"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.thursday}
                >
                  Thursday
                  {this.state.thursday ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="friday"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.friday}
                >
                  Friday
                  {this.state.friday ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="saturday"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.saturday}
                >
                  Saturday
                  {this.state.saturday ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="sunday"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.sunday}
                >
                  Sunday
                  {this.state.sunday ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <h1>Payments</h1>
            <hr />
            <div style={{ flexDirection: "column" }}>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="cash"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.cash}
                >
                  Cash
                  {this.state.cash ? (
                    <img
                      className="animated bounceIn checkmark"
                      alt=""
                      src={checkmark_icon}
                    />
                  ) : (
                    <div />
                  )}
                </button>
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="credit"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.credit}
                >
                  Credit
                </button>
                {this.state.credit ? (
                  <img
                    className="animated bounceIn checkmark"
                    alt=""
                    src={checkmark_icon}
                  />
                ) : (
                  <div />
                )}
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="venmo"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.venmo}
                >
                  Venmo
                </button>
                {this.state.venmo ? (
                  <img
                    className="animated bounceIn checkmark"
                    alt=""
                    src={checkmark_icon}
                  />
                ) : (
                  <div />
                )}
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="payPal"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.payPal}
                >
                  PayPal
                </button>
                {this.state.payPal ? (
                  <img
                    className="animated bounceIn checkmark"
                    alt=""
                    src={checkmark_icon}
                  />
                ) : (
                  <div />
                )}
              </div>
              <div className="divwithcheck">
                <button
                  className="smallbutton buttoncheckmark"
                  name="applePay"
                  onClick={e => {
                    this.handleClick(e);
                  }}
                  value={this.state.applePay}
                >
                  ApplePay
                </button>
                {this.state.applePay ? (
                  <img
                    className="animated bounceIn checkmark"
                    alt=""
                    src={checkmark_icon}
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
          <button
            className="bigbutton"
            onClick={e => {
              this.updateListing();
            }}
          >
            Update
          </button>
        </div>
      </div>
    );
  }
}
