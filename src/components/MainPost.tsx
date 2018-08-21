import React, { Component } from "react";
import styled from "styled-components";
import { IPost } from "../utils/responseParser";
import { CommentBody, CommentMeta } from "./Comment";

const Wrapper = styled.div`
  position: relative;
  margin: 1em 0;
  font-size: 1.6rem;
  border-bottom: ${p => p.theme.border};
  &::after {
    position: absolute;
    left: calc(50% - 4em);
    bottom: calc((-1em / 2) - 2px);
    padding: 0 0.5em;
    background: ${p => p.theme.bg};
    line-height: 1;
    content: "COMMENTS";
  }
`;

const PostTitle = styled.h2`
  margin-bottom: 0.2em;
`;

const ExternalLink = styled.a`
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
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          posted by <strong>{post.author}</strong> 5 min ago
        </PostMeta>
        {!post.is_self && (
          <ExternalLink href={post.url} target="_blank" rel="noopener">
            {post.url}
          </ExternalLink>
        )}
        <PostBody dangerouslySetInnerHTML={{ __html: post.selftext_html }} />
        {/* {post.media_embed && <div dangerouslySetInnerHTML={{ __html: post.media_embed.content }} */}
      </Wrapper>
    );
  }
}
