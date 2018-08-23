import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0.5em 0;
`;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  padding: 0.5em;
  color: inherit;
  background: ${p => p.theme.bg};
  border: 1px solid ${p => p.theme.primary};
`;

const Button = styled.button`
  color: inherit;
  background: inherit;
  border: 1px solid ${p => p.theme.primary}
  border-left: none;
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
    const { onSubmit } = this.props;
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
          <Button type="submit">Add</Button>
        </Form>
      </Wrapper>
    );
  }
}
