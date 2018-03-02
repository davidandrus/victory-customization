import React from 'react';
import {
  Circle,
  VictoryTooltip,
  Line,
  Rect,
  VictoryLabel,
} from 'victory';

export default function (props) {
  const {
    data,
    datum,
    scale,
  } = props;

  const boxOffset = 25;
  const headerHeight = 30;
  const transformXShift = datum.x < data[0].length / 2
    ? boxOffset
    : -300 - boxOffset;
  
  const transformX = scale.x(datum.x) + transformXShift;
  const height = 30 + (45 * 1 /* modifier should be dynamic */) + 10;
  const graphHeight = 440;
  const transformY = (graphHeight - height) / 2;
  const outerPadding = 10;
  const tooltipWidth = 300;
  const radius = 5;
  const dotGutter = 5;

  console.log({
    data,
    datum,
  });

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
          width={tooltipWidth}
          height={height}
        />
        <Rect
          style={{
            fill: '#efefef', // PS50
          }}
          height={headerHeight}
          width={tooltipWidth}
        />
        <Line
          x1={0}
          x2={tooltipWidth}
          y1={headerHeight}
          y2={headerHeight}
          style={{
            stroke: '#ddd',
            strokeWidth: 1,
          }}
        />
        <VictoryLabel
          x={outerPadding}
          y={15}
          style={{
            fontSize: 14
          }}
          text="Oct. 16, 2017"
        />
        <VictoryLabel
          x={tooltipWidth - outerPadding}
          y={15}
          style={{
            fontSize: 14
          }}
          text="Installs"
          textAnchor="end"
        />
        <VictoryLabel
          // the 50 needs to be dynamic
          x={tooltipWidth - outerPadding - 50}
          y={15}
          style={{
            fontSize: 14
          }}
          text="Unique Clicks"
          textAnchor="end"
        />
        <g transform='translate(0, 45)'>
          <g transform={`translate(0, 0)`}>
            <Circle 
              style={{
                fill: 'red',
              }}
              r={radius}
              cx={outerPadding + radius}
              cy={outerPadding - radius}
            />
            <VictoryLabel 
              text="Totals" 
              x={outerPadding + (radius * 2) + dotGutter}
              y={4}
            />
            <VictoryLabel 
              text={data[0][0][datum.x].y}
              x={tooltipWidth - outerPadding - 50}
              y={4}
              textAnchor='end'
            />
            <VictoryLabel 
              text={data[1][0][datum.x].y}
              x={tooltipWidth - outerPadding}
              y={4}
              textAnchor='end'
            />
          </g>
        </g>
      </g>
    </g >
  );


}