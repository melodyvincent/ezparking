import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Wizards.css";
import cancel_icon from "./../../newImages/cancel_icon.svg";
import rightarrow_icon from "./../../newImages/rightarrow_icon.svg";
import leftarrow_icon from "./../../newImages/leftarrow_icon.svg";
import {
  updateWizSpaceSize,
  updateWizDescription,
  updateWizInstructions,
  updateWizCovered,
  updateWizLit,
  updateWizCharging,
  updateWizCamera,
  updateWizFenced,
  updateWizGuarded
} from "./../../redux/reducer";
import { connect } from "react-redux";
import checkmark_icon from "./../../newImages/checkmark_icon.svg";

class Wizard3 extends Component {
  render() {
    // console.log(this.props)
    const {
      updateWizDescription,
      updateWizInstructions,
      updateWizSpaceSize,
      updateWizCovered,
      updateWizLit,
      updateWizCharging,
      updateWizCamera,
      updateWizFenced,
      updateWizGuarded
    } = this.props;

    return (
      <div className="reset">
        <div className="nav">
          <Link to="/wizard2">
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

          <Link to="/wizard5">
            <img
              className="wizardnav"
              alt=""
              src={rightarrow_icon}
              style={{ height: "30px", width: "30px" }}
            />
          </Link>
        </div>
        <div className="wizard">
          <div className="card">
            <h1>
              Please provide parking instructions and a description of your
              lot(s).
            </h1>
            <input
              className="input"
              placeholder="Parking Instructions"
              onChange={e => {
                updateWizInstructions(e.target.value);
              }}
            />
            <input
              className="input"
              placeholder="Lot Description"
              onChange={e => {
                updateWizDescription(e.target.value);
              }}
            />
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
            <h1>Plase select a parking space size.</h1>
            <button
              className="smallbutton buttoncheckmark"
              onClick={() => updateWizSpaceSize("Compact")}
            >
              Compact
              {this.props.spaceSize === "Compact" ? (
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
              onClick={() => updateWizSpaceSize("Midsized")}
            >
              Midsized
              {this.props.spaceSize === "Midsized" ? (
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
              onClick={() => updateWizSpaceSize("Large")}
            >
              Large
              {this.props.spaceSize === "Large" ? (
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
              onClick={() => updateWizSpaceSize("Oversized")}
            >
              Oversized
              {this.props.spaceSize === "Oversized" ? (
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
            <h1>Please select all features that apply:</h1>
            <button
              className="smallbutton buttoncheckmark"
              onClick={() => updateWizCovered(!this.props.covered)}
            >
              Covered
              {this.props.covered ? (
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
              onClick={() => updateWizLit(!this.props.lit)}
            >
              Lit
              {this.props.lit ? (
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
              onClick={() => updateWizCharging(!this.props.charging)}
            >
              Charging
              {this.props.charging ? (
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
              onClick={() => updateWizCamera(!this.props.camera)}
            >
              Camera
              {this.props.camera ? (
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
              onClick={() => updateWizFenced(!this.props.fenced)}
            >
              Fenced
              {this.props.fenced ? (
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
              onClick={() => updateWizGuarded(!this.props.guarded)}
            >
              Guarded
              {this.props.guarded ? (
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

          <br />
          <br />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    description,
    instructions,
    spaceSize,
    covered,
    lit,
    charging,
    camera,
    fenced,
    guarded
  } = state;
  return {
    description: description,
    instructions: instructions,
    spaceSize: spaceSize,
    covered: covered,
    lit: lit,
    charging: charging,
    camera: camera,
    fenced: fenced,
    guarded: guarded
  };
}

export default connect(
  mapStateToProps,
  {
    updateWizDescription,
    updateWizInstructions,
    updateWizSpaceSize,
    updateWizCovered,
    updateWizLit,
    updateWizCharging,
    updateWizCamera,
    updateWizFenced,
    updateWizGuarded
  }
)(Wizard3);
