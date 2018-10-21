import React from "react";
import styled from "styled-components";
import AddSubForm from "./AddSubForm";
import { MdClose } from "react-icons/md";

const List = styled.ul`
  max-height: 20em;
  padding: 0.5em;
  overflow-y: auto;
  list-style: none;
  font-family: var(--font-secondary);
  font-size: 1.4rem;
  border: 1px solid ${p => p.theme.primary};
`;

const LI = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  text-transform: uppercase;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const XBtn = styled.button`
  display: none;
  padding: 0;
  width: 1em;
  height: 1em;
  background: ${p => p.theme.primary};
  color: ${p => p.theme.bg};
  border: none;

  ${LI}:hover & {
    display: block;
  }
  &:hover {
    transform: scale(1.2);
  }
`;

interface IProps {
  subs: string[];
  onAdd: (sub: string) => void;
  onRemove: (sub: string) => void;
}

export default ({ subs, onAdd, onRemove }: IProps) => {
  return (
    <>
      <List>
        {subs.map(sub => (
          <LI key={sub} value={sub}>
            {sub}
            <XBtn onClick={() => onRemove(sub)} aria-label="remove subreddit">
              <MdClose />
            </XBtn>
          </LI>
        ))}
      </List>
      <AddSubForm onSubmit={onAdd} />
    </>
  );
};
