import React, { Component } from 'react';
import Scanner from './Scanner';
import Result from './Result';

class App extends Component {
  constructor() {
    super()
    this.state = {
      scanning: false,
      results: []
    }
  }

  render() {
    return (
      <div>
        <button onClick={this._scan.bind(this)}>{this.state.scanning ? 'Stop' : 'Start'}</button>
        <ul className="results">
            {this.state.results.map((result) => (<Result key={result.codeResult.code} result={result} />))}
        </ul>
        {this.state.scanning ? <Scanner onDetected={this._onDetected.bind(this)}/> : null}
      </div>
    );
  }

  _scan() {
    console.log('App #scan')
    this.setState({scanning: !this.state.scanning});
  }

  _onDetected(result) {
    console.log('App #onDetected')
    this.setState({results: this.state.results.concat([result])});
  }
}

export default App;
