import React from "react";
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

  return (
    <VictoryChart
      height={500}
      padding={{ top: 10, left: 70, right: 70, bottom: 50 }}
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
      />
      <VictoryAxis
        dependentAxis
        label="Really Long Metric Name"
        axisLabelComponent={<CustomAxisLabel />}
        style={{
          axisLabel: {
            padding: 50
          }
        }}
      />
      <VictoryAxis
        dependentAxis
        label="Second metric here"
        axisLabelComponent={<CustomAxisLabel rightAxis={true} />}
        orientation="right"
        style={{
          axisLabel: {
            padding: 50
          }
        }}
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
            />
          ))}
        </VictoryGroup>
      ]))}
    </VictoryChart>
  );
}
