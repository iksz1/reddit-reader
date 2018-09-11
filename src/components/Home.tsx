import React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "@reach/router";
import { IAppState } from "../store/ducks";

type PFS = ReturnType<typeof mapStateToProps>;

interface IProps extends PFS, RouteComponentProps {}

const Home = ({ subreddit }: IProps) => <Redirect to={`/r/${subreddit}`} noThrow />;

const mapStateToProps = ({ subs }: IAppState) => ({
  subreddit: subs[0],
});

export default connect(mapStateToProps)(Home);
