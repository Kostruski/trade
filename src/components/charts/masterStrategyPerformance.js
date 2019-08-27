import React, { Component } from "react";
import Tools from "../tools.js";
import _ from "lodash";
import { VictoryLine, VictoryBar, VictoryAxis, VictoryArea } from "victory";
import {
  fontSizeSmall,
  paddingSmall,
  timeAsixOffsetSmall
} from "../../style/chartsStyle.js";

export default class MasterStrategyPerformance extends Component {
  constructor(props) {
    const data = props.data.map(el => ({
      x: el["Date"].slice(2, 10),
      SPX: el["SPX"],
      masterEquity: el["Master Equity"]
    }));

    const initZoom = data.filter((el, i) => i > data.length * 0.9);

    super(props);
    this.state = {
      data: data,
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
    if (!this.state.zoomPlusActive) this.setState({ zoomPlusActive: true });
    if (this.state.currZoom.length === this.state.data.length) {
      this.setState({ zoomMinusActive: false });
      return;
    }
    this.setState({ zoomValue: 1 }, () => {
      this.updateRange();
    });
  };

  zoomPlus = () => {
    if (!this.state.zoomMinusActive) this.setState({ zoomMinusActive: true });
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
    if (!this.state.panRightActive) this.setState({ panRightActive: true });
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
    const length = this.state.currZoom.length;
    if (leftIndex === 0) {
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
    if (!this.state.panLeftActive) this.setState({ panLeftActive: true });
    const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
    const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
    const length = this.state.currZoom.length;
    if (rightIndex === this.state.data.length - 1) {
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
    let zoomed = [];

    if (this.state.currZoom.includes(_.last(this.state.data))) {
      zoomed = this.state.data.filter(
        (el, i) =>
          i >=
            leftIndex -
              (this.state.currZoom.length / 5) * this.state.zoomValue &&
          i <= rightIndex
      );
    } else if (this.state.currZoom.includes(_.head(this.state.data))) {
      zoomed = this.state.data.filter(
        (el, i) =>
          i >= leftIndex &&
          i <=
            rightIndex + (this.state.currZoom.length / 5) * this.state.zoomValue
      );
    } else {
      zoomed = this.state.data.filter(
        (el, i) =>
          i >=
            leftIndex -
              (this.state.currZoom.length / 10) * this.state.zoomValue &&
          i <=
            rightIndex +
              (this.state.currZoom.length / 10) * this.state.zoomValue
      );
    }

    this.setState({ currZoom: zoomed });
  };

  render() {
    const spxMax = _.maxBy(this.state.data, "SPX")["SPX"];
    const spxMin = _.minBy(this.state.data, "SPX")["SPX"];
    const masterMax = _.maxBy(this.state.data, "masterEquity")["masterEquity"];
    const masterMin = _.minBy(this.state.data, "masterEquity")["masterEquity"];

    return (
      <div className="chartBox">
        <h4>
          Master Strategy Performance (Max 5 units - no trades if VXX above
          average)
        </h4>
        <div className="legend">
          <div className="colorBox">
            <span
              style={{
                backgroundColor: "whitesmoke"
              }}
            />
            <div>SPX</div>
          </div>
          <div className="colorBox">
            <span
              style={{
                backgroundColor: "gold"
              }}
            />
            <div>Master Equity</div>
          </div>

          <Tools
            resetChart={this.resetChart}
            id="chartMasterStrategyPerformance"
            zoomPlus={this.zoomPlus}
            zoomMinus={this.zoomMinus}
            panLeft={this.panLeft}
            panRight={this.panRight}
            zoomMinusActive={this.state.zoomMinusActive}
            zoomPlusActive={this.state.zoomPlusActive}
            panLeftActive={this.state.panLeftActive}
            panRightActive={this.state.panRightActive}
          />
        </div>

        <svg viewBox="0 0 450 300">
          <g>
            <VictoryAxis
              padding={paddingSmall}
              scale="time"
              standalone={false}
              tickValues={this.state.currZoom.map(el => el["x"])}
              orientation="bottom"
              fixLabelOverlap={true}
              offsetY={timeAsixOffsetSmall}
              style={{
                tickLabels: { fontSizeSmall, padding: 5 }
              }}
            />

            <VictoryAxis
              padding={paddingSmall}
              dependentAxis
              orientation="right"
              standalone={false}
              domain={[masterMin * 1.2, masterMax * 1.2]}
              dependentAxis
              tickFormat={x => `${x.toFixed(0)}`}
              fixLabelOverlap={true}
              style={{
                tickLabels: { fontSizeSmall, padding: 5 }
              }}
              crossAxis={false}
            />

            <VictoryArea
              padding={paddingSmall}
              interpolation="linear"
              data={this.state.currZoom}
              x={"x"}
              y={"masterEquity"}
              standalone={false}
              domain={{
                y: [masterMin * 1.2, masterMax * 1.2]
              }}
              scale={{ x: "time", y: "linear" }}
              style={{
                data: {
                  stroke: `gold`,
                  fill: "rgba(255,249,74, 0.5)",
                  strokeWidth: 1
                }
              }}
            />

            <VictoryAxis
              padding={paddingSmall}
              dependentAxis
              orientation="left"
              standalone={false}
              domain={[spxMin, spxMax]}
              tickFormat={z => `${z.toFixed(0)}`}
              fixLabelOverlap={true}
              style={{
                tickLabels: { fontSizeSmall, padding: 5 },
                grid: { strokeWidth: 0 }
              }}
              crossAxis={false}
            />

            <VictoryLine
              padding={paddingSmall}
              data={this.state.currZoom}
              x={"x"}
              y={"SPX"}
              standalone={false}
              domain={{
                y: [spxMin, spxMax]
              }}
              style={{
                data: { stroke: "rgba(245,245,245 , 0.5 )", strokeWidth: 1 }
              }}
            />
          </g>
        </svg>
      </div>
    );
  }
}