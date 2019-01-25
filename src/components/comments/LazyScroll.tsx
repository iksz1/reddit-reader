import React, { Component } from "react";
import throttle from "lodash.throttle";

interface IProps {
  perPage: number;
  offset: number;
}

interface IState {
  page: number;
}

export default class LazyScroll extends Component<IProps, IState> {
  static defaultProps = {
    perPage: 25,
    offset: 100,
  };

  state: IState = {
    page: 1,
  };

  throttledCheck = throttle(this.positionCheck.bind(this), 50);

  componentDidMount() {
    window.document.addEventListener("scroll", this.throttledCheck);
  }

  componentWillUnmount() {
    window.document.removeEventListener("scroll", this.throttledCheck);
  }

  positionCheck() {
    if (window.innerHeight + window.scrollY + this.props.offset >= document.body.offsetHeight) {
      this.setState(({ page }) => ({ page: page + 1 }));
    }
  }

  render() {
    const { page } = this.state;
    const { perPage } = this.props;
    return React.Children.toArray(this.props.children).slice(0, page * perPage);
  }
}
