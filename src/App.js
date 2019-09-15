import React, { Component } from "react";
import "./App.scss";
import Header from "./components/header";
import Section1 from "./components/section1.js";
import Section2 from "./components/section2.js";
import Section3 from "./components/section3.js";
import Section4 from "./components/section4.js";
import LoginPage from "./components/loginPage.js";
import Contact from "./components/contact.js";
import Spx_vixBig from "./components/charts/spx_vixBig.js";
import AssetManagersLong_MidBig from "./components/charts/assetManagersLong_MidBig.js";
import MasterStrategyPerformanceBig from "./components/charts/masterStrategyPerformanceBig.js";
import GammaExtremeActivityofLargeSpeculatorsBig from "./components/charts/gammaExtremeActivityofLargeSpeculatorsBig.js";
import Gamma_VolatilityBig from "./components/charts/gamma_VolatilityBig.js";
import VIXvsMidTermAssetManagersBig from "./components/charts/vixVsMidTermAssetManagersBig.js";
import Macro_FxBig from "./components/charts/macro_FxBig.js";
import SpxVolresetBig from "./components/charts/spxVolresetBig";
import MacroTradeMatrixBig from "./components/charts/macroTradeMatrixBig"
import DefaultFxPortfolioBig from "./components/charts/defaultFxPortfolioBig"
import MacroCyclesBig from "./components/charts/macroCycleBig"
import Loader from "./components/loader.js";
import FetchData from "./components/fetchData"
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const macrofixURL = "http://104.211.19.171/serverout/macrofx";
const spxvixURL = "http://104.211.19.171/serverout/spxvix";
const realTime1 = "http://104.211.19.171/serverout/realtime1";
const portfolio =    "http://104.211.19.171/serverout/portfoliofx";  


export default class App extends Component {
  // state = {
  //   isLoggedIn: true,
  //   isNewUser: false,
  //   spxvix: null,
  //   macrofix: null,
  //   realTime1: null,
  //   protfolio: null
  // };

  // interval = () => {
  //   let counter = 0;
  //   const x = setInterval(() => {
  //     fetch(realTime1)
  //       .then(response => response.json())
  //       .then(json => {
  //         this.setState({ realTime1: json });
  //       });
  //     console.log(counter)
  //     counter++;
  //     if (counter === 10) clearInterval(x);

  //   }, 1000);
  // };

  // componentDidMount() {
  //   fetch(spxvixURL)
  //     .then(response => response.json())
  //     .then(json => {
  //       this.setState({ ...this.state, spxvix: json });
  //     });

  //   fetch(macrofixURL)
  //     .then(response => response.json())
  //     .then(json => {
  //       this.setState({ ...this.state, macrofix: json });
  //     });


  //     fetch(portfolio)
  //     .then(response => response.json())
  //     .then(json => {
  //       this.setState({...this.state, portfolio: json });
  //     });

    //   fetch(realTime1)
    //   .then(response => response.json())
    //   .then(json => {
    //     this.setState({...this.state, realTime1: json });
    //   });

    

    // this.interval();
  

  // componentWillUnmount() {
  //   clearInterval(this.interval)
  // }

  // changeNewUser = () => this.setState({ isNewUser: false });

  // signUp = () => this.setState({ isNewUser: true });

  // toggleLogin = () => {
  //   this.setState(prev => ({ isLoggedIn: !prev.isLoggedIn }));
  // };

  render() {
    
    // const ProtectedRoute = ({ isAllowed, ...props }) =>
    //   isAllowed ? <Route {...props} /> : <Redirect to="/" />;

    return (
     



      <div className="appWrapper">
        <div className="sideAndMain">
          <div className="main">
            <Header   
            />
            <Router>
              <>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Section1 />
                    )}
                  />
                  <Route exact path="/contact" render={() => <Contact />} />
                  <Route
                
                    path="/section1"
                    render={() =>( <Section1 /> ) }
                  />

                  <Route              
                   exact path="/section2"
                    render={() => <Section2 />
                      }
                  />

                   {/*

                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path="/section3"
                    render={() =>
                      this.state.macrofix && this.state.portfolio ? (
                        <Section3
                          data={this.state.macrofix}
                          portfolio={this.state.portfolio}
                        />
                      ) : (
                        <Loader />
                      )
                    }
                  />

                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path="/section4"
                    render={() => (
                      <Section4
                        data={this.state}
                   
                      />
                    )}
                  />

                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={"/chartSpx_Vix"}
                    render={() =>
                      this.state.spxvix ? (
                        <Spx_vixBig data={this.state.spxvix} />
                      ) : (
                        <Loader />
                      )
                    }
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/chartasSetManagersLong_Mid`}
                    render={() =>
                      this.state.spxvix ? (
                        <AssetManagersLong_MidBig data={this.state.spxvix} />
                      ) : (
                        <Loader />
                      )
                    }
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/chartMasterStrategyPerformance`}
                    render={() =>
                      this.state.spxvix ? (
                        <MasterStrategyPerformanceBig
                          data={this.state.spxvix}
                        />
                      ) : (
                        <Loader />
                      )
                    }
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/chartGammaExtremeActivityofLargeSpeculators`}
                    render={() =>
                      this.state.spxvix ? (
                        <GammaExtremeActivityofLargeSpeculatorsBig
                          data={this.state.spxvix}
                        />
                      ) : (
                        <Loader />
                      )
                    }
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/chartGamma_Volatility`}
                    render={() =>
                      this.state.spxvix ? (
                        <Gamma_VolatilityBig data={this.state.spxvix} />
                      ) : (
                        <Loader />
                      )
                    }
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/chartVIXvsMidTermAssetManagers`}
                    render={() =>
                      this.state.spxvix ? (
                        <VIXvsMidTermAssetManagersBig
                          data={this.state.spxvix}
                        />
                      ) : (
                        <Loader />
                      )
                    }
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/chartMacro_Fx`}
                    render={() =>
                      this.state.macrofix ? (
                        <Macro_FxBig data={this.state.macrofix} />
                      ) : (
                        <Loader />
                      )
                    }
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/chartMacroTradeMatrix`}
                    render={() =>
                      this.state.macrofix ? (
                        <MacroTradeMatrixBig data={this.state.macrofix} />
                      ) : (
                        <Loader />
                      )
                    }
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/chartMacroCycle`}
                    render={() =>
                      this.state.macrofix ? (
                        <MacroCyclesBig data={this.state.macrofix} />
                      ) : (
                        <Loader />
                      )
                    }
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/chartSpxVolrest`}
                    render={() => (
                        <SpxVolresetBig  />
                      ) 
                    }
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/chartDefaultFxPortfolio`}
                    render={() =>
                      this.state.realTime1 ? (
                        <DefaultFxPortfolioBig data={this.state.portfolio} />
                      ) : (
                        <Loader />
                      )
                    }
                  /> */}
                </Switch>
              </>
            </Router>
          </div>
        </div>
      </div>
     );
  }
}










