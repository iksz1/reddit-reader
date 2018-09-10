import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0.5em 0;
`;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5em;
  color: inherit;
  background: ${p => p.theme.bg};
  border: 1px solid ${p => p.theme.primary};
`;

const Button = styled.button`
  color: ${p => p.theme.bg};
  background: ${p => p.theme.primary};
  border: 1px solid ${p => p.theme.primary};
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  font-family: inherit;
  font-weight: bold;
`;

interface IProps {
  onSubmit: (sub: string) => void;
}

interface IState {
  inputValue: string;
}

export default class AddSubForm extends Component<IProps, IState> {
  state: IState = {
    inputValue: "",
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            value={inputValue}
            onChange={this.handleChange}
            placeholder="add subreddit"
          />
          <Button type="submit" disabled={inputValue ? false : true}>
            Add
          </Button>
        </Form>
      </Wrapper>
    );
  }
}
