import React from "react";
import styled from "styled-components";
import { withFetching, IWithFetchingProps } from "../hoc/withFetching";
import Comment from "./Comment";
import MainPost from "./MainPost";
import { Spinner } from "../shared/Spinner";

const CommentsChunk = styled.div`
  font-size: 1.6rem;
  padding: 1em 0;
  &:not(:last-child) {
    border-bottom: 1px solid ${p => p.theme.primary};
    margin-bottom: 1em;
  }
`;

interface IProps extends IWithFetchingProps {
  postId?: string;
}

const Comments = ({ data, isLoading, postId }: IProps) => {
  const { posts, comments } = data;
  const mainPost = posts.find(post => post.id === postId);

  return (
    <>
      {mainPost && <MainPost post={mainPost} />}
      {isLoading && <Spinner size="2em" centered />}
      {comments.map((cmtChunk, i) => (
        <CommentsChunk key={i}>
          {cmtChunk.map(cmt => (
            <Comment key={cmt.id} comment={cmt} />
          ))}
        </CommentsChunk>
      ))}
    </>
  );
};

export default withFetching(Comments);
