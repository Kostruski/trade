import React, { Component } from 'react';
import _ from 'lodash';
import {

  VictoryChart,
  VictoryLine,
  createContainer,
  VictoryTooltip,
  VictoryAxis,
} from "victory";



export default class Chart extends Component {

 constructor(props) {
   super();
   this.entireDomain = this.getEntireDomain(props);
   this.state = {
     zoomedXDomain:   this.entireDomain.x,
     data: props.data.values

   };
 }



 onDomainChange(domain) {
   this.setState({
     zoomedXDomain: domain.x,
   });
 }

 preventScroll = () => {
   document.querySelector('body').style.overflow = "hidden";
  }

 enableScroll = () => {
   document.querySelector('body').style.overflow = "scroll";
 }

 getData(dataArr) {
   const maxPoints = 150;
   const { zoomedXDomain } = this.state;
   const  data  = dataArr;
   const filtered = data.filter(
     (d) => (d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]));

     if (filtered.length > maxPoints ) {
       const k = Math.ceil(filtered.length / maxPoints);
       return filtered.filter(
         (d, i) => ((i % k) === 0)
       );
     }
     return filtered;
 }

 getEntireDomain(props) {
  
  const  data  = props.data.values;

   const temp = {
     y: [(_.minBy(data, d => d.y).y)*0.9, (_.maxBy(data, d => d.y).y)*1.1],
     x: [ data[0].x, _.last(data).x ]
   };

   return temp
 }







 render()    

 
 {


     const data = this.props.data.values; 
     const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
     return (
      
         <div className="chartBox" 
        //  onMouseOut={() => this.enableScroll()}
        //  onMouseOver={() => this.preventScroll()}
         >
           <div className="legend">
             <div className="colorBox">
               <span
                 style={{
                   backgroundColor: `${this.props.data.color}`
                 }}
               />
               <div>{`${this.props.data.yValue}`}</div>
             </div>             

           </div>

           <VictoryChart
            domain={this.entireDomain}
             containerComponent={
               <VictoryZoomVoronoiContainer
                 zoomDimension="x"
                 minimumZoom={{ x: 30 }}
                //  zoomDomain={{ x: [this.entireDomain.x[1] - 100, this.entireDomain.x[1]]  }}
                 onZoomDomainChange={this.onDomainChange.bind(this)}                    
               />
             }
           >
             <VictoryAxis
               scale="time"
               orientation="bottom"
               tickCount={10}
               offsetY={50}
               style={{
                 tickLabels: { fontSize: 7, padding: 5 }
               }}
             />

             <VictoryAxis            
               orientation="right"
               dependentAxis
               tickFormat={x => `${(x).toFixed(2)}`}
               tickCount={10}
               style={{
                 tickLabels: { fontSize: 7, padding: 5 }
               }}
               crossAxis={false}
             />


             <VictoryLine                
               data={ this.getData(data) }
               labels={d =>
                 `${this.props.data.yValue} : ${(d.y).toFixed(2)}, date: ${d.x}`
               }
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
                 labels: { fontSize: 7 }
               }}
             />







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