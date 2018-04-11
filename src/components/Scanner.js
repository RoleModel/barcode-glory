import React, { Component } from 'react';
import Quagga from 'quagga';

class Scanner extends Component {

  render() {
    return (
      <div id="interactive" className="viewport"/>
    );
  }

  componentDidMount() {
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      // safely access `navigator.mediaDevices.getUserMedia`
    }
    Quagga.init({
      inputStream: {
        name: "Live",
        type : "LiveStream",
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment" // or user
        }
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: 2,
      decoder: {
        readers : [ "code_128_reader"]
      },
      locate: true
    }, function(err) {
      if (err) {
        return console.log(err);
      }
      Quagga.start();
      console.log('Scanner #componentDidMount Quagga started')
    });
    Quagga.onDetected(this._onDetected.bind(this));
  }

  componentWillUnmount() {
    console.log('Scanner #componentWillUnmount')
    Quagga.offDetected(this._onDetected.bind(this));
  }

  _onDetected(result) {
    console.log('Scanner #onDetected')
    this.props.onDetected(result);
  }
}

export default Scanner;
