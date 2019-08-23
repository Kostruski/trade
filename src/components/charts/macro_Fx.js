import React, { Component } from 'react'
import Tools from "../tools.js";
import _ from "lodash";
import LegendItem from "../legendItem.js"
import { VictoryLine, VictoryBar, VictoryAxis, VictoryArea, VictoryChart } from "victory";
import {
  fontSizeSmall,
  paddingSmall,
  timeAsixOffsetSmall
} from "../../style/chartsStyle.js";



export default class Macro_Fx extends Component {
  
    constructor(props) {
        const propsKeys = Object.keys(_.last(props.data)).filter(el => el==="Date" || el.length===3)
        const data = props.data.map(el => _.pick(el, propsKeys))
        const initZoom = data.filter((el, i) => i > props.data.length * 0.9);  
        const currMax =  _.max(_.values(_.omit(props.data[0], ["Date"])))
        const currMin =  _.min(_.values(_.omit(props.data[0], ["Date"])))

        
        super(props) 
        this.state = {
            data:props.data,
            propsKeys: propsKeys,
            initZoom: initZoom,
            currZoom: initZoom,
            zoomValue: 0,
            zoomMinusActive: true,
            zoomPlusActive: true,
            panLeftActive: true,
            panRightActive: true
        }
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

    let currMax = 0
    let currMin = 0

    this.state.currZoom.forEach(el => {
        const max =  _.max(_.values(_.omit(el, ["Date"])));
        const min =  _.min(_.values(_.omit(el, ["Date"])));
        if(max>currMax) currMax = max;
        if(min<currMin) currMin = min;        
    });
  

     return (
       <div className="chartBox currenciesChart">
         <h4>Macro / Fx</h4>
         <Tools
           resetChart={this.resetChart}
           id="chartMacro_Fx"
           zoomPlus={this.zoomPlus}
           zoomMinus={this.zoomMinus}
           panLeft={this.panLeft}
           panRight={this.panRight}
           zoomMinusActive={this.state.zoomMinusActive}
           zoomPlusActive={this.state.zoomPlusActive}
           panLeftActive={this.state.panLeftActive}
           panRightActive={this.state.panRightActive}
           />
{/* 
            <div className="legendItems">
                 <LegendItem />
            </div> */}

         <VictoryChart>
             <VictoryAxis
               padding={paddingSmall}
               scale="time"
               standalone={false}
               tickValues={this.state.currZoom.map(el => el["Date"].slice(2, 10))}
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
               domain={[currMin * 1.1, currMax * 1.2]}
               dependentAxis
               tickFormat={x => `${x.toFixed(0)}`}
               fixLabelOverlap={true}
               style={{
                 tickLabels: { fontSizeSmall, padding: 5 }
               }}
               crossAxis={false}
             />

             

             {/* <VictoryLine
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
             /> */}
        </VictoryChart>
       </div>
     );
   }
}
