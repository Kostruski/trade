
import React, { Component } from "react";


import Spx_vix from "./charts/spx_vix.js";
import AssetManagersLong_Mid from "./charts/assetManagersLong_Mid.js";
import MasterStrategyPerformance from "./charts/masterStrategyPerformance.js";
import GammaExtremeActivityofLargeSpeculators from "./charts/gammaExtremeActivityofLargeSpeculators.js"
import Gamma_Volatility from "./charts/gamma_Volatility.js"
import VIXvsMidTermAssetManagers from "./charts/vixVsMidTermAssetManagers.js"

export default class Section2 extends Component {
  render() {
    return this.props.data ? (
      <div className="sectionWrapper">
        <Spx_vix data={this.props.data} />
        <AssetManagersLong_Mid data={this.props.data} />
        <MasterStrategyPerformance data={this.props.data} />
        <GammaExtremeActivityofLargeSpeculators data={this.props.data} />
        <Gamma_Volatility data={this.props.data} />
        <VIXvsMidTermAssetManagers data={this.props.data} />
      </div>
    ) : null;
  }
}
