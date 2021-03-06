import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IAppState } from "../../store/ducks";
import { RouteComponentProps } from "@reach/router";
import { addSub, removeSub, subsSelector } from "../../store/ducks/subs";
import { changeTheme, themeSelector } from "../../store/ducks/view";
import SubsBlock from "./SubsBlock";
import ThemeBlock from "./ThemeBlock";

const Block = styled.div`
  max-width: 30rem;
`;

const BlockLabel = styled.h2`
  max-width: 30rem;
  margin: 1.5em 0;
  font-size: 2rem;
`;

type PFS = ReturnType<typeof mapStateToProps>;
type PFD = typeof mapDispatchToProps;

interface IProps extends PFS, PFD, RouteComponentProps {}

class Settings extends Component<IProps> {
  render() {
    const { subs, addSub, removeSub, themeId, changeTheme } = this.props; // tslint:disable-line

    return (
      <>
        <h1>Settings</h1>
        <BlockLabel>SUBREDDITS</BlockLabel>
        <Block>
          <SubsBlock subs={subs} onAdd={addSub} onRemove={removeSub} />
        </Block>
        <BlockLabel>THEME</BlockLabel>
        <Block>
          <ThemeBlock themeId={themeId} onThemeChange={changeTheme} />
        </Block>
      </>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  subs: subsSelector(state),
  themeId: themeSelector(state),
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
