import React, { Component } from 'react';
import Spinner from 'react-loader-spinner';

import s from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <Spinner
        className={s.Loader}
        type="ThreeDots"
        color="#18288c"
        height={100}
        width={200}
      />
    );
  }
}

export default Loader;
