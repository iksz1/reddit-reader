import React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "@reach/router";
import { IAppState } from "../store/ducks";
import { subsSelector } from "../store/ducks/subs";

type PFS = ReturnType<typeof mapStateToProps>;

interface IProps extends PFS, RouteComponentProps {}

const Home = ({ subreddit }: IProps) => <Redirect to={`/r/${subreddit}`} noThrow />;

const mapStateToProps = (state: IAppState) => ({
  subreddit: subsSelector(state)[0],
});

export default connect(mapStateToProps)(Home);
