import React from "react";
import {
  useLocation,
  useMatch,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

export const withRouter = (Component) => {
  return (props) => (
    <Component
      {...props}
      location={useLocation()}
      navigate={useNavigate()}
      params={useParams()}
      match={useMatch(useLocation().pathname)}
      outletContext={useOutletContext()}
    />
  );
};

export default withRouter;
