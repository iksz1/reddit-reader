import React, { Component } from "react";
import styled from "styled-components";
import { THEMES } from "../../constants";

const Select = styled.select`
  width: 100%;
  padding: 0.5em;
  background: ${p => p.theme.bg};
  color: inherit;
  border: 1px solid ${p => p.theme.primary};
`;

interface IProps {
  themeId: string;
  onThemeChange: (themeId: string) => void;
}

class ThemeBlock extends Component<IProps> {
  handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onThemeChange(e.target.value);
  };

  render() {
    const { themeId } = this.props;

    return (
      <>
        <Select value={themeId} onChange={this.handleThemeChange}>
          {Object.keys(THEMES).map(key => (
            <option key={key} value={key}>
              {THEMES[key].name}
            </option>
          ))}
        </Select>
      </>
    );
  }
}

export default ThemeBlock;
