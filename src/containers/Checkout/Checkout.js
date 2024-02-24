import React, { Component } from "react";
import { Outlet, Navigate } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import withRouter from "../../hoc/WithRouter/WithRouter";
import { connect } from "react-redux";

class Checkout extends Component {

    checkoutCanceledHandler = () => {
        this.props.navigate("/");
    }
    
    checkoutContinuedHandler = () => {
        this.props.navigate('/checkout/contact-data', { replace: true })
    }

    render() {
        let summary = <Navigate to="/"/>
        if(this.props.ings) {
           const purchasedRedirect = this.props.purchased ? <Navigate to='/'/> : null;
           summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Outlet/>
                </div>
           );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
      ings: state.burgerBuilder.ingredients,
      purchased: state.order.purchased
    }
  }

export default connect(mapStateToProps)(withRouter(Checkout));