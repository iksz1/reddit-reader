import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import styled from "styled-components";
import Nav from "./Nav/Nav";
import { Modal } from "./Modal";
import { addSub } from "../actions/creators";
import { IAppState } from "../reducers/rootReducer";
import AddSubForm from "./AddSubForm";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 10rem;
  border-bottom: ${p => p.theme.border};
`;

const ModalTrigger = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: inherit;
  color: inherit;
  font-size: 2rem;
  border: none;
`;

const SLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

type PFS = ReturnType<typeof mapStateToProps>;
type PFD = typeof mapDispatchToProps;

interface IProps extends PFS, PFD {}

interface IState {
  isModalOpen: boolean;
}

class Header extends Component<IProps, IState> {
  state: IState = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { isModalOpen } = this.state;
    const { subs, addSubreddit } = this.props;

    return (
      <Wrapper>
        <Nav subs={subs} />
        <ModalTrigger onClick={this.toggleModal}>#</ModalTrigger>
        <Modal isOpen={isModalOpen} onRequestClose={this.toggleModal}>
          <p>Subreddits</p>
          <AddSubForm onSubmit={addSubreddit} />
          <ul>
            {subs.map(sub => (
              <li key={sub}>
                <SLink to={`/r/${sub}`}>{sub}</SLink>
              </li>
            ))}
          </ul>
        </Modal>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ subs }: IAppState) => ({
  subs,
});

const mapDispatchToProps = {
  addSubreddit: addSub,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
