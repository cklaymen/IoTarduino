import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import { connect } from "react-redux";
import '../css/App.css';
import { switchingPinOn, switchingPinOff } from "../actions/pinActions";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SwitchTile from "./SwitchTile";
import Feedback from "./Feedback";

class App extends Component {
  render() {
    const mappedPins = this.props.pins.map(elem => {
      let togglePinHandler = function () {};
      if (elem.value === 0) {
        togglePinHandler = this.props.switchingPinOn.bind(this);
      } else if (elem.value === 1) {
        togglePinHandler = this.props.switchingPinOff.bind(this);
      }

      return <SwitchTile 
        key={elem.pin} 
        elem={elem}
        togglePinHandler={togglePinHandler}/>
    });
    const mappedFeedbacks = this.props.feedbacks.map(feedback => <Feedback key={feedback.id} type={feedback.type} message={feedback.message} />);
    return (
      <div className="app">
        <div className="name-header">LISTWA ZASILAJĄCA</div>
        <div className="feedback-container">
        </div>
        <div className="tiles-container">
          {mappedPins}
        </div>
        <ReactCSSTransitionGroup
          transitionName="feedback"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {mappedFeedbacks}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pins: state.pins.pins,
    feedbacks: state.feedback.list
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    switchingPinOn: switchingPinOn,
    switchingPinOff: switchingPinOff
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
