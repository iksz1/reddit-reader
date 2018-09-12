import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IAppState } from "../../store/ducks";
import { RouteComponentProps } from "@reach/router";
import { addSub, removeSub } from "../../store/ducks/subs";
import { changeTheme } from "../../store/ducks/view";
import SubsBlock from "./SubsBlock";
import ThemeBlock from "./ThemeBlock";

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

type PFS = ReturnType<typeof mapStateToProps>;
type PFD = typeof mapDispatchToProps;

interface IProps extends PFS, PFD, RouteComponentProps {}

class Settings extends Component<IProps> {
  render() {
    const { subs, addSub, removeSub, themeId, changeTheme } = this.props; // tslint:disable-line

    return (
      <Wrapper>
        <BlockLabel>Subreddits</BlockLabel>
        <Block>
          <SubsBlock subs={subs} onAdd={addSub} onRemove={removeSub} />
        </Block>
        <BlockLabel>Theme</BlockLabel>
        <Block>
          <ThemeBlock themeId={themeId} onThemeChange={changeTheme} />
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