import React, { Component } from "react";
import Tools from "../tools.js";
import _ from "lodash";
import {padding, fontSizeBig, tooltipFontSize} from "../../style/chartsStyle.js"
import {
  VictoryLine,
  VictoryTooltip,
  VictoryAxis,
  VictoryArea,
  VictoryScatter,
  VictoryBar,
} from "victory";



export default class GammaExtremeActivityofLargeSpeculatorsBig extends Component {
  constructor(props) {
    const data = props.data.map(el => ({
      x: el["Date"].slice(2, 10),
      SPX: el["SPX"],
      gamma: el["Gamma"],
      SPXsignal: el["SPX Signal"]
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
   if (this.state.currZoom.length===this.state.data.length) {
     this.setState({ zoomMinusActive: false });
     return;
   }
   this.setState({ zoomValue: 1 }, () => {
     this.updateRange();
   });
 };

 zoomPlus = () => {
   if (!this.state.zoomMinusActive)
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
   if (!this.state.panRightActive) this.setState({ panRightActive: true });
   const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
   const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
   const length = this.state.currZoom.length;
   if (leftIndex === 0 ) {
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
   if (rightIndex === this.state.data.length - 1 ) {
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
   let zoomed = []

   if(this.state.currZoom.includes(_.last(this.state.data))) {
      zoomed = this.state.data.filter(
       (el, i) =>
         i >=
           leftIndex - (this.state.currZoom.length / 5) * this.state.zoomValue &&
         i <= rightIndex
     );
   }
   else if (this.state.currZoom.includes(_.head(this.state.data))) {
     zoomed = this.state.data.filter(
       (el, i) =>
         i >=
           leftIndex  &&
         i <= rightIndex + (this.state.currZoom.length / 5) * this.state.zoomValue
     );
   }

   else {
     zoomed = this.state.data.filter(
       (el, i) =>
         i >=
           leftIndex - (this.state.currZoom.length / 10) * this.state.zoomValue  &&
         i <= rightIndex + (this.state.currZoom.length / 10) * this.state.zoomValue
     );

   }

   this.setState({ currZoom: zoomed });
 };

  render() {
   const spxMax = _.maxBy(this.state.data, "SPX")["SPX"];
   const spxMin = _.minBy(this.state.data, "SPX")["SPX"];
   const gammaMax = _.maxBy(this.state.data, "gamma")["gamma"];
   const gammaMin = _.minBy(this.state.data, "gamma")["gamma"];
   const SPXsignalMax = _.maxBy(this.state.data, "SPXsignal")["SPXsignal"];
   const SPXsignalMin = _.minBy(this.state.data, "SPXsignal")["SPXsignal"]; 

    return (
      <div className="chartBoxBigWrapper">
        <div className="chartBox">
        <Tools
              resetChart={this.resetChart}
              id="chartGammaExtremeActivityofLargeSpeculators"
              zoomPlus={this.zoomPlus}
              zoomMinus={this.zoomMinus}
              panLeft={this.panLeft}
              panRight={this.panRight}
              zoomMinusActive={this.state.zoomMinusActive}
              zoomPlusActive={this.state.zoomPlusActive}
              panLeftActive={this.state.panLeftActive}
              panRightActive={this.state.panRightActive}
            />
         
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
                  backgroundColor: "pink"
                }}
              />
              <div>Gamma</div>
            </div>
            <div className="colorBox">
              <span
                style={{
                  backgroundColor: "cyan"
                }}
              />
              <div>SPX Signal</div>
            </div>
            <h4>Gamma - Extreme Activity of Large Speculators</h4>           
          </div>

          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${this.state.chartWidth} ${this.state.chartHeight}`}
          >
            <g>
              <VictoryAxis
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                scale="time"
                standalone={false}
                tickValues={this.state.currZoom.map(el => el["x"])}
                orientation="bottom"
                fixLabelOverlap={true}
                offsetY={50}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 }
                }}
              />

              <VictoryAxis
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                dependentAxis
                orientation="left"
                standalone={false}
                domain={[Math.min(gammaMin, SPXsignalMin) , Math.max(gammaMax, SPXsignalMax)]}
                dependentAxis
                tickFormat={x => `${x.toFixed(0)}`}
                fixLabelOverlap={true}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 }
                }}
                crossAxis={false}
              />

              <VictoryBar
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                data={this.state.currZoom}
                interpolation="step"
                x={"x"}
                y={"gamma"}
                standalone={false}
                domain={{
                  y: [gammaMin*1.1 , gammaMax*1.1 ]
                }}
                scale={{ x: "time", y: "linear" }}
                style={{
                  data: {
                    stroke: `pink`,
                    fill: "rgba(255,139,127,0.4)",
                    strokeWidth: 3
                  }
                }}
              />

              <VictoryArea
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                interpolation="step"
                data={this.state.currZoom}
                x={"x"}
                y={"SPXsignal"}
                standalone={false}
               domain={{
                 y: [gammaMin*1.1 , gammaMax*1.1 ]
               }}
                scale={{ x: "time", y: "linear" }}
                style={{
                  data: {
                   stroke: `cyan`,
                   fill: "rgb(124,251,255, 0.4)",
                    strokeWidth: 3
                  }
                }}
              />

              <VictoryAxis
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                dependentAxis
                orientation="right"
                standalone={false}
                domain={[spxMin, spxMax]}
                tickFormat={z => `${z.toFixed(0)}`}
                fixLabelOverlap={true}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 },
                  grid: { strokeWidth: 0 }
                }}
                crossAxis={false}
              />

              <VictoryLine
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                data={this.state.currZoom}
                x={"x"}
                y={"SPX"}
                standalone={false}
                domain={{
                  y: [spxMin, spxMax]
                }}
                style={{
                  data: { stroke: "whitesmoke", strokeWidth: 3 }
                }}
              />

              <VictoryScatter
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                data={this.state.currZoom}
                x={"x"}
                y={"SPX"}
                size={20}
                standalone={false}
                domain={{
                  y: [spxMin, spxMax]
                }}
                scale={{ x: "time", y: "linear" }}
                labels={d => `SPX: ${d["SPX"].toFixed(0)}, date: ${d.x}`}
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{ fill: "black" }}
                    orientation={"bottom"
                    }
                    pointerWidth={0}
                  />
                }
                style={{
                  data: {
                    stroke: "rgba(255, 255, 255, 0)",
                    fill: "rgba(255, 255, 255, 0)",
                    strokeWidth: 0
                  },
                  labels: { fontSize: tooltipFontSize }
                }}
              />

              <VictoryScatter
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                data={this.state.currZoom}
                x={"x"}
                y={"gamma"}
                size={20}
                standalone={false}
               domain={{
                 y: [gammaMin*1.1 , gammaMax*1.1 ]
               }}
                scale={{ x: "time", y: "linear" }}
                labels={d => `GAMMA: ${d["gamma"].toFixed(0)}, date: ${d.x}`}
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{ fill: "black" }}
                    orientation={d => (d["gamma"] > 0 ? "bottom" : "top")}
                    pointerWidth={0}
                  />
                }
                style={{
                  data: {
                    stroke: "rgba(255, 255, 255, 0)",
                    fill: "rgba(255, 255, 255, 0)",
                    strokeWidth: 0
                  },
                  labels: { fontSize: tooltipFontSize }
                }}
              />

              <VictoryScatter
                padding={padding}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                data={this.state.currZoom}
                x={"x"}
                y={"SPXsignal"}
                size={20}
                standalone={false}
                domain={{
                    y: [gammaMin*1.1 , gammaMax*1.1 ]
                  }}
                scale={{ x: "time", y: "linear" }}
                labels={d => `SPX Signal: ${d["SPXsignal"].toFixed(0)}, date: ${d.x}`}
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{ fill: "black" }}
                    orientation={d => (d["SPXsignal"] > 0 ? "bottom" : "top")}
                    pointerWidth={0}
                  />
                }
                style={{
                  data: {
                    stroke: "rgba(255, 255, 255, 0)",
                    fill: "rgba(255, 255, 255, 0)",
                    strokeWidth: 0
                  },
                  labels: { fontSize: tooltipFontSize }
                }}
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }
}
