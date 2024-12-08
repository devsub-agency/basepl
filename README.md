# base pl

Platform for information, templates and components for the payload cms.

## Usage 

You can install all components with a simple cli. 
run
```bash
npx @basepl/cli init
```
to initialize your project. 

to add components run 
```bash
npx @basepl/cli add <component(s)>
```

For more information check out the official docs under [basepl](https://basepl.com)

## About

The goal of basepl is to provide an easy and fast workflow for developing payload projects. 

Some basic informations regarding the components. 

1. Components can contain multiple files. For example a config.ts and a component.tsx. If you are not familiar with the files in payload check out the official [docs](https://payloadcms.com/docs/getting-started/what-is-payload)
2. The components.tsx are optional. You can configure basepl to run not install them by declining shadcn installation. Or you can set the --config flag on the add command to just install config files. 
3. For styling we use shadcn/ui. If you haven't set this up yet basepl will ask you to install it.
4. All components come "unstyled" and are 100% customizable in your own code. 

# How to contribute? 

Check out out [contribution guide line.](https://github.com/devsub-agency/basepl/blob/main/CONTRIBUTING.md)

# License 

This project uses the [MIT](https://github.com/devsub-agency/basepl/blob/main/LICENSE.md) license.

# Maintainer 

The project is currently maintained by [devsub](https://devsub.de/en)
If you have any questions reach out to Maurice via [X](https://x.com/maurice_build) or Clemens via [bsky](https://bsky.app/profile/clemens-code.bsky.social)
