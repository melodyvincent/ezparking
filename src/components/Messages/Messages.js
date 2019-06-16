import React, { Component } from "react";
import Nav from "./../Nav/Nav";

export default class Messages extends Component {
  constructor() {
    super();

    this.state = {
      toggle: true,
      messages: [
        "fakeone",
        "another fake message to Todd",
        "Make me more fake messages for erik hehe"
      ]
    };
  }

  render() {
    let mappedmessages1 = this.state.messages.map((e, i) => <p key={i}>{e}</p>);

    return (
      <div>
        <Nav />
        <p>Messaging</p>
        <div>
          <button
            className="smallbutton"
            onClick={() => {
              this.setState({ toggle: true });
            }}
          >
            Lots Im asking about
          </button>
          <button
            className="smallbutton"
            onClick={() => {
              this.setState({ toggle: false });
            }}
          >
            Lots Im hosting
          </button>
          {this.state.toggle ? (
            <div>{mappedmessages1}</div>
          ) : (
            <div>
              <p>Not a list</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
