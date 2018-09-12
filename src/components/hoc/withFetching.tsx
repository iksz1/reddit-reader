import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppState } from "../../store/ducks";
import { fetchRequest } from "../../store/ducks/data";
import { RouteComponentProps } from "@reach/router";
import ErrorMessage from "../shared/ErrorMessage";

const mapStateToProps = ({ data }: IAppState) => ({
  data: data.data,
  isLoading: data.isLoading,
  error: data.error,
});

const mapDispatchToProps = {
  fetchRequest,
};

type PFS = ReturnType<typeof mapStateToProps>;
type PFD = typeof mapDispatchToProps;

export interface IWithFetchingProps extends PFS, PFD, RouteComponentProps {}

export const withFetching = <IWrappedProps extends IWithFetchingProps>(
  WrappedComponent: React.ComponentType<IWrappedProps>
) => {
  class WithFetching extends Component<IWithFetchingProps> {
    static displayName = `WithFetching(${WrappedComponent.name})`;

    componentDidMount() {
      this.fetchData();
    }

    componentDidUpdate(prevProps: IWithFetchingProps) {
      if (prevProps.uri !== this.props.uri) {
        this.fetchData();
      }
    }

    fetchData = () => {
      const { uri, fetchRequest } = this.props; // tslint:disable-line
      fetchRequest({ uri: uri as string });
    };

    render() {
      const { error } = this.props;

      if (error) return <ErrorMessage message={error.message} />;

      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithFetching);
};
