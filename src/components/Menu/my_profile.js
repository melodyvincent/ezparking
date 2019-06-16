import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "./../redux/reducer";
import Nav from "../Nav/Nav";
import axios from "axios";

import edit_icon from "./../newImages/edit_icon.svg";
import cancel_icon from "./../newImages/cancel_icon.svg";
import upload_icon from "./../newImages/upload_icon.svg";

class Myprofile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      profilepicture: "",
      googlename: "",
      username: "",
      email: "",
      phonenumber: "",
      edit: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleEdit() {
    this.setState({ edit: !this.state.edit });
  }
  componentDidMount() {
    axios.get("/auth/user").then(res => {
      this.props.getUser();
    });
  }

  render() {
    console.log("my profile ", this.props);
    return (
      <div>
        <Nav />
        <div className="myprofile">
          {this.state.edit ? (
            <div className="card">
              <div>
                <img
                  alt=""
                  src={this.props.user.user_pic}
                  style={{
                    height: "130px",
                    borderRadius: "50%",
                    margin: "20px auto 50px auto",
                    display: "block"
                  }}
                />
              </div>
              <p>Name: {this.props.user.username}</p>
              <hr />
              Username:{" "}
              <input
                type="username"
                className="input"
                name="username"
                value={this.state.username}
                onChange={e => {
                  this.handleChange(e);
                }}
              />
              <hr />
              Email:{" "}
              <input
                type="email"
                className="input"
                name="email"
                value={this.state.email}
                onChange={e => {
                  this.handleChange(e);
                }}
              />
              <hr />
              Phonenumber:{" "}
              <input
                type="phonenumber"
                className="input"
                name="phonenumber"
                value={this.state.phonenumber}
                onChange={e => {
                  this.handleChange(e);
                }}
              />
              <hr />
              <div>
                <img
                  src={cancel_icon}
                  alt=""
                  onClick={() => {
                    this.handleEdit();
                  }}
                  style={{ height: "27px" }}
                />
                <img
                  alt=""
                  src={upload_icon}
                  style={{ float: "right", height: "25px" }}
                />
              </div>
            </div>
          ) : (
            <div className="card">
              <div>
                <img
                  alt=""
                  src={this.props.user.user_pic}
                  style={{
                    height: "150px",
                    borderRadius: "50%",
                    margin: "20px auto 50px auto",
                    display: "block"
                  }}
                />
              </div>
              <div>Name: {this.props.user.username}</div>
              <hr />
              <div>Username: </div>
              <hr />
              <div>Email:</div>
              <hr />
              <div>Phonenumber:</div>
              <hr />
              <img
                style={{ height: "22px" }}
                onClick={() => {
                  this.handleEdit();
                }}
                src={edit_icon}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user
  };
}

export default connect(
  mapStateToProps,
  { getUser }
)(Myprofile);
