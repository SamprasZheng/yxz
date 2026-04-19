import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import GiscusComments from '@site/src/components/GiscusComments';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): JSX.Element {
  const {isBlogPostPage} = useBlogPost();
  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage && <GiscusComments />}
    </>
  );
}
