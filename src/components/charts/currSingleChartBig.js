import React from 'react'
import {VictoryScatter, VictoryTooltip, VictoryLine } from "victory";
import {paddingSmall, tooltipFontSize, padding, currencyColors } from "../../style/chartsStyle.js";
import _ from "lodash";


export default function CurrSingleChartBig(props) {
    const data = props.data.map(el => _.pick(el, ["Date", props.name]))
    
    return (
       <>
         <VictoryLine
          padding={paddingSmall}  
          width={props.width}   
          height={props.height}   
          standalone={false}
          data={data}
          x={"Date"}
          y={props.name} 
          size={2}
          domain={{y:[props.min, props.max]}}               
          style={{
            data: {stroke: currencyColors[props.index] }
          }}
        /> 

        <VictoryScatter
          padding={padding}
          width={props.width}   
          height={props.height}  
          data={data}
          x={"Date"}
          y={props.name} 
          size={20}
          standalone={false}
          domain={{y:[props.min, props.max]}}
          scale={{ x: "time", y: "linear" }}
          labels={d => `${props.name}: ${d[props.name].toFixed(0)}, date: ${d["Date"].slice(2, 10)}`}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{ fill: "black" }}
              pointerLength={0}
            />
          }
          style={{
            data: {
              stroke: "rgba(255, 255, 255, 0)",
              fill: "rgba(255, 255, 255, 0)",
              strokeWidth: 0
            },
            labels: { tooltipFontSize }
          }}
        />
        </>
        
    )
}
