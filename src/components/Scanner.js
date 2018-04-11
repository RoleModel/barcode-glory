import React, { Component } from 'react';
import Quagga from 'quagga';

class Scanner extends Component {

  render() {
    return (
      <div id='interactive' className='viewport'>
        <video
          className='videoCamera'
          autoPlay='true'
          preload='auto'
          src=''
          muted='true'
          playsInline='true'>
        </video>
        <canvas
          className='drawingBuffer'
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}>
          </canvas>
      </div>
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
          width: window.innerWidth,
          height: window.innerHeight,
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
      Quagga.start();
    });
    Quagga.onDetected(this._onDetected.bind(this));
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected.bind(this));
  }

  _onDetected(result) {
    this.props.onDetected(result);
  }
}

export default Scanner;
