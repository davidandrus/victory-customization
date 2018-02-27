import React, { Component } from "react";
import range from 'lodash/range';
import random from 'lodash/random'

import Chart from "./Chart";

const getData = (min, max) => range(0, 8).map(x => ({
  x,
  y: random(min, max),
}))

const data = range(0, 11).map(i => {
  return (i < 5)
    ? getData(1, 5000)
    : getData(5000, 10000);
});

class App extends Component {
  render() {
    return <div style={{ border: '1px solid red' }}>
      <Chart data={data.slice(0, 5)} data2={data.slice(5, 11)} />
    </div>
  }
}

export default App;
