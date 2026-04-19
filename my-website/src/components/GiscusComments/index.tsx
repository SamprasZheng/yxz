import React from 'react';
import Giscus from '@giscus/react';
import {useColorMode} from '@docusaurus/theme-common';

/**
 * Giscus comments mounted under each blog post.
 *
 * Setup: go to https://giscus.app, pick repo `SamprasZheng/yxz`,
 * copy the generated data-repo-id + data-category-id here.
 * Enable "Discussions" in the GitHub repo settings first.
 */
const GISCUS_REPO = 'SamprasZheng/yxz' as const;

// TODO: replace with real IDs from https://giscus.app
const GISCUS_REPO_ID = 'REPLACE_ME_REPO_ID';
const GISCUS_CATEGORY = 'General';
const GISCUS_CATEGORY_ID = 'REPLACE_ME_CATEGORY_ID';

export default function GiscusComments(): JSX.Element | null {
  const {colorMode} = useColorMode();

  if (GISCUS_REPO_ID.startsWith('REPLACE_ME')) {
    // Don't render until real IDs are filled in — avoids noisy console errors.
    return null;
  }

  return (
    <div style={{marginTop: '3rem'}}>
      <Giscus
        id="comments"
        repo={GISCUS_REPO}
        repoId={GISCUS_REPO_ID}
        category={GISCUS_CATEGORY}
        categoryId={GISCUS_CATEGORY_ID}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={colorMode === 'dark' ? 'dark' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
