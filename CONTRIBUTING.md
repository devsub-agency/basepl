# Contributing

Thanks for your interest in contributing to basepl. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@maurice_build](https://x.com/maurice_build) or [@clemens-code.bsky.social](https://bsky.app/profile/clemens-code.bsky.social).

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.
- We use [changesets](https://github.com/changesets/changesets) for managing releases.

## Structure

This repository is structured as follows:

```
www
├── basepl
├── components
├── content
└── templates
    ├── fields
    ├── blocks
    └── components
packages
└── registry
```

| Path                  | Description                           |
|-----------------------|---------------------------------------|
| `www/basepl/src`      | Contains fields, blocks and the website basepl.com           |
| `packages/registry`   | The `basepl` package.                 |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/devsub-agency/basepl.git
```

### Navigate to project directory

```bash
cd basepl
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
pnpm install
```

### Run a workspace

You can use the `pnpm --filter=[WORKSPACE]` command to start the development process for a workspace.

#### Examples

1. To run the `basepl.com` website:

```bash
pnpm --filter=@basepl/www dev
```
or
```bash
pnpm www:dev
```

2. To run the `basepl cli` package:

```bash
pnpm --filter=@basepl/cli dev
```

## Documentation

The documentation for this project is located in the `www` workspace. You can run the documentation locally by running the following command:

```bash
pnpm www:dev
```

Documentation is written using [MDX](https://mdxjs.com). You can find the documentation files in the `www/basepl/src/docs` directory.

The mdx files and the examples have to be written manually. The rest is auto generated. Run

```bash
pnpm build:registry
```

to build the registry file.

And run
```bash
pnpm build:docs
```

to generate the documentation index.

This will generate the index.json file for the registry in the public directory and the index.ts in the docs directory. If there are any error in the files do not change anything manual. Either way open an issue or fix the build scripts.

## Components

We have the components directly integrated in our website source code. You can find the blocks and fields under src/blocks and src/fields

```bash
www
└── basepl
    └──src
        ├── fields
        ├── blocks
        └── components
```

If a field or block contains not only a config.ts place the Component.tsx in the same directory.

When adding or modifying components, please ensure that:

1. You make the changes for every style. When multiple styles are present.
2. You update the documentation.
3. You run `pnpm build:registry` and `pnpm build:docs` to update the registry and docs.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feature:(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new components

If you have a request for a new component, please open a discussion on GitHub. We'll be happy to help you out.

## CLI

The `basepl/cli` package is a CLI for adding components to your project. You can find the documentation for the CLI [here]().

Any changes to the CLI should be made in the `packages/registry` directory. If you can, it would be great if you could add tests for your changes.

## Testing

Tests are written using [Vitest](https://vitest.dev). You can run all the tests from the root of the repository.

```bash
pnpm test
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.
