import React, { Component } from "react";
import axios from "axios";
import { storage } from "../Firebase";
import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import "./my_vehicle.css";
import delete_icon from "./../newImages/delete_icon.svg";
import edit_icon from "./../newImages/edit_icon.svg";
import no_image from "./../Images/no_image.png";
import addimage_icon from "./../newImages/addimage_icon.svg";
import cancel_icon from "./../newImages/cancel_icon.svg";
import upload_icon from "./../newImages/upload_icon.svg";

class Myvehicle extends Component {
  constructor() {
    super();

    this.state = {
      Year: "",
      Make: "",
      Model: "",
      Color: "",
      Size: "",
      Plate: "",
      car_pic: "",
      vehicles: [],
      edit: false,
      view: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  componentDidMount() {
    const { user } = this.props;
    axios.get(`/api/vehicle/${user.id}`).then(res => {
      this.setState({ vehicles: res.data });
    });
  }
  changeViews() {
    this.setState({
      Year: "",
      Make: "",
      Model: "",
      Color: "",
      Size: "",
      Plate: "",
      car_pic: "",
      view: true,
      edit: false
    });
  }
  editToggle(e) {
    this.setState({
      edit: false,
      Year: "",
      Make: "",
      Model: "",
      Color: "",
      Size: "",
      Plate: "",
      car_pic: ""
    });
  }
  cancel() {
    this.setState({
      view: false,
      Year: "",
      Make: "",
      Model: "",
      Color: "",
      Size: "",
      Plate: "",
      car_pic: ""
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleCarPic(e) {
    if (e.target.files[0]) {
      const car_pic = e.target.files[0];
      const uploadTask = storage
        .ref(`main_images/${car_pic.name}`)
        .put(car_pic);
      uploadTask.on("state_changed", () => {
        storage
          .ref("main_images")
          .child(car_pic.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ car_pic: url });
          });
      });
    }
  }

  handleEdit(e) {
    this.setState({
      edit: true,
      Year: e.year,
      Make: e.make,
      Model: e.model,
      Color: e.color,
      Size: e.size,
      Plate: e.plate,
      car_pic: e.car_pic
    });
  }
  handleToggle() {
    this.setState({ toggle: !this.state.toggle });
  }
  addCar() {
    const { user } = this.props;
    let body = {
      user_id: user.id,
      car_pic: this.state.car_pic,
      year: this.state.Year,
      make: this.state.Make,
      model: this.state.Model,
      color: this.state.Color,
      size: this.state.Size,
      plate: this.state.Plate
    };
    axios.post("/api/vehicle", body).then(res => {
      this.componentDidMount();
      this.setState({
        vehicles: res.data,
        Year: "",
        Make: "",
        Model: "",
        Color: "",
        Size: "",
        Plate: "",
        car_pic: "",
        view: false
      });
    });
  }
  updateCar(e) {
    let id = e.id;
    let body = {
      car_pic: this.state.car_pic,
      year: this.state.Year,
      make: this.state.Make,
      model: this.state.Model,
      color: this.state.Color,
      size: this.state.Size,
      plate: this.state.Plate
    };
    axios.put(`/api/vehicle/${id}`, body).then(res => {
      this.componentDidMount();
      this.setState({ edit: false });
    });
  }
  deleteCar(id) {
    let result = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );
    if (result) {
      axios.delete(`/api/vehicle/${id}`).then(res => {
        this.componentDidMount();
      });
    }
  }

  render() {
    let mappedVehicles = this.state.vehicles.map((e, i) => (
      <div key={i}>
        <div>
          {this.state.edit ? (
            // IN EDITING MODE
            <div className="card">
              {e.car_pic ? (
                <img alt="" src={e.car_pic} className="carpic" />
              ) : (
                <div>
                  {this.state.car_pic ? (
                    <img
                      alt=""
                      src={this.state.car_pic}
                      style={{
                        height: "150px",
                        display: "block",
                        margin: "auto"
                      }}
                    />
                  ) : (
                    <div>
                      {this.state.edit ? (
                        <div>
                          <label htmlFor="picture_input2">
                            <img src={addimage_icon} alt="" id="addimageicon" />
                          </label>
                          <input
                            type="file"
                            id="picture_input2"
                            onChange={e => {
                              this.handleCarPic(e);
                            }}
                            style={{ display: "none" }}
                          />
                        </div>
                      ) : (
                        <img alt="" src={no_image} className="carpic" />
                      )}
                    </div>
                  )}
                </div>
              )}
              <div>
                <hr />
                <p className="ptag">
                  Year:{" "}
                  <input
                    type=""
                    className="input"
                    name="Year"
                    onChange={e => {
                      this.handleChange(e);
                    }}
                    value={this.state.Year}
                    maxLength="4"
                  />
                </p>
                <hr />
                <p className="ptag">
                  Make:{" "}
                  <input
                    type=""
                    className="input"
                    name="Make"
                    onChange={e => {
                      this.handleChange(e);
                    }}
                    value={this.state.Make}
                  />
                </p>
                <hr />
                <p className="ptag">
                  Model:{" "}
                  <input
                    type=""
                    className="input"
                    name="Model"
                    onChange={e => {
                      this.handleChange(e);
                    }}
                    value={this.state.Model}
                  />
                </p>
                <hr />
                <p className="ptag">
                  Color:{" "}
                  <input
                    type=""
                    className="input"
                    name="Color"
                    onChange={e => {
                      this.handleChange(e);
                    }}
                    value={this.state.Color}
                  />
                </p>
                <hr />
                <p className="ptag">
                  Size:{" "}
                  <input
                    type=""
                    className="input"
                    name="Size"
                    onChange={e => {
                      this.handleChange(e);
                    }}
                    value={this.state.Size}
                  />
                </p>
                <hr />
                <p className="ptag">
                  Plate:{" "}
                  <input
                    type=""
                    className="input"
                    name="Plate"
                    onChange={e => {
                      this.handleChange(e);
                    }}
                    value={this.state.Plate}
                  />
                </p>
                <hr />
              </div>
              <div style={{ padding: "10px" }}>
                <img
                  alt=""
                  style={{ height: "28px" }}
                  src={cancel_icon}
                  onClick={() => {
                    this.editToggle();
                  }}
                />
                <img
                  alt=""
                  style={{ height: "28px", float: "right" }}
                  src={upload_icon}
                  onClick={() => {
                    this.updateCar(e);
                  }}
                />
              </div>
            </div>
          ) : (
            // NOT IN EDITING MODE
            <div className="card">
              {e.car_pic ? (
                <img alt="" src={e.car_pic} className="carpic" />
              ) : (
                <img
                  alt=""
                  src={no_image}
                  style={{ height: "150px", margin: "auto", display: "block" }}
                />
              )}
              <div>
                <hr />
                <p>Year: {e.year}</p>
                <hr />
                <p>Make: {e.make}</p>
                <hr />
                <p>Model: {e.model}</p>
                <hr />
                <p>Color: {e.color}</p>
                <hr />
                <p>Size: {e.size}</p>
                <hr />
                <p>Plate: {e.plate}</p>
                <hr />
                <div style={{ padding: "10px" }}>
                  <img
                    style={{ height: "22px" }}
                    alt=""
                    src={delete_icon}
                    onClick={id => {
                      this.deleteCar(e.id);
                    }}
                  />
                  <img
                    style={{ float: "right", height: "25px" }}
                    alt=""
                    src={edit_icon}
                    onClick={() => {
                      this.handleEdit(e);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    ));
    return (
      <div>
        {this.state.view ? (
          <div>
            <Nav />
            <div className="card">
              {this.state.car_pic ? (
                <div>
                  <img alt="" src={this.state.car_pic} className="carpic" />
                </div>
              ) : (
                <div>
                  <label htmlFor="picture_input">
                    <img src={addimage_icon} alt="" id="addimageicon" />
                  </label>
                  <input
                    type="file"
                    id="picture_input"
                    onChange={e => {
                      this.handleCarPic(e);
                    }}
                    style={{ display: "none" }}
                  />
                </div>
              )}

              <p className="ptag">
                Year:{" "}
                <input
                  type=""
                  className="input"
                  value={this.state.Year}
                  name="Year"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  maxLength="4"
                />
              </p>
              <br />
              <p className="ptag">
                Make:{" "}
                <input
                  type=""
                  className="input"
                  value={this.state.Make}
                  name="Make"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </p>
              <br />
              <p className="ptag">
                Model:{" "}
                <input
                  type=""
                  className="input"
                  value={this.state.Model}
                  name="Model"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </p>
              <br />
              <p className="ptag">
                Color:{" "}
                <input
                  type=""
                  className="input"
                  value={this.state.Color}
                  name="Color"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </p>
              <br />
              <p className="ptag">
                Plate:{" "}
                <input
                  type=""
                  className="input"
                  value={this.state.Plate}
                  name="Plate"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </p>
              <br />
              <p className="ptag">Size: (click on a icon button)</p>
              <br />
              <div style={{ padding: "10px" }}>
                <img
                  alt=""
                  style={{ height: "28px" }}
                  src={cancel_icon}
                  onClick={() => {
                    this.cancel();
                  }}
                />
                <img
                  alt=""
                  style={{ float: "right", height: "28px" }}
                  src={upload_icon}
                  onClick={() => {
                    this.addCar();
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Nav />
            <div className="myvehicle">
              <button
                className="bigbutton"
                onClick={() => {
                  this.changeViews();
                }}
              >
                Add a Vehicle
              </button>
              {mappedVehicles}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Myvehicle);
