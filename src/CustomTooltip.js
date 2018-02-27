import React from 'react';
import {
  VictoryTooltip,
  Line,
  Rect,
  VictoryLabel,
} from 'victory';
import CustomFlyout from './CustomFlyout';

export default function (props) {
  const {
    data,
    datum,
    scale,
  } = props;

  const transformXShift = datum.x < data[0].length / 2
    ? 10
    : -300 - 10;
  
  const transformX = scale.x(datum.x) + transformXShift;
  const height = 30 + (30 * 2);
  const graphHeight = 440;
  const transformY = (graphHeight - height) / 2;
  return (
    <g>
      <Line
        x1={scale.x(datum.x)}
        x2={scale.x(datum.x)}
        y1={0 + 10} // calculated from paddings on VictoryChart
        y2={500 - 50} // calcuated from paddings on VictoryChart
        style={{
          stroke: "rgba(0, 0, 0, .1)",
          strokeWidth: 1
        }}
      />
      <g transform={`translate(${transformX}, ${transformY})`}>
        <Rect
          style={{
            fill: 'white',
            fillOpacity: .9,
            stroke: "rgba(0, 0, 0, .1)",
            strokeWidth: 1,
          }}
          width={300}
          height={height}
        />
        <Rect
          style={{
            fill: 'yellow', // PS50
          }}
          height={30}
          width={300}
        />
        <Line
          x1={0}
          x2={300}
          y1={32}
          y2={32}
          style={{
            stroke: '#ddd',
            strokeWidth: 1,
          }}
        />
        <VictoryLabel
          x={10}
          y={15}
          style={{
            fontSize: 14
          }}
          text="Oct. 16, 2017"
        />
        <VictoryLabel
          x={285}
          y={15}
          style={{
            fontSize: 14
          }}
          text="Installs"
          textAnchor="end"
        />
      </g>
    </g >
  );


}