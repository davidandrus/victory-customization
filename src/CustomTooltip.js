import React from 'react';
import { VictoryTooltip, Line, Rect } from 'victory';
import CustomFlyout from './CustomFlyout';

export default function (props) {
  const {
    data,
    datum,
    scale,
  } = props;

  const transformXShift = datum.x <= data[0].length / 2
    ? 10
    : -300 - 10;
  
  const transformX = scale.x(datum.x) + transformXShift;
  const height = 30 + (30 * data.length);
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
          strokeWidth: 2
        }}
      />
      <g transform={`translate(${transformX}, ${transformY})`}>
        <Rect
          style={{
            fill: 'white',
            fillOpacity: .9,
            stroke: 'gray',
            strokeWidth: 1,
          }}
          width={300}
          height={200}
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
      </g>
      {/* <foreignObject
        dy={20}
        x={scale.x(props.datum.x)}
        y={10}
        width={props.width}
        height={props.height}
      >
        <div style={{
          backgroundColor: 'white',
          boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
          height: 440,
          width: 200,
          marginLeft: -210,
          opacity: .9,
        }}
        >
          <div style={{
            backgroundColor: 'gray',
            borderBottom: '1px solid black',
            padding: 5,
          }}>Mon, May 09, 2018</div>
          <div>
          </div>
        </div>
      </foreignObject> */}
    </g >
  );


}