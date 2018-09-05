import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IAppState } from "../store/ducks";
import { RouteComponentProps } from "@reach/router";
import { addSub, removeSub } from "../store/ducks/subs";
import { changeTheme } from "../store/ducks/view";
import AddSubForm from "./AddSubForm";
import { THEMES } from "../constants";

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
  max-height: 20em;
  padding: 0.5em;
  overflow-y: auto;
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

interface IProps extends PFS, PFD, RouteComponentProps {}

class Settings extends Component<IProps> {
  handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.changeTheme(e.target.value);
  };

  render() {
    const { subs, addSub, removeSub, themeId } = this.props; // tslint:disable-line

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
          <Select value={themeId} onChange={this.handleThemeChange}>
            {Object.keys(THEMES).map(key => (
              <option key={key} value={key}>
                {THEMES[key].name}
              </option>
            ))}
          </Select>
        </Block>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ subs, view }: IAppState) => ({
  subs,
  themeId: view.themeId,
});

const mapDispatchToProps = {
  addSub,
  removeSub,
  changeTheme,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
