
import React, { Component } from "react";
import Macro_Fx from "./charts/macro_Fx.js"
import MacroTradeMatrix from "./charts/macroTradeMatrix"
import DefaultFxPortfolio from "./charts/defaultFxPortfolio"
import MacroCycle from "./charts/macroCycle"


export default class Section3 extends Component {
  render() {
    return (
      <div className="sectionWrapper">
       <Macro_Fx data={this.props.data} />
       <MacroTradeMatrix data={this.props.data} />
       <DefaultFxPortfolio data={this.props.portfolio} />
       <MacroCycle data={this.props.data} />
      </div>
    );
  }
}
