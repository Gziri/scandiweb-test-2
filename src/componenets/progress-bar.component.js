import React, { Component } from "react";
import "./progress-bar.styles";

import * as config from "SourceRoute/Checkout/Checkout.config";

class ProgressBar extends Component {
  filterSteps() {
    return Object.keys(config).filter((key) => key.includes("STEP"));
  }
  renderCheckoutSteps = (currentStep = this.props.checkoutStep) => {
    let rawSteps = this.filterSteps();
    let stepDisplayText = rawSteps.map(
      (x) =>
        x.split("_")[0].charAt(0) +
        x.split("_")[0].slice(1).toString().toLowerCase()
    );
    let steps = stepDisplayText.map((step, index) => (
      <div className="wrapper" key={step}>
        {index > 0 && index < stepDisplayText.length ? (
          <div className="baseLine middleLine">
            <div
              className={`${
                index <= rawSteps.indexOf(currentStep) ? "fillLine" : ""
              }`}
            />
          </div>
        ) : <div className="empty"/>}
        <div className={` ${index === 0 && index < stepDisplayText.length ? "firstStep":""} step`}>
          <div className="stepNumber">
            <div className="stepContent">
              {rawSteps.indexOf(this.props.checkoutStep) > index ? (
                <div>&#x2714;</div>
              ) : (
                index + 1
              )}
            </div>

            <div
              className={`${
                index <= rawSteps.indexOf(currentStep) ? "stepNumberFill" : ""
              }`}
            />
          </div>
          <p className="stepName">{step}</p>
        </div>
      </div>
    ));
    return (
      <div className="checkoutProgress">
        <div className={`baseLine line `}>
          <div className="fillLine"></div>
        </div>
        {steps}
        <div className="baseLine line">
          <div
            className={`${
              rawSteps.indexOf(currentStep) == rawSteps.length - 1
                ? "fillLastLine"
                : ""
            }`}
          />
        </div>
      </div>
    );
  };
  render() {
    return this.renderCheckoutSteps()
  }
}

export default ProgressBar;
