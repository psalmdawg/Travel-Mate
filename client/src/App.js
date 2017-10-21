import React, { Component } from 'react';
import Memories from './components/memory';


class App extends Component {
  constructor(){
    super()
    this.state = {
      memories:null
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">stlkr</h1>
        </header>
        <Memories />
      </div>
    );
  }
}

export default App;
