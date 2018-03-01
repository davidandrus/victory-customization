import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { VictoryLabel, Line } from 'victory';

const LINE_HEIGHT = 30;
const LINE_SPACING = 10;

export default class CustomAxisLabel extends Component {
  updatePositions = () => {
    const height = this.elem.getBBox().width;
    const yStart = this.props.y - (height / 2) - ((LINE_HEIGHT + LINE_SPACING) / 2);
    this.line.setAttribute('y1', yStart);
    this.line.setAttribute('y2', yStart + LINE_HEIGHT);
  }

  componentDidMount() {
    this.elem = findDOMNode(this._label);
    this.line = findDOMNode(this._line);

    this.updatePositions();
  }

  componentDidUpdate() {
    this.updatePositions();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text;
  }

  render() {
    const {
      x,
      y,
    } = this.props;
    return (
      <g>
        <Line
          ref={line => this._line = line}
          x1={x - 6}
          x2={x - 6}
          style={{
            stroke: "rgb(0, 0, 0)",
            strokeWidth: 2
          }} />
        <g transform={`translate(0, ${(LINE_HEIGHT + LINE_SPACING) / 2})`}>
          <VictoryLabel {...this.props} ref={label => this._label = label}/>
        </g>
      </g>
    );
  }
}
