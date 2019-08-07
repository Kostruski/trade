import React, { Component } from 'react';
import Tools from "../tools.js"
import _ from 'lodash';
import {

  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryAxis,
} from "victory";



export default class ChartBig extends Component {
  
   constructor(props) {
    const initZoom = props.data.values.filter((el, i) => i > props.data.values.length * 0.9);
      super(props) 
        this.state = {
          data: props.data.values, 
          initZoom: initZoom,
          currZoom: initZoom,
          zoomValue: 0
        }
      }

      zoomMinus = () => {
        const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));

        if (leftIndex === 0) return;
        this.setState({ zoomValue: 1 }, () => {
          this.updateRange();
        });
      };

      zoomPlus = () => {
        if (this.state.currZoom.length < 30) return;
        this.setState({ zoomValue: -1 }, () => {
          this.updateRange();
        });
      };

      panLeft = () => {
        const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
        const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
        const length = this.state.currZoom.length;
        if (leftIndex < 60 && length < 60) return;
        const zoomed = this.state.data.filter(
          (el, i) => i >= leftIndex - Math.round(length / 10) && i <= rightIndex - Math.round(length / 10)
        );
        this.setState({ currZoom: zoomed }, () =>
          console.log(
            "left",
            this.state.data.indexOf(_.head(this.state.currZoom)),
            this.state.data.indexOf(_.last(this.state.currZoom)),
            this.state.currZoom.length
          )
        );
      };

      panRight = () => {
        const leftIndex = this.state.data.indexOf(_.head(this.state.currZoom));
        const rightIndex = this.state.data.indexOf(_.last(this.state.currZoom));
        const length = this.state.currZoom.length;
        if (rightIndex > this.state.data.length - 2 && length < 60) return;
        const zoomed = this.state.data.filter(
          (el, i) => i >= leftIndex + Math.round(length / 10) && i <= rightIndex + Math.round(length / 10)
        );
        this.setState({ currZoom: zoomed }, () =>
          console.log(
            "right",
            this.state.data.indexOf(_.head(this.state.currZoom)),
            this.state.data.indexOf(_.last(this.state.currZoom)),
            this.state.currZoom.length
          )
        );
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
        this.setState({ currZoom: zoomed }, () =>
          console.log(
            this.state.zoomValue,
            this.state.data.indexOf(_.head(this.state.currZoom)),
            this.state.data.indexOf(_.last(this.state.currZoom)),
            this.state.currZoom.length
          )
        );
      };
    
   

    render() {

     
  

      
        return (
          <div className="chartBoxBigWrapper">
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
                <Tools zoomPlus={this.zoomPlus} zoomMinus={this.zoomMinus} panLeft={this.panLeft} panRight={this.panRight}/>
              </div>

              <VictoryChart
              
              containerComponent= {
                <VictoryVoronoiContainer
                              />
              }
               >
             
                <VictoryAxis
                  scale="time"
                  orientation="bottom"
                  tickCount={14}
                  offsetY={50}
                  style={{
                    tickLabels: { fontSize: 10, padding: 20, angle: 60 }
                  }}
                />

                <VictoryAxis            
                  orientation="right"
                  dependentAxis
                  tickFormat={x => `${(x).toFixed(2)}`}
                  tickCount={15}
                  style={{
                    tickLabels: { fontSize: 10, padding: 5 }
                  }}
                  crossAxis={false}
                />


                <VictoryLine                
                  data={ this.state.currZoom }
                  labels={(d) => ` SPX ${d.y} ${d.x} `}
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{ fill: "black", fillOpacity: 0.4 }}
                    />
                  }
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
          
          </div>
        );
    }
}
