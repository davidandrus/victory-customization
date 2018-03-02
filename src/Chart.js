import React from "react";
import range from 'lodash/range';
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";

import CustomTooltip from './CustomTooltip';
import CustomAxisLabel from './CustomAxisLabel';

export default function Chart(props) {
  const {
    data,
    data2,
  } = props;

  const dataArr = [data, data2];
  const maxima = dataArr.map(set => {
    return Math.max(...set[0].map(({ y }) => y));
  });

  const labels = ['Really Long Metric Name', 'Long Metric Name'];
  console.log(range(0, 8))

  return (
    <VictoryChart
      domain={{ y: [0, 1] }}
      height={500}
      padding={{
        top: 10,
        left: 70,
        right: 70,
        bottom: 50,
      }}
      width={1000}
      theme={VictoryTheme.grayscale}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labelComponent={<CustomTooltip data={data} />}
          labels={(d) => `y: ${d.y}`}
          voronoiBlacklist={['line']}
          padding={0}
          responsive={false}
        />
      }>
      <VictoryAxis
        label="Day"
        tickValues={range(0, 8)}
      />
      {dataArr.map((set, i) => ([
        <VictoryGroup colorScale={VictoryTheme.material.group.colorScale}>
          {set.map((item) => {
            return (
              <VictoryLine
                data={item}
                key={i}
                name='line'
                style={{
                  data: {
                    strokeWidth: 2,
                    ...i === 1 ? {strokeDasharray: '4, 4'} : {},
                  }
                }}
                y={(datum) => datum.y / maxima[i]}
              />
            )
          })}
        </VictoryGroup>,
        <VictoryGroup colorScale={VictoryTheme.material.group.colorScale}>
          {set.map((item) => (
            <VictoryScatter
              data={item}
              key={i}
              size={(datum, active) => active ? 5 : 0}
              y={(datum) => datum.y / maxima[i]}
            />
          ))}
        </VictoryGroup>,
        <VictoryAxis
          dependentAxis
          label={labels[i]}
          axisLabelComponent={<CustomAxisLabel rightAxis={i == 1 ? true: false} />}
          orientation={i ===  1 ? 'right' : 'left'}
          style={{
            axisLabel: {
              padding: 50
            },
          }}
          // Use normalized tickValues (0 - 1)
          tickValues={[0, 0.25, 0.5, .75, 1]}
          // Re-scale ticks by multiplying by correct maxima
          tickFormat={(t) => (t * maxima[i] / 1000).toFixed(1) + 'k'}
        />
      ]))}
    </VictoryChart>
  );
}
