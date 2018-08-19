import React, { Component } from "react";
import styled from "styled-components";
import { IPost } from "../utils/responseParser";
import { CommentBody, CommentMeta } from "./Comment";

const Wrapper = styled.div`
  margin: 1em 0;
  font-size: 1.6rem;
  border-bottom: ${p => p.theme.border};
  /* &:not(:last-child) {
    border-bottom: ${p => p.theme.border};
  } */
`;

const PostTitle = styled.a`
  font-size: 1.8rem;
  font-weight: bold;
  color: inherit;
`;

const PostBody = CommentBody.extend`
  padding: 1em 0;
`;

const PostMeta = CommentMeta.extend``;

interface IProps {
  post: IPost;
}

export default class MainPost extends Component<IProps> {
  render() {
    const { post } = this.props;

    return (
      <Wrapper>
        <PostTitle href={post.url} target="_blank" rel="noopener">
          {post.title}
        </PostTitle>
        <PostBody dangerouslySetInnerHTML={{ __html: post.selftext_html }} />
        <PostMeta>
          posted by <strong>{post.author}</strong> 5 min ago
        </PostMeta>
        {/* {post.media_embed && <div dangerouslySetInnerHTML={{ __html: post.media_embed.content }} */}
      </Wrapper>
    );
  }
}
