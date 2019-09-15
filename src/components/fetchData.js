import React, { Component } from 'react'
import _ from "lodash";
import {connect} from "react-redux"

const macrofixURL = "http://104.211.19.171/serverout/macrofx";
const spxvixURL = "http://104.211.19.171/serverout/spxvix";
const realTime1 = "http://104.211.19.171/realtime1";
const portfolio =    "http://104.211.19.171/serverout/portfoliofx"; 
const placeHolder = 'https://jsonplaceholder.typicode.com/todos/1'

class FetchData extends Component {

    state = {
      isLoggedIn: true,
      isNewUser: false,
      spxvix: null,
      macrofix: null,
      realTime1: null,
      protfolio: null
    };

    intervalRealTime1 = () => {
      let counter = 0;
      const x = setInterval(() => {
       
        fetch(realTime1)
          .then(response => response.json())
          .catch(error => alert('Conncetion error:', error))
          .then(json => {
           
            if(_.last(json).date !== _.last(this.props.realTime1).date)                     
            this.props.realTime1Update(json)
            
          });       
       
        counter++
        console.log(counter)
        if (counter === 5) clearInterval(x);
       

      }, 10000);
    };

    intervalFetchData = () => {
    
      setInterval(() => {

        fetch(spxvixURL)
          .then(response => response.json())
          .catch(error => alert('Conncetion error:', error))
          .then(json => {
           if(_.last(json).date !== _.last(this.props.spxvix).date)                     
           this.props.spxvixUpdate(json)
          });

        fetch(macrofixURL)
          .then(response => response.json())
          .catch(error => alert('Conncetion error:', error))
          .then(json => {
            if(_.last(json).date !== _.last(this.props.macrofix).date)                     
            this.props.macrofixUpdate(json)
          });

          fetch(portfolio)
          .then(response => response.json())
          .catch(error => alert('Conncetion error:', error))
          .then(json => {
           if(_.last(json) !== _.last(this.props.portfolio))                     
           this.props.portfolioUpdate(json)
          });


      }, 10800000) // 3 godziny
    
     

      

    }

    componentDidMount() {

      fetch(realTime1)
        .then(response => response.json())
        .catch(error => alert('Conncetion error:', error))
        .then(json => {
              
          this.props.realTime1Update(json)
        });  
      
      
      this.intervalRealTime1();



     



    }

    componentWillUnmount() {
      clearInterval(this.intervalRealTime1)
    }

    




    render() {

      console.log(this.props)

        return (
            <>
           
            </>
        )
    }
}

const mapStateToProps = (state) => 
 { return {
   realTime1: state.realTime1,
   spxvix: state.spxvix,
   macrofix: state.macrofix,
   portfolio: state.portfolio,
   loading: state.loading
 }
}

const mapDispatchToProps = (dispatch) => {

  return {
    spxvixUpdate: (value) => dispatch({type: 'SPXVIX', value: value}),
    macrofixUpdate: (value) => dispatch({type: 'MACROFIX', value: value}),
    realTime1Update: (value) => dispatch({type: 'REALTIME1', value: value}),
    portfolioUpdate: (value) => dispatch({type: 'PORTFOLIO', value: value}),
    loading: (value) => dispatch({type: "LOADING", value: value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchData)
