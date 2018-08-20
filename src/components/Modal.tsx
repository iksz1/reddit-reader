import React from "react";
import styled, { keyframes } from "styled-components";
import ReactModal from "react-modal";

const appear = keyframes`
0% {
  transform: translateX(-30px);
}
100% {
  transform: translateX(0);
}
`;

// since className prop refers to inner part of the modal,
// we use a wrapper to style overlay
const ModalAdapter = ({ className, contentClassName, ...props }: any) => (
  <ReactModal portalClassName={className} className={contentClassName} {...props} />
);

interface IModalProps {
  overlayClassName?: string;
  contentClassName?: string;
}

export const Modal = styled(ModalAdapter).attrs<IModalProps>({
  overlayClassName: "overlay",
  contentClassName: "content",
})`
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
  }
  .content {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    max-width: 50%;
    padding: 1em;
    overflow: auto;
    background: ${p => p.theme.bg}
    color: ${p => p.theme.primary}
    border-right: 1px solid ${p => p.theme.primary}
    animation: ${appear} 200ms ease;
  }
`;
