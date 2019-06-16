import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Wizards.css";
import cancel_icon from "./../../newImages/cancel_icon.svg";
import rightarrow_icon from "./../../newImages/rightarrow_icon.svg";
import leftarrow_icon from "./../../newImages/leftarrow_icon.svg";
import {
  updateWizMonday,
  updateWizTuesday,
  updateWizWednesday,
  updateWizThursday,
  updateWizFriday,
  updateWizSaturday,
  updateWizSunday
} from "./../../redux/reducer";
import { connect } from "react-redux";

class Wizard6 extends Component {
  render() {
    const {
      updateWizMonday,
      updateWizTuesday,
      updateWizWednesday,
      updateWizThursday,
      updateWizFriday,
      updateWizSaturday,
      updateWizSunday
    } = this.props;

    return (
      <div className="reset">
        <div className="wizard">
          <br />
          <h1>Please indicate all available days for your parking space(s).</h1>
          <div className="card">
            <input
              type="checkbox"
              id="Monday"
              name="Monday"
              className=""
              value="Monday"
              onChange={e => {
                updateWizMonday(true);
              }}
            />
            <label htmlFor="Monday">Monday</label>
            <hr />

            <input
              type="checkbox"
              id="Tuesday"
              name="Tuesday"
              className=""
              value="Tuesday"
              onChange={e => {
                updateWizTuesday(true);
              }}
            />
            <label htmlFor="Tuesday">Tuesday</label>
            <hr />

            <input
              type="checkbox"
              id="Wednesday"
              name="Wednesday"
              className=""
              value="Wednesday"
              onChange={e => {
                updateWizWednesday(true);
              }}
            />
            <label htmlFor="Wednesday">Wednesday</label>
            <hr />

            <input
              type="checkbox"
              id="Thursday"
              name="Thursday"
              className=""
              value="Thursday"
              onChange={e => {
                updateWizThursday(true);
              }}
            />
            <label htmlFor="Thursday">Thursday</label>
            <hr />

            <input
              type="checkbox"
              name="Friday"
              id="Friday"
              className=""
              value="Friday"
              onChange={e => {
                updateWizFriday(true);
              }}
            />
            <label htmlFor="Friday">Friday</label>
            <hr />

            <input
              type="checkbox"
              id="Saturday"
              name="Saturday"
              className=""
              value="Saturday"
              onChange={e => {
                updateWizSaturday(true);
              }}
            />
            <label htmlFor="Saturday">Saturday</label>
            <hr />

            <input
              type="checkbox"
              id="Sunday"
              name="Sunday"
              className=""
              value="Sunday"
              onChange={e => {
                updateWizSunday(true);
              }}
            />
            <label htmlFor="Sunday">Sunday</label>
          </div>
          <div className="nav">
            <Link to="/wizard5">
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

            <Link to="/wizard7">
              <img
                className="wizardnav"
                alt=""
                src={rightarrow_icon}
                style={{ height: "30px", width: "30px" }}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  } = state;
  return {
    monday: monday,
    tuesday: tuesday,
    wednesday: wednesday,
    thursday: thursday,
    friday: friday,
    saturday: saturday,
    sunday: sunday
  };
}

export default connect(
  mapStateToProps,
  {
    updateWizMonday,
    updateWizTuesday,
    updateWizWednesday,
    updateWizThursday,
    updateWizFriday,
    updateWizSaturday,
    updateWizSunday
  }
)(Wizard6);
