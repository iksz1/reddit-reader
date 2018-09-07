import React from "react";
import { Redirect, RouteComponentProps } from "@reach/router";

const Home: React.SFC<RouteComponentProps> = () => {
  return <Redirect to="/r/reactjs" noThrow={true} />;
};

export default Home;
