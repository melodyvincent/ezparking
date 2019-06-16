import React, { Component } from "react";
import Nav from "./../Nav/Nav";
import axios from "axios";
import { connect } from "react-redux";

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: []
    };
  }
  componentDidMount() {
    const { user } = this.props;
    axios.get(`/api/reservation/${user.id}`).then(res => {
      this.setState({
        reservations: res.data
      });
    });
  }
  render() {
    const { reservations } = this.state;
    console.log(reservations);
    let mappedReservations = reservations.map((reservation, i) => {
      return (
        <div className="card" key={i}>
          <div>
            <p>ADDRESS: {reservation.address}</p>
          </div>
          <br />
          <div>
            <p>VEHICLE: {reservation.vehicle_id}</p>
          </div>
          <br />
          <div>
            <p>PAYMENT TYPE: {reservation.payment_type}</p>
          </div>
          <br />
          <div className="simple-border">
            <p>FROM: {reservation.start_time}</p>
            <hr />
            <p>TO: {reservation.end_time}</p>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Nav />
        <div className="card">
          <div>
            <h1>Current Reservations</h1>
            <hr />
          </div>
          <div>{mappedReservations}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Reservations);
