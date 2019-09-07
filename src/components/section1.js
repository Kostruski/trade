import React, { Component } from "react";
import SpxVolreset from "./charts/spxVolreset";
import Loader from "./loader.js";
import SpxVolresetBig from "./charts/spxVolresetBig";
import _ from "lodash";
import { connect } from "react-redux";

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const realTime1 = "http://104.211.19.171/realtime1";

class Section1 extends Component {

  intervalRealTime1 = () => {
    let counter = 0;
    const x = setInterval(() => {
      fetch(realTime1)
        .then(response => response.json())
        .catch(error => alert("Conncetion error:", error))
        .then(json => {
          if (_.last(json).date !== _.last(this.props.realTime1).date)
            this.props.realTime1Update(json);
        });

      counter++;
      console.log(counter);
      if (counter === 5) clearInterval(x);
    }, 10000);
  };

  componentDidMount() {
   
    this.props.loadingUpdate(true)
    fetch(realTime1)
      .then(response => response.json())
      .catch(error => (alert("Conncetion error:", error), this.props.loadingUpdate(false)))
      .then(json => {
        this.props.loadingUpdate(false)

        if (
          this.props.realTime1.length === 0
        )
          this.props.realTime1Update(json);
      });
    this.intervalRealTime1();
  }

  componentWillUnmount() {
    clearInterval(this.intervalRealTime1);
  }

  render() {
    console.log(this.props.realTime1)
    return this.props.loading || this.props.realTime1.length===0 ?
     (
      <Loader />
    ) : (
      <div className="sectionWrapper">
        <SpxVolreset data={this.props.realTime1} />
      </div>
    );
  }
}

const mapStateToProps = (state) => 
 { return {
   realTime1: state.realTime1,
   loading: state.loading
 }
}

const mapDispatchToProps = (dispatch) => {

  return {
    realTime1Update: (value) => dispatch({type: 'REALTIME1', value: value}),
    loadingUpdate: (value) => dispatch({type: "LOADING", value: value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section1)
