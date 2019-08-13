import React, { Component } from "react";
import Tools from "../tools.js";
import _ from "lodash";
import {
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryAxis,
  VictoryBar
} from "victory";

export default class BarChart extends Component {
  constructor(props) {
    const initZoom = props.data.values.filter(
      (el, i) => i > props.data.values.length * 0.9
    );
    super(props);
    this.state = {
      data: props.data.values,
      initZoom: initZoom,
      currZoom: initZoom,
      zoomValue: 0,
      zoomMinusActive: true,
      zoomPlusActive: true,
      panLeftActive: true,
      panRightActive: true
    };
  }

  zoomMinus = () => {
    if (!this.setState.zoomPlusActive) this.setState({ zoomPlusActive: true });
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    if (leftIndex === 0) {
      this.setState({ zoomMinusActive: false });
      return;
    }
    this.setState({ zoomValue: 1 }, () => {
      this.updateRange();
    });
  };

  zoomPlus = () => {
    if (!this.setState.zoomMinusActive)
      this.setState({ zoomMinusActive: true });
    if (this.state.currZoom.length < 30) {
      this.setState({ zoomPlusActive: false });
      return;
    }
    this.setState({ zoomValue: -1 }, () => {
      this.updateRange();
    });
  };

  resetChart = () => {
    if (this.state.currZoom !== this.state.initZoom)
      this.setState({
        currZoom: this.state.initZoom,
        zoomPlusActive: true,
        zoomMinusActive: true,
        panLeftActive: true,
        panRightActive: true
      });
  };

  panLeft = () => {
    if (!this.setState.panRightActive) this.setState({ panRightActive: true });
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
    const length = this.state.currZoom.length;
    if (leftIndex < 60 && length < 60) {
      this.setState({ panLeftActive: false });
      return;
    }
    const zoomed = this.state.data.filter(
      (el, i) =>
        i >= leftIndex - Math.round(length / 10) &&
        i <= rightIndex - Math.round(length / 10)
    );
    this.setState({ currZoom: zoomed });
  };

  panRight = () => {
    if (!this.setState.panLeftActive) this.setState({ panLeftActive: true });
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
    const length = this.state.currZoom.length;
    if (rightIndex > this.state.data.length - 2 && length < 60) {
      this.setState({ panRightActive: false });
      return;
    }
    const zoomed = this.state.data.filter(
      (el, i) =>
        i >= leftIndex + Math.round(length / 10) &&
        i <= rightIndex + Math.round(length / 10)
    );
    this.setState({ currZoom: zoomed });
  };

  updateRange = () => {
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
    let length = this.state.data.length;
    const zoomed = this.state.data.filter(
      (el, i) =>
        i >=
          leftIndex - (this.state.currZoom.length / 5) * this.state.zoomValue &&
        i <= rightIndex
    );
    this.setState({ currZoom: zoomed });
  };

  render() {
    return (
      <div className="chartBox">
        <div className="legend">
          <div className="colorBox">
            <span
              style={{
                backgroundColor: `${this.props.data.color}`
              }}
            />
            <div>{`${this.props.data.yValue}`}</div>
          </div>
          <Tools
            zoomPlus={this.zoomPlus}
            zoomMinus={this.zoomMinus}
            panLeft={this.panLeft}
            panRight={this.panRight}
            id={this.props.data.id}
            resetChart={this.resetChart}
            zoomMinusActive={this.state.zoomMinusActive}
            zoomPlusActive={this.state.zoomPlusActive}
            panLeftActive={this.state.panLeftActive}
            panRightActive={this.state.panRightActive}
          />
        </div>

        <VictoryChart>
          <VictoryAxis
            scale="time"
            orientation="bottom"
            // tickCount={14}
            fixLabelOverlap={true}
            offsetY={50}
            style={{
              tickLabels: { fontSize: 10, padding: 5 }
            }}
          />

          <VictoryAxis
            orientation="right"
            dependentAxis
            tickFormat={x => `${x.toFixed(2)}`}
            // tickCount={15}
            fixLabelOverlap={true}
            style={{
              tickLabels: { fontSize: 10, padding: 5 }
            }}
            crossAxis={false}
          />

          <VictoryBar
            data={this.state.currZoom}
            // labels={d => `${d.y.toFixed(2)} ${d.x} `}
            // labelComponent={
            //   <VictoryTooltip
            //     flyoutStyle={{ fill: "black" }}
            //     horizontal={true}
            //   />
            // }
            style={{
              data: {
                stroke: `${this.props.data.color}`,
                strokeWidth: 1
              },
              labels: { fontSize: 10 }
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}
