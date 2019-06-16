import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Wizards.css";
import cancel_icon from "./../../newImages/cancel_icon.svg";
import rightarrow_icon from "./../../newImages/rightarrow_icon.svg";
import leftarrow_icon from "./../../newImages/leftarrow_icon.svg";
import { updateWizBuildingType } from "./../../redux/reducer";
import { connect } from "react-redux";

import checkmark_icon from "./../../newImages/checkmark_icon.svg";

class Wizard1 extends Component {
  render() {
    const { updateWizBuildingType } = this.props;
    // console.log(this.props.buildingType)

    return (
      <div className="reset">
        <div className="nav">
          <Link to="/wizard0">
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

          <Link to="/wizard2">
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
            <h1>Please select your building type.</h1>
            <button
              className="smallbutton buttoncheckmark"
              onClick={() => updateWizBuildingType("Residential")}
            >
              Residential
              {this.props.buildingType === "Residential" ? (
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
              onClick={() => updateWizBuildingType("Business")}
            >
              Business
              {this.props.buildingType === "Business" ? (
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
              onClick={() => updateWizBuildingType("Other")}
            >
              Other
              {this.props.buildingType === "Other" ? (
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
    );
  }
}

function mapStateToProps(state) {
  // console.log(state)
  const { buildingType } = state;
  return {
    buildingType: buildingType
  };
}

export default connect(
  mapStateToProps,
  { updateWizBuildingType }
)(Wizard1);
