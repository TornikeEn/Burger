import React, { Component, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import ContactData from "./containers/Checkout/ContactData/ContactData";
import { connect } from "react-redux";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import withRouter from "./hoc/WithRouter/WithRouter";

const AsynCheckout = lazy(() => import('./containers/Checkout/Checkout'));
const AsynOrders = lazy(() => import('./containers/Orders/Orders'));
const AsynAuth = lazy(() => import('./containers/Auth/Auth'));


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <React.Fragment>
        <Routes>
          <Route path="/auth" element={<Suspense fallback={<div>Loading...</div>}><AsynAuth /></Suspense>}/>
          <Route path="/" exact element={<BurgerBuilder/>}/>
        </Routes>
          <Navigate to="/"/>
      </React.Fragment>
      );
    if(this.props.isAuthenticated) {
      routes = (
        <Routes>
          <Route path="/checkout" element={<Suspense fallback={<div>Loading...</div>}><AsynCheckout /></Suspense>}>
            <Route path='contact-data' element={<ContactData/>}/>
          </Route>
          <Route path="/orders" element={<Suspense fallback={<div>Loading...</div>}><AsynOrders /></Suspense>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/auth" element={<Suspense fallback={<div>Loading...</div>}><AsynAuth /></Suspense>}/>
          <Route path="/" exact element={<BurgerBuilder/>}/>
        </Routes>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
