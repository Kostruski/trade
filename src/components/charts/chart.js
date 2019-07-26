import React, { Component } from "react";


import {
 
  VictoryChart,
  VictoryLine,
  createContainer,
  VictoryTooltip,
  VictoryAxis,
} from "victory";

const xOffsets = [50, 200, 350];
const tickPadding = [ 0, 0, -15 ];
const anchors = ["end", "end", "start"];
const colors = ["black", "red", "blue"];
const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");


export default class Chart extends Component {
  

  

  render()   
  {
    const data = this.props.data.values
  
      return (
       <div className="chartBox">
         <div className="legend">
        <div className="colorBox"><span style={{backgroundColor: `${this.props.data.color}`}}></span><div>{`${this.props.data.labelText}`}</div></div>
         </div>

         <VictoryChart
         
         domain={{x: [this.props.data.domain.x[0], this.props.data.domain.x[1]], y: [this.props.data.domain.y[0], this.props.data.domain.y[1]]}}
           containerComponent={
             <VictoryZoomVoronoiContainer 
             zoomDimension="x"
             minimumZoom={{x: 1, y: 0.01}}           
              />
           }>           
            
         </VictoryChart>
       </div>
      );
      
    
  }
}



























/*<VictoryChart

domain={{x: [this.props.data.domain.x[0], this.props.data.domain.x[1]], y: [this.props.data.domain.y[0], this.props.data.domain.y[1]]}}
  containerComponent={
    <VictoryZoomVoronoiContainer 
    zoomDimension="x"
    minimumZoom={{x: 1, y: 0.01}}           
     />
  }>           
    <VictoryAxis
      orientation="bottom"
      scale="time"
      tickValues={[" I 2019", "II 2019", "III 2019", "IV 2019"]}
      tickCount={4}
    />
    <VictoryAxis
      orientation="right"
      dependentAxis
    />
    <VictoryAxis
      orientation="left"
      dependentAxis
    />

 <VictoryLine 
  data={this.props.data.values}
  labels={(d) => `open: ${d.y}`}
  labelComponent={<VictoryTooltip   flyoutStyle={{ fill: "black", fillOpacity: 0.4  }}/>}
  style={{data: {stroke: `${this.props.data.color}`, strokeWidth: 3} }}    
  />
</VictoryChart> */ 