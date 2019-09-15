import React, { Component } from "react";
import SpxVolreset from "./charts/spxVolreset";
import Loader from "./loader.js";

import _ from "lodash";
import { connect } from "react-redux";



import Spx_vix from "./charts/spx_vix.js";
import AssetManagersLong_Mid from "./charts/assetManagersLong_Mid.js";
import MasterStrategyPerformance from "./charts/masterStrategyPerformance.js";
import GammaExtremeActivityofLargeSpeculators from "./charts/gammaExtremeActivityofLargeSpeculators.js"
import Gamma_Volatility from "./charts/gamma_Volatility.js"
import VIXvsMidTermAssetManagers from "./charts/vixVsMidTermAssetManagers.js"

const spxvixURL = "http://104.211.19.171/serverout/spxvix";

class Section2 extends Component {

  intervalFetchData = () => {

  setInterval(() => {

    fetch(spxvixURL)
      .then(response => response.json())
      .catch(error => alert('Connection error:', error))
      .then(json => {
       if(_.last(json).date !== _.last(this.props.spxvix).date)                     
       this.props.spxvixUpdate(json)
      });


  }, 10800000) // 3 godziny

  }

  



 componentDidMount() {

  fetch(spxvixURL)
  .then(response => response.json())
  .catch(error => alert('Conncetion error:', error))
  .then(json => {
   if(_.last(json).date !== _.last(this.props.spxvix).date)                     
   this.props.spxvixUpdate(json)
  });  

  this.intervalFetchData()


 };


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

const mapStateToProps = (state) => 
 { return {
   spxvix: state.spxvix,
   loading: state.loading
 }
}

const mapDispatchToProps = (dispatch) => {

  return {
    spxvixUpdate: (value) => dispatch({type: 'SPXVIX', value: value}),
    loadingUpdate: (value) => dispatch({type: "LOADING", value: value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section2)
