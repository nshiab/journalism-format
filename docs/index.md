**Journalism Format v1.1.10**

***

# The Journalism Library (format functions)

Useful TypeScript functions for journalism projects. This library focuses on
easily formatting numbers, dates, and more. It's part of the
[journalism library](https://github.com/nshiab/journalism).

The library is available on
[npm](https://www.npmjs.com/package/@nshiab/journalism-format), with
[documentation](https://nshiab.github.io/journalism-format/) on GitHub Pages.
It has no runtime dependencies and uses standard JavaScript and Web APIs,
so it can also be bundled for browsers.

The documentation is also available as
[llms.txt](https://nshiab.github.io/journalism-format/llms.txt), an index of the
individual documentation pages for AI agents, and
[llm.md](https://nshiab.github.io/journalism-format/llm.md), a complete Markdown
reference for AI coding assistants or offline reading.

The library is maintained by [Nael Shiab](http://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).

> [!TIP]
> To learn how to use this library and more, check out
> [Code Like a Journalist](https://www.code-like-a-journalist.com/), a free and
> open-source data analysis and data visualization course in TypeScript. You
> might also find the
> [simple-data-analysis library](https://github.com/nshiab/simple-data-analysis)
> interesting.

Requires **Node.js 24.21.0 or later**. Use `import` and set `"type": "module"`
in your project's `package.json`.

```bash
npm install @nshiab/journalism-format
```

```ts
import { formatNumber } from "@nshiab/journalism-format";

console.log(formatNumber(1234.56)); // "1,234.56"
```

To quickly set up a data project with essential folders, configurations, and
documentation for AI agents, you can use
[@nshiab/setup-data-project](https://github.com/nshiab/setup-data-project).

```bash
npx @nshiab/setup-data-project
```

If you wish to contribute, please check the
[guidelines](https://github.com/nshiab/journalism-format/blob/main/CONTRIBUTING.md).
