import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Sampras',
  tagline: 'Buidl Buidl BuidlBuidlBuidlBuidl',
  // favicon: 'img/favicon.ico',

  url: 'https://SamprasZheng.github.io',
  baseUrl: '/yxz/',

  organizationName: 'SamprasZheng', // 你的 GitHub 用戶名稱
  projectName: 'yxz', // 你的 GitHub repository 名稱
  deploymentBranch: 'gh-pages', // 確保這行存在

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/SamprasZheng/yxz/tree/main/',
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
        },
        blog: {
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          // postsPerPage: 'ALL',
          editUrl: 'https://github.com/SamprasZheng/yxz/tree/main/',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  // presets: [
  //   [
      
  //     'classic',
  //     {
  //       docs: {
  //         sidebarPath: './sidebars.ts',
  //         editUrl: 'https://github.com/SamprasZheng/yxz/tree/main/',
  //         // remarkPlugins: [require('remark-math')],
  //         // rehypePlugins: [require('rehype-katex')]
  //       },
  //       blog: {
  //         remarkPlugins: [require('remark-math')],
  //         rehypePlugins: [require('rehype-katex')],
  //         showReadingTime: true,
  //         feedOptions: {
  //           type: ['rss', 'atom'],
  //           xslt: true,
  //         },
  //         editUrl: 'https://github.com/SamprasZheng/yxz/tree/main/',
  //         onInlineTags: 'warn',
  //         onInlineAuthors: 'warn',
  //         onUntruncatedBlogPosts: 'warn',
  //       },
  //       theme: {
  //         customCss: './src/css/custom.css',
  //       },
  //     } satisfies Preset.Options,
  //   ],
  // ],

  themeConfig: {
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Sampras',
      // logo: {
      //   alt: 'My Site Logo',
      //   src: 'img/logo.svg',
      // },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        { to: '/blog', label: 'Blog', position: 'left' },
        
        { to: '/blog/tags/rf', label: 'RF', position: 'left' },
        { to: '/blog/tags/dot', label: 'Polkadot', position: 'left' },
        { to: "/portfolio/", label: "Portfolio", position: "left" },
        // { to: "/mcp", label: "AI", position: "left" },
        { to: '/blog/tags', label: 'tags', position: 'right' },
        
        {
          href: 'https://github.com/SamprasZheng/yxz',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'Docs',
    //       items: [
    //         {
    //           label: 'Tutorial',
    //           to: '/docs/intro',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Socials',
          
    //       items: [
    //         // {
    //       //     label: 'X',
    //       //     href: 'https://x.com/polkasharks',
    //       //   },
    //         // {
    //         //   label: 'Bento',
    //         //   href: 'https://bento.me/polkasharks',
    //         // }
    //       ],
    //     },
    //     {
    //       title: 'More',
    //       items: [
    //         {
    //           label: 'Blog',
    //           to: '/blog',
    //         },
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/SamprasZheng/yxz',
    //         },
    //         // {
    //         //   label: 'Contact',
    //         //   href: '/contact',
    //         // },
    //       ],
    //     },
    //   ],
      copyright: `Copyright © ${new Date().getFullYear()} Sampras,  Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

