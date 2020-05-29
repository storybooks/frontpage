# Storybook website

Storybook is the most popular UI component explorer! This is the website for https://storybook.js.org/.

**Note**: This is not the docs, those are located [here](https://github.com/storybooks/storybook/tree/next/docs).

## 🛠 Contributing

Contributions welcome! If it’s something small like grammar or punctuation, open up a pull request. If it’s a bigger change or new feature, add an issue for discussion.

**Workflow**

1. Feature idea or bugfix?
2. Build new UI or tweak existing UI in Storybook first
3. Integrate with Gatsby
4. Ensure tests pass in [Circle CI storybooks/frontpage](https://circleci.com/gh/storybooks/frontpage)
5. Ensure site works and is QAed via Netlify previews
6. Ensure no visual bugs in [Chromatic storybooks/frontpage](https://www.chromatic.com/builds?appId=5be26744d2f6250024a9117d)
7. Pull request

## Running the project locally

### 📕 Storybook instructions

The Storybook for Storybook contains every UI component. The UI is built following [Component-Driven Development](https://blog.hichroma.com/component-driven-development-ce1109d56c8e), a process that builds UIs from the “bottom up” starting with components and ending with screens. That means contributors should compose UIs in Storybook _before_ integration with the Gatsby app.

1. yarn install
2. yarn build
3. yarn run storybook

### Gatsby instructions

Gatsby is used for basic routing and static site generation.

1. yarn start

### GitHub GraphQL API Authentication

The "team" page hits GitHub's GraphQL API. In order to retrieve information about the `storybookjs` organization, you need to have the proper permissions & also create an environment variable with your access token.

In development:

1. [Create a personal access token](https://github.com/settings/tokens) with the `read:org` scope.
2. Create a new file, `.env.development` and add `GITHUB_TOKEN=<YOUR_TOKEN>`, replacing `<YOUR_TOKEN>` with the token you generated in step 1.
3. Restart the dev server.

The application will still run without it, but the sections that rely on it will be hidden.

In production, the variable will get set during the Netlify build.

## Tooling

This project uses these tools to make our job easier.

### 💫 Deploys by [Netlify](https://netlify.com)

Master and branches are automatically deployed by Netlify every commit.

### 🖼 Visual testing by [Chromatic](https://www.chromatic.com/library?appId=5be26744d2f6250024a9117d)

All stories in the Storybook are automatically visual tested on desktop and mobile each commit. Ensure all baselines are ✅ accepted before merging.

### 🚦 Continuous integration by [Circle CI](https://circleci.com/gh/storybookjs/frontpage)

Every build a test suite runs. Ensure there are no errors before merging.
