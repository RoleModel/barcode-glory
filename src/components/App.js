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

  _renderScanButtonAndResults() {
    if (this.state.scanning) { return null; }
    return (
      <div>
        {this._renderResults()}
        {this._renderScanButton()}
      </div>
    )
  }

  _renderScanButton() {
    const text = this.state.scanning ? 'STOP' : 'SCAN'
    const styles = {
      width: '300px',
      height: '100px',
      margin: '0',
      padding: '0',
      border: 'solid black 4px',
      borderRadius: '10px',
      backgroundColor: 'green',
      fontSize: '80px',
      color: 'white'
    }
    return (
      <button
        onClick={this._scan.bind(this)}
        style={styles}
        >{text}
      </button>
    )
  }

  _renderResults() {
    return (
      <ul className="results">
        {this.state.results.map((result) => (<Result key={result.codeResult.code} result={result} />))}
      </ul>
    )
  }

  _renderVideoStream() {
    return <Scanner onDetected={this._onDetected.bind(this)} />
  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {this._renderScanButtonAndResults() || this._renderVideoStream()}
      </div>
    );
  }

  _scan() {
    this.setState({scanning: !this.state.scanning});
  }

  _onDetected(result) {
    this.setState({
      results: this.state.results.concat([result]),
      scanning: false
    });
  }
}

export default App;
