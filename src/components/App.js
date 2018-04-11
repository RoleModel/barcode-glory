import React, { Component } from 'react';
import Scanner from './Scanner';
import Result from './Result';

class App extends Component {
  constructor() {
    super()
    this.state = {
      scanning: false,
      results: [
        // {
        //   codeResult: {
        //     code: '123ABCabc'
        //   }
        // }
      ]
    }
  }

  _renderScanButtonAndResults() {
    if (this.state.scanning) { return null; }
    return (
      <div  style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
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
      padding: '0',
      border: 'solid darkGreen 6px',
      borderRadius: '10px',
      backgroundColor: 'green',
      fontSize: '80px',
      color: 'white',
      position: 'fixed',
      bottom: '20px'
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
    const result = this.state.results[this.state.results.length - 1]
    if (!result) { return null; }
    return (
      <div style={{
      }}>
        <h1
          style={{
            opacity: '0.5',
            margin: '0px',
            textAlign: 'center',
            fontSize: '32px',
            borderBottom: '2px solid #aaa',
            paddingBottom: '8px'
          }}
          >BARCODE
        </h1>
        <Result result={result}/>
      </div>
    )
    // {/* <ul className="results">
    //   {this.state.results.map((result) => (<Result key={result.codeResult.code} result={result} />))}
    // </ul> */}
  }

  _renderVideoStream() {
    return <Scanner onDetected={this._onDetected.bind(this)} />
  }

  render() {
    return this._renderScanButtonAndResults() || this._renderVideoStream()
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
