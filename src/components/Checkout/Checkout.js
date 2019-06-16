import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getUser } from './../redux/reducer'
import { Link } from "react-router-dom";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: {},
      user: {},
      name: "",
      email: "",
      subject: "",
      message: ""
    };

    this.sendMail = this.sendMail.bind(this);
  }

  componentDidMount() {
    const { host_id } = this.props.currentListing;
    this.props.getUser().then(
      this.setState({
        logged_user_name: "",
        logged_user_email: ""
      })
    );
    axios.get(`/api/host/${host_id}`).then(res => {
      this.setState({ host: res.data[0] });
    });
  }

  sendMail(e) {
    e.preventDefault();
    axios
      .post("/api/sendmail", {
        name: this.props.user.username,
        emailFrom: this.props.user.email,
        emailTo: this.state.host.email,
        subject: this.state.subject,
        message: this.state.message
      })
      .then(res => {
        this.setState({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        this.props.history.push("/listing");
      });
  }

  render() {
    console.log("Chat Props ", this.props.user);
    console.log(this.state.host);
    return (
      <div className="chat-main">
        <form id="contact-form" onSubmit={this.sendMail}>
          <div className="form-group">
            <p className="">From: {this.props.user.username}</p>
          </div>
          <div className="form-group">
            {/* <label >From Email Address</label> */}
            <p className="">{this.props.user.email}</p>
          </div>
          <br />
          <div>
            <p className="">To: {this.state.host.email}</p>
          </div>
          <br />

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              value={this.state.subject}
              onChange={e => this.setState({ subject: e.target.value })}
              // className="form-control"
              className="input"
              id="subject"
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              // className="form-control"
              className="txtarea"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
              rows="5"
              id="message"
            />
          </div>
          <button
            type="submit"
            // className="btn-primary"
            className="smallbutton"
          >
            Submit
          </button>
          <br />

          <a className="smallbutton" href="javascript:history.back()">
            Go Back
          </a>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, currentListing } = state;
  return {
    user: user,
    currentListing: currentListing
  };
}

export default connect(
  mapStateToProps,
  { getUser }
)(Chat);
