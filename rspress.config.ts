// noinspection JSUnusedGlobalSymbols
// noinspection SpellCheckingInspection

import * as path from 'node:path';

import { defineConfig } from 'rspress/config';

import remarkMath from 'remark-math';
import rehypeShiki from '@shikijs/rehype';
import pluginGoogleAnalytics from 'rspress-plugin-google-analytics';

import rehypeKatex from 'rehype-katex';
import rehypeMermaid from 'rehype-mermaid';
import { myPluginCollectPageInfo } from './plugins/my-plugin-collect-page-info';

export default defineConfig({
  title: 'Reveries',
  description: '我的博客',
  root: path.join(__dirname, 'content'),

  icon: '/blog-icon.png',
  logo: {
    light: '/blog-logo.svg',
    dark: '/blog-logo.svg',
  },

  globalStyles: path.join(__dirname, 'index.css'),
  globalUIComponents: [path.join(__dirname, 'components/SideEffects.tsx')],

  builderConfig: {
    output: {
      polyfill: 'usage',
      sourceMap: { js: 'source-map', css: true },
    },
    source: { alias: { '@': '.' } },
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/mmach2000/mmach2000.github.io' },
    ],
  },

  plugins: [
    pluginGoogleAnalytics({ id: 'G-02B72QHDVW' }),
    myPluginCollectPageInfo(),
  ],
  mediumZoom: {
    selector: '.rspress-doc img',
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      // @ts-expect-error. Rspress has a different type definition for rehype plugins
      rehypeKatex,
      // @ts-expect-error. Same as above
      [rehypeMermaid, { strategy: 'img-svg' }],
      // @ts-expect-error. Same as above
      [rehypeShiki, { themes: { light: 'github-light', dark: 'github-dark' } }],
    ],
    mdxRs: {
      include: (filepath: string) => !filepath.includes('.plus.md'),
    },
  },
});
