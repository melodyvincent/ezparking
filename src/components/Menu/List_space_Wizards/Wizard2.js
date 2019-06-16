import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Wizards.css";
import cancel_icon from "./../../newImages/cancel_icon.svg";
import rightarrow_icon from "./../../newImages/rightarrow_icon.svg";
import leftarrow_icon from "./../../newImages/leftarrow_icon.svg";
import add_icon from "./../../newImages/add_icon.svg";
import minus_icon from "./../../newImages/minus_icon.svg";
import {
  updateWizSpaceType,
  updateWizSpaceQuantity
} from "./../../redux/reducer";
import { connect } from "react-redux";
import checkmark_icon from "./../../newImages/checkmark_icon.svg";

class Wizard2 extends Component {
  increaseSpaceQuanity() {
    this.props.updateWizSpaceQuantity(this.props.spaceQuantity + 1);
    // console.log(this.props.spaceQuantity + 1)
  }

  decreaseSpaceQuantity() {
    if (this.props.spaceQuantity <= 0) {
      this.props.updateWizSpaceQuantity(0);
    } else {
      this.props.updateWizSpaceQuantity(this.props.spaceQuantity - 1);
    }
  }

  render() {
    const { updateWizSpaceType } = this.props;

    return (
      <div className="reset">
        <div className="nav">
          <Link to="/wizard1">
            <img
              className="wizardnav"
              alt=""
              src={leftarrow_icon}
              style={{ height: "30px", width: "30px" }}
            />
          </Link>

          <Link to="/search">
            <img
              className="wizardnav"
              alt=""
              src={cancel_icon}
              style={{ height: "30px", width: "30px" }}
            />
          </Link>

          <Link to="/wizard3">
            <img
              className="wizardnav"
              alt=""
              src={rightarrow_icon}
              style={{ height: "30px", width: "30px" }}
            />
          </Link>
        </div>
        <div className="wizard">
          <div
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h1>Please select your parking space type.</h1>
            <button
              className="smallbutton buttoncheckmark"
              onClick={() => updateWizSpaceType("Driveway")}
            >
              Driveway
              {this.props.spaceType === "Driveway" ? (
                <img
                  className="animated bounceIn checkmark"
                  alt=""
                  src={checkmark_icon}
                />
              ) : (
                <div />
              )}
            </button>
            <button
              className="smallbutton buttoncheckmark"
              onClick={() => updateWizSpaceType("Home Garage")}
            >
              Home Garage
              {this.props.spaceType === "Home Garage" ? (
                <img
                  className="animated bounceIn checkmark"
                  alt=""
                  src={checkmark_icon}
                />
              ) : (
                <div />
              )}
            </button>
            <button
              className="smallbutton buttoncheckmark"
              onClick={() => updateWizSpaceType("Parking Garage")}
            >
              Parking Garage
              {this.props.spaceType === "Parking Garage" ? (
                <img
                  className="animated bounceIn checkmark"
                  alt=""
                  src={checkmark_icon}
                />
              ) : (
                <div />
              )}
            </button>
            <button
              className="smallbutton buttoncheckmark"
              onClick={() => updateWizSpaceType("Parking Lot")}
            >
              Parking Lot
              {this.props.spaceType === "Parking Lot" ? (
                <img
                  className="animated bounceIn checkmark"
                  alt=""
                  src={checkmark_icon}
                />
              ) : (
                <div />
              )}
            </button>
            <button
              className="smallbutton buttoncheckmark"
              onClick={() => updateWizSpaceType("Unpaved Lot")}
            >
              Unpaved Lot
              {this.props.spaceType === "Unpaved Lot" ? (
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
          <div
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h1>Please select your parking space quantity.</h1>
            <span style={{ fontSize: "50px", color: "rgb(0, 130, 252)" }}>
              {this.props.spaceQuantity}
            </span>
            <div>
              <button
                className="roundbutton"
                onClick={() => {
                  this.decreaseSpaceQuantity();
                }}
              >
                <img alt="" src={minus_icon} style={{ height: "25px" }} />
              </button>
              <button
                className="roundbutton"
                onClick={() => {
                  this.increaseSpaceQuanity();
                }}
              >
                <img alt="" src={add_icon} style={{ height: "25px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  const { spaceType, spaceQuantity } = state;
  return {
    spaceType: spaceType,
    spaceQuantity: spaceQuantity
  };
}

export default connect(
  mapStateToProps,
  { updateWizSpaceType, updateWizSpaceQuantity }
)(Wizard2);
