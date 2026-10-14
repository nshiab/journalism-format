# How to contribute

Issues, questions and contributions are welcome in the
[GitHub repository](https://github.com/nshiab/journalism-format).

Use Node.js 24.21.0 or later. Fork or clone the repository, create a branch,
then install the locked development dependencies:

```sh
npm ci
```

Implement functions in `src/` and their tests in `test/`. Keep public JSDoc
comments and examples up to date. Documentation generation requires JSDoc for
public functions, classes, methods and accessors. Keep `.ts` extensions in relative source
imports; Vite+ bundles the source into the published JavaScript.

| Command                                              | Purpose                                                                          |
| ---------------------------------------------------- | -------------------------------------------------------------------------------- |
| `npm test`                                           | Run all Vitest tests once                                                        |
| `npm test -- watch test/format/formatNumber.test.ts` | Run one test file and watch for changes during development                       |
| `npm run all-tests`                                  | Check formatting, lint and types; run tests; build the package and documentation |

The full suite runs in `America/Toronto`. `npm run test-time-zones` also runs
the timezone tests in UTC and `America/Vancouver`; `npm run all-tests` includes
all three environments. Plain `vp test` defaults to Toronto unless `TZ` is set;
the system-timezone assertion runs when `EXPECTED_SYSTEM_TIME_ZONE` is provided.

The documentation website in `site/`, Markdown pages in `docs/`, and root
`llm.md` and `llms.txt` files are generated automatically. Do not edit them by hand.

If `vp` is not installed globally, use `npx vp` to run the project's local version.

Run `npm run all-tests` before opening a pull request. Explain the behavior
changed and any relevant test results in your PR.
