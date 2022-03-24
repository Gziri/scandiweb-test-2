import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import ContentWrapper from "Component/ContentWrapper";
import * as config from "SourceRoute/Checkout/Checkout.config";
import "./Checkout.test.style";

class Checkout extends SourceCheckout {
  filterSteps() {
    return Object.keys(config).filter((key) => key.includes("STEP"));
  }

  renderCheckoutSteps = (currentStep) => {
    let rawSteps = this.filterSteps();
    let stepDisplayText = rawSteps.map(
      (x) =>
        x.split("_")[0].charAt(0) +
        x.split("_")[0].slice(1).toString().toLowerCase()
    );
    let steps = stepDisplayText.map((step, index) => (
      <>
        {index > 0 && index < stepDisplayText.length ? (
          <div className="baseLine middleLine">
            {" "}
            <div
              className={`${
                index <= rawSteps.indexOf(currentStep) ? "fillLine" : ""
              }`}
            />
          </div>
        ) : null}
        <div className="step">
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
      </>
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
    return (
      <main block="Checkout">
        {this.renderCheckoutSteps(this.props.checkoutStep)}
        <ContentWrapper
          wrapperMix={{ block: "Checkout", elem: "Wrapper" }}
          label={__("Checkout page")}
        >
          {this.renderSummary(true)}
          <div block="Checkout" elem="Step">
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}

export default Checkout;
