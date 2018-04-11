import React, { Component } from 'react';

class Result extends Component {
  render() {
    const result = this.props.result;

    if (!result) {
      return null;
    }
    return (
      <h2
        style={{
          marginTop: '10px',
          marginBottom: '100px',
          textAlign: 'center',
          fontSize: '60px',
          fontFamily: 'Consolas',
          color: 'black',
          padding: '10px'
        }}
        >{result.codeResult.code}
      </h2>
      // Format can be found with: result.codeResult.format
    );
  }
}

export default Result;
