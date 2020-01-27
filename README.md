<div align="center">
  <h1>@system76/forms</h1>
  <h3>System76 Vue components for forms</h3>
  <br>
  <br>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/@system76/forms/">
    <img src="https://img.shields.io/npm/v/@system76/forms.svg" alt="npm">
  </a>

  <a href="https://renovatebot.com/">
    <img src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg" alt="renovate">
  </a>

  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="standard">
  </a>

  <a href="https://forms.origin76.com/">
    <img src="https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg" alt="Storybook">
  </a>
</p>

---

This repository contains all the System76 form Vue components including buttons,
inputs, and labels. It also holds client side validation logic.

## Using

```
npm install --save-dev @system76/forms
```

### Tips

- You will need to include the stylesheets for this package, as well as for
`@system76/design`. If you are using nuxt, simply add this to the configuration
file:

```
{
  css: [
    '@system76/design/dist/index.common.css',
    '@system76/forms/dist/index.common.css'
  ]
}
```

- You will need to ensure that babel `sourceType` is set to `unambiguous`. In
nuxt, this means adding the following to your configuration:

```
build: {
  babel: {
    sourceType: 'unambiguous'
  }
}
```

## Development

1) Download the repository

2) Run `npm ci`

3) Run `npm run build`

4) Run `npm start`

5) Start hacking

## Deployment

To [trigger a release](https://semantic-release.gitbook.io/semantic-release/#triggering-a-release),
push a commit to the `master` branch in the
[Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
format.
