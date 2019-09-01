import React, { Component } from "react";
import Tools from "../tools.js";
import _ from "lodash";
import {
  VictoryLine,
  VictoryBar,
  VictoryAxis,
  VictoryScatter,
  VictoryTooltip
} from "victory";
import {
  fontSizeBig,
  paddingSmall,
  timeAsixOffsetSmall,
  tooltipFontSize
} from "../../style/chartsStyle.js";

const realTime1 = "http://104.211.19.171/serverout/realtime1";

export default class SpxVolresetBig extends Component {
  // constructor(props) {
  //   const data = props.data.map(el => ({
  //     x: el["Date"].slice(11, 19),
  //     SPX: el["SPX"],
  //     Volreset: el["Volreset"]
  //   }));

  //   const initZoom = data.filter((el, i) => i > data.length - 120);

  //   super(props);
  //   this.state = {
  //     data: data,
  //     initZoom: initZoom,
  //     currZoom: initZoom,
  //     zoomValue: 0,
  //     zoomMinusActive: true,
  //     zoomPlusActive: true,
  //     panLeftActive: true,
  //     panRightActive: true,
  //     chartWidth: 450,
  //     chartHeight: 300
  //   };
  // }

  state = {
      data: null,
      initZoom: null,
      currZoom: null,
      zoomValue: 0,
      zoomMinusActive: true,
      zoomPlusActive: true,
      panLeftActive: true,
      panRightActive: true,
      chartWidth: 450,
      chartHeight: 300
    };

 interval = () => {
   let counter = 0;

   const x = setInterval(() => {
     fetch(realTime1)
       .then(response => response.json())
       .then(json => {
         const initZoom = json.filter((el, i) => i > json.length - 120)
         this.setState({ data: json, initZoom: initZoom, currZoom: initZoom }, () => console.log("zapytanie"));
       });
     counter++;
     if (counter === 100) clearInterval(x);
   }, 1000);
 };

 componentDidMount() {

  fetch(realTime1)
  .then(response => response.json())
  .then(json => {
    const initZoom = json.filter((el, i) => i > json.length - 120)

    const data = json.map(el => ({
        x: el["Date"].slice(11, 19),
        SPX: el["SPY"],
        Volreset: el["Volreset"]
      }));
    



    this.setState({ ...this.state, currZoom: initZoom, data: data, initZoom: initZoom }, () => console.log("zapytanie Big"));
  });

   this.interval();
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
    clearInterval(this.interval);
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

    let spxMax = 0
    let spxMin = 0
    let volresetMax = 0
    let volresetMin = 0
    let paddingTop = 0
    let paddingBottom = 0  

     console.log(this.state.currZoom)
   
    if(this.state.currZoom) {
      spxMax = _.maxBy(this.state.currZoom, "SPY")["SPY"];
      spxMin = _.minBy(this.state.currZoom, "SPY")["SPY"];
      volresetMax = _.maxBy(this.state.currZoom, "Volreset")["Volreset"];
      volresetMin = _.minBy(this.state.currZoom, "Volreset")["Volreset"];
      paddingTop = this.state.chartHeight / 2 + 5;
      paddingBottom = (-1 * this.state.chartHeight) / 2 + 30;

    }

  

    return (
      <div className="chartBoxBigWrapper">
        { this.state.data &&
        <div className="chartBox">
          <h4>SPX Volreset</h4>
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
                  backgroundColor: "red"
                }}
              />
              <div>Volreset</div>
            </div>

            <Tools
              resetChart={this.resetChart}
              id="chartSpxVolrest"
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

          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${this.state.chartWidth} ${this.state.chartHeight}`}
          >
            <g>
              <VictoryAxis
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                padding={paddingSmall}
                scale="time"
                standalone={false}
                tickValues={this.state.currZoom.map(el => el["x"])}
                orientation="bottom"
                fixLabelOverlap={true}
                // offsetY={timeAsixOffsetSmall}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 }
                }}
              />

              <VictoryAxis
                padding={{
                  top: paddingTop,
                  left: 40,
                  right: 40,
                  bottom: paddingBottom
                }}
                width={this.state.chartWidth}
                height={this.state.chartHeight / 2}
                dependentAxis
                orientation="left"
                standalone={false}
                domain={[volresetMin, volresetMax]}
                tickFormat={z => `${z.toFixed(0)}`}
                fixLabelOverlap={true}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 },
                  grid: { strokeWidth: 1 }
                }}
                crossAxis={false}
              />
              <VictoryLine
                padding={{
                  top: paddingTop,
                  left: 40,
                  right: 40,
                  bottom: paddingBottom
                }}
                data={this.state.currZoom}
                width={this.state.chartWidth}
                height={this.state.chartHeight / 2}
                x={"x"}
                y={"Volreset"}
                standalone={false}
                domain={{
                  y: [volresetMin, volresetMax]
                }}
                style={{
                  data: { stroke: "red", strokeWidth: 3 }
                }}
              />
              <VictoryScatter
                padding={{
                  top: paddingTop,
                  left: 40,
                  right: 40,
                  bottom: paddingBottom
                }}
                data={this.state.currZoom}
                width={this.state.chartWidth}
                height={this.state.chartHeight / 2}
                x={"x"}
                y={"Volreset"}
                standalone={false}
                domain={{
                  y: [volresetMin, volresetMax]
                }}
                size={20}
                labels={d =>
                  `Volreset: ${d["Volreset"].toFixed(0)}, date: ${d.x}`
                }
                style={{
                  data: {
                    stroke: "rgba(255, 255, 255, 0)",
                    fill: "rgba(255, 255, 255, 0)",
                    strokeWidth: 0
                  },
                  labels: { fontSize: tooltipFontSize }
                }}
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{ fill: "black" }}
                    pointerLength={0}
                  />
                }
              />

              <VictoryAxis
                padding={paddingSmall}
                width={this.state.chartWidth}
                height={this.state.chartHeight / 2}
                dependentAxis
                orientation="left"
                standalone={false}
                domain={[spxMin, spxMax]}
                tickFormat={z => `${z.toFixed(0)}`}
                fixLabelOverlap={true}
                style={{
                  tickLabels: { fontSize: fontSizeBig, padding: 5 },
                  grid: { strokeWidth: 1 }
                }}
                crossAxis={false}
              />
              <VictoryLine
                padding={paddingSmall}
                data={this.state.currZoom}
                width={this.state.chartWidth}
                height={this.state.chartHeight / 2}
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
                padding={paddingSmall}
                data={this.state.currZoom}
                width={this.state.chartWidth}
                height={this.state.chartHeight / 2}
                x={"x"}
                y={"SPX"}
                size={20}
                standalone={false}
                domain={{
                  y: [spxMin, spxMax]
                }}
                labels={d => `SPX: ${d["SPX"].toFixed(0)}, date: ${d.x}`}
                style={{
                  data: {
                    stroke: "rgba(255, 255, 255, 0)",
                    fill: "rgba(255, 255, 255, 0)",
                    strokeWidth: 0
                  },
                  labels: { fontSize: tooltipFontSize }
                }}
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{ fill: "black" }}
                    pointerLength={0}
                  />
                }
              />
            </g>
          </svg>
        </div>


        }
       
      </div>
    );
  }
}
