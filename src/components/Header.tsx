import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import styled from "styled-components";
import Nav from "./Nav/Nav";
import Modal from "./Modal";
import { addSub } from "../actions/creators";
import { Dispatch } from "redux";
// import Modal from "react-modal";

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
  z-index: 1001;
  background: inherit;
  color: inherit;
  font-size: 2rem;
  border: none;
`;

const SLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

interface IProps {
  subs: string[];
  dispatch: Dispatch;
}

interface IState {
  modalOpen: boolean;
  newSubValue: string;
}

class Header extends Component<IProps, IState> {
  state: IState = {
    modalOpen: false,
    newSubValue: "",
  };

  toggleModal = () => {
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));
  };

  submitSub = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.dispatch(addSub(this.state.newSubValue));
    this.setState({ newSubValue: "" });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newSubValue: e.target.value });
  };

  render() {
    const { modalOpen, newSubValue } = this.state;
    const { subs } = this.props;

    return (
      <Wrapper>
        <Nav />
        <ModalTrigger onClick={this.toggleModal}>#</ModalTrigger>
        <Modal isOpen={modalOpen} onRequestClose={this.toggleModal}>
          <p>Subreddits</p>
          <form onSubmit={this.submitSub}>
            <input
              type="text"
              value={newSubValue}
              onChange={this.handleInputChange}
              placeholder="add subreddit"
            />
            <button type="submit">Add</button>
          </form>
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

const mapStateToProps = ({ subs }: any) => ({
  subs,
});

// const mapDispatchToProps = {
//
// };

export default connect(mapStateToProps)(Header);
