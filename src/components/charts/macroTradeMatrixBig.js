import React, { Component } from "react";
import Tools from "../tools.js";
import _ from "lodash";
import LegendItem from "../legendItem.js";
import CurrSingleChartBig from "./currSingleChartBig.js";
import {
  VictoryLine,
  VictoryBar,
  VictoryAxis,
  VictoryArea,
  VictoryChart
} from "victory";
import {
  fontSizeBig,
  padding,
  timeAsixOffsetSmall
} from "../../style/chartsStyle.js";

const updateDomain = zoomed => {
  let currMax = 0;
  let currMin = 0;
  zoomed.forEach(el => {
    const max = _.max(_.values(_.omit(el, ["Date"])));
    const min = _.min(_.values(_.omit(el, ["Date"])));
    if (max > currMax) currMax = max;
    if (min < currMin) currMin = min;
  });
  return [currMin, currMax];
};

export default class MacroTradeMatrixBig extends Component {
  constructor(props) {
    const propsKeys = Object.keys(_.last(props.data)).filter(
      el => el === "Date" || el.length === 4
    );
    const data = props.data.map(el => _.pick(el, propsKeys));
    const initZoom = data.filter((el, i) => i > props.data.length - 120);
    let currMax = 0;
    let currMin = 0;
    initZoom.forEach(el => {
      const max = _.max(_.values(_.omit(el, ["Date"])));
      const min = _.min(_.values(_.omit(el, ["Date"])));
      if (max > currMax) currMax = max;
      if (min < currMin) currMin = min;
    });

    super(props);
    this.state = {
      data: data,
      propsKeys: propsKeys,
      currMax: currMax,
      currMin: currMin,
      initZoom: initZoom,
      currZoom: initZoom,
      zoomValue: 0,
      zoomMinusActive: true,
      zoomPlusActive: true,
      panLeftActive: true,
      panRightActive: true,
      chartWidth: 450,
      chartHeight: 300
    };
  }

  changeChartDimmensions = () => {
    const tempWidth = window.innerWidth - 60;
    const tempHeight = window.innerHeight - 100;
    if (
      Math.abs(this.state.chartWidth - tempWidth) ||
      Math.abs(this.state.chartHeight - tempHeight) > 10
    )
      this.setState({ chartWidth: tempWidth, chartHeight: tempHeight });
  };

  componentWillMount() {
    this.changeChartDimmensions();
    window.addEventListener("resize", () => this.changeChartDimmensions());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.changeChartDimmensions());
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
        panRightActive: true,
        currMin: updateDomain(this.state.initZoom)[0],
        currMax: updateDomain(this.state.initZoom)[1]
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
    this.setState({
      ...this.state,
      currZoom: zoomed,
      currMin: updateDomain(zoomed)[0],
      currMax: updateDomain(zoomed)[1]
    });
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
    this.setState({
      ...this.state,
      currZoom: zoomed,
      currMin: updateDomain(zoomed)[0],
      currMax: updateDomain(zoomed)[1]
    });
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
    this.setState({
      ...this.state,
      currZoom: zoomed,
      currMin: updateDomain(zoomed)[0],
      currMax: updateDomain(zoomed)[1]
    });
  };

  render() {
    return (
      <div className="chartBoxBigWrapper">
        <div className="chartBox currenciesChart">
          <div className="legend">
            <Tools
              resetChart={this.resetChart}
              id="chartMacroTradeMatrix"
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
          <h4>Macro Trade Matrix</h4>
          <div className="chartContainer">
            <VictoryChart
              domain={{ y: [this.state.currMin, this.state.currMax] }}
              standalone={true}
              padding={padding}
              width={this.state.chartWidth}
              height={this.state.chartHeight}
            >
              <VictoryAxis
                padding={padding}
                standalone={false}
                scale="time"
                tickValues={this.state.currZoom.map(el =>
                  el["Date"].slice(2, 10)
                )}
                orientation="bottom"
                fixLabelOverlap={true}
                offsetY={timeAsixOffsetSmall}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 }
                }}
              />

              <VictoryAxis
                padding={padding}
                dependentAxis
                orientation="right"
                standalone={false}
                dependentAxis
                tickFormat={x => `${x.toFixed(0)}`}
                fixLabelOverlap={true}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 }
                }}
                crossAxis={false}
              />

              {this.state.propsKeys
                .filter(el => el !== "Date")
                .map((obj, i) => {
                  return (
                    <CurrSingleChartBig
                      key={i}
                      index={i}
                      name={obj}
                      data={this.state.currZoom}
                      max={this.state.currMax}
                      min={this.state.currMin}
                    />
                  );
                })}
            </VictoryChart>
            <div className="legendItems">
              {this.state.propsKeys
                .filter(el => el !== "Date")
                .map((obj, i) => {
                  return (
                    <LegendItem
                      key={i}
                      index={i}
                      name={obj}
                      width={this.state.chartWidth}
                      height={this.state.chartHeight}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
