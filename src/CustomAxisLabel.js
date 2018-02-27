import React from 'react';
import { VictoryLabel, Line } from 'victory';

export default class CustomAxisLabel extends VictoryLabel {
  constructor(...args) {
    super(...args);
  }

  renderElements(props) {
    const textProps = {
      dx: this.dx, dy: this.dy, x: this.x, y: this.y,
      transform: this.transform, className: props.className
    };
    return (
      <g>
        <text {...textProps}
          {...props.events}
        >
          {this.props.title && <title>{this.props.title}</title>}
          {this.props.desc && <desc>{this.props.desc}</desc>}
          {this.content.map((line, i) => {
            const style = this.style[i] || this.style[0];
            const lastStyle = this.style[i - 1] || this.style[0];
            const fontSize = (style.fontSize + lastStyle.fontSize) / 2;
            // const lineHeight = this.checkLineHeight(
            //   this.lineHeight,
            //   ((this.lineHeight[i] + (this.lineHeight[i - 1] || this.lineHeight[0])) / 2),
            //   1
            // );
            const lineHeight = 1;
            const textAnchor = style.textAnchor || this.textAnchor;
            const dy = i && !props.inline ? (lineHeight * fontSize) : undefined;
            const x = !props.inline ? props.x : undefined;
            return (
              <tspan key={i} x={x} dy={dy} dx={this.dx} style={style} textAnchor={textAnchor}>
                {line}
              </tspan>
            );
          })}
        </text>
        <Line
          x1={14}
          x2={14}
          y1={0 + 10} // calculated from paddings on VictoryChart
          y2={500 - 50} // calcuated from paddings on VictoryChart
          style={{
            stroke: "rgba(0, 0, 0, .1)",
            strokeWidth: 2
          }} />
      </g>
    );
  }
}