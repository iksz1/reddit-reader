import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IAppState } from "../reducers/rootReducer";
import * as actions from "../actions/creators";
import AddSubForm from "./AddSubForm";

const Wrapper = styled.div`
  /* width: 100%; */
`;

const Block = styled.div`
  max-width: 30rem;
  margin: auto;
`;

const BlockLabel = styled.h2`
  margin: 1.5em 0;
  border-bottom: 1px solid ${p => p.theme.primary};
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5em;
  background: ${p => p.theme.bg};
  color: inherit;
  border: 1px solid ${p => p.theme.primary};
`;

const List = styled.ul`
  padding: 0.5em;
  list-style: none;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.4rem;
  border: 1px solid ${p => p.theme.primary};
`;

const LI = styled.li`
  position: relative;
  padding: 0.5em;
  text-transform: uppercase;
`;

const XBtn = styled.button`
  display: none;
  position: absolute;
  top: 0.5em;
  right: 1em;
  background: inherit;
  color: inherit;
  font-weight: bold;
  border: ${p => p.theme.primary};
  ${LI}:hover & {
    display: block;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

type PFS = ReturnType<typeof mapStateToProps>;
type PFD = typeof mapDispatchToProps;

interface IProps extends PFS, PFD {}

interface IState {
  selectedTheme: string;
}

class Settings extends Component<IProps, IState> {
  state: IState = {
    selectedTheme: "",
  };

  handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedTheme: e.target.value });
  };

  render() {
    const { subs, addSub, removeSub, loadSubs } = this.props;
    const { selectedTheme } = this.state;

    return (
      <Wrapper>
        <BlockLabel>Subreddits</BlockLabel>
        <Block>
          <List>
            {subs.map(sub => (
              <LI key={sub} value={sub}>
                {sub}
                <XBtn onClick={() => removeSub(sub)}>X</XBtn>
              </LI>
            ))}
          </List>
          <AddSubForm onSubmit={addSub} />
        </Block>
        <BlockLabel>Theme</BlockLabel>
        <Block>
          <Select value={selectedTheme} onChange={this.handleThemeChange}>
            <option value="night">Night</option>
            <option value="light">Light</option>
            <option value="alright">Alright</option>
          </Select>
        </Block>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ subs }: IAppState) => ({
  subs,
});

const mapDispatchToProps = {
  addSub: actions.addSub,
  removeSub: actions.removeSub,
  loadSubs: actions.loadSubs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
