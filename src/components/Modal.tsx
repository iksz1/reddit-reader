import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

const appear = keyframes`
0% {
  transform: translateX(-30px);
}
100% {
  transform: translateX(0);
}
`;

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  position: fixed;
  height: 100%;
  max-width: 50%;
  padding: 1em;
  overflow: auto;
  background: ${p => p.theme.bg}
  color: ${p => p.theme.primary}
  border-right: 1px solid ${p => p.theme.primary}
  animation: ${appear} 200ms ease;
`;

interface IProps {
  isOpen?: boolean;
  onRequestClose: () => void;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

export default class Modal extends Component<IProps> {
  el = document.createElement("div");

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const { isOpen, onRequestClose, children } = this.props;

    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <Wrapper>
        <Content>{children}</Content>
      </Wrapper>,
      this.el
    );
  }
}
