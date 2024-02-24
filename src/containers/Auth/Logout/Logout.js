import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import * as actions from "../../../store/actions/auth";

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout(this.props.history);
    }
    render() {
        return (
            <Navigate to="/"/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);