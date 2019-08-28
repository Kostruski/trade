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
import SpxVolresetBig from "./components/charts/spxVolresetBig"
import Loader from "./components/loader.js";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const macrofixURL = "http://104.211.19.171/serverout/macrofx";
const spxvixURL = "http://104.211.19.171/serverout/spxvix";
const realTime1 = "http://104.211.19.171/serverout/realtime1";

export default class App extends Component {
  state = {
    isLoggedIn: true,
    isNewUser: false,
    spxvix: null,
    macrofix: null,
    realTime1: null
  };

  componentDidMount() {
    fetch(spxvixURL)
      .then(response => response.json())
      .then(json => {
        this.setState({ spxvix: json });
      });

    fetch(macrofixURL)
      .then(response => response.json())
      .then(json => {
        this.setState({ macrofix: json });
      });

      fetch(realTime1)
      .then(response => response.json())
      .then(json => {
        this.setState({ realTime1: json });
      });

    const interval = () => {
      let counter = 0;
      const x = setInterval(() => {
        fetch(realTime1)
          .then(response => response.json())
          .then(json => {
            this.setState({ realTime1: json });
          });
        counter++;
        if (counter === 100) clearInterval(x);
      
      }, 30000);
    };

    interval();
  }

  changeNewUser = () => this.setState({ isNewUser: false });

  signUp = () => this.setState({ isNewUser: true });

  toggleLogin = () => {
    this.setState(prev => ({ isLoggedIn: !prev.isLoggedIn }));
  };

  render() {
    const ProtectedRoute = ({ isAllowed, ...props }) =>
      isAllowed ? <Route {...props} /> : <Redirect to="/" />;

    return (
      <div className="appWrapper">
        <div className="sideAndMain">
          <div className="main">
            <Header
              toggleLogin={this.toggleLogin}
              isLoggedIn={this.state.isLoggedIn}
            />
            <Router>
              <>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <LoginPage
                        changeNewUser={this.changeNewUser}
                        isNewUser={this.state.isNewUser}
                        toggleLogin={this.toggleLogin}
                        isLoggedIn={this.state.isLoggedIn}
                        signUp={this.signUp}
                      />
                    )}
                  />
                  <Route exact path="/contact" render={() => <Contact />} />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path="/section1"
                    render={() =>
                      this.state.realTime1 ? (
                        <Section1
                          data={this.state.realTime1}
                         
                        />
                      ) : (
                        <Loader />
                      )
                    }
                  />

                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path="/section2"
                    render={() =>
                      this.state.spxvix ? (
                        <Section2
                          data={this.state.spxvix}
                          
                        />
                      ) : (
                        <Loader />
                      )
                    }
                  />

                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path="/section3"
                    render={() =>
                      this.state.macrofix ? (
                        <Section3
                          data={this.state.macrofix}
                         
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
                      this.state.spxvix ? (
                        <Macro_FxBig data={this.state.macrofix} />
                      ) : (
                        <Loader />
                      )
                    }
                  />
                  <ProtectedRoute
                    isAllowed={this.state.isLoggedIn}
                    path={`/chartSpxVolrest`}
                    render={() =>
                      this.state.spxvix ? (
                        <SpxVolresetBig data={this.state.realTime1} />
                      ) : (
                        <Loader />
                      )
                    }
                  />
                </Switch>
              </>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}








