import React, { Component } from 'react';
import './App.css';
// import './reset.css';
import router from './routes';


// import Nav from './components/Nav/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
        {router}
      </div>
    );
  }
}

export default App;
