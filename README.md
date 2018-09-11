<a href="https://npmcharts.com/compare/@wessberg/scaffold?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/%40wessberg%2Fscaffold.svg" height="20"></img></a>
<a href="https://david-dm.org/wessberg/scaffold"><img alt="Dependencies" src="https://img.shields.io/david/wessberg/scaffold.svg" height="20"></img></a>
<a href="https://www.npmjs.com/package/@wessberg/scaffold"><img alt="NPM Version" src="https://badge.fury.io/js/%40wessberg%2Fscaffold.svg" height="20"></img></a>
<a href="https://github.com/wessberg/ts-config/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/wessberg%2Fts-config.svg" height="20"></img></a>
<a href="https://opensource.org/licenses/MIT"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-yellow.svg" height="20"></img></a>
<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Support on Patreon" src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" height="20"></img></a>

# `@wessberg/scaffold`

> A virtual Open Source project maintainer

## Description

This is a library that can generate and maintain relevant files for Open Source Projects such as READMEs, licenses, code of conducts and contributing files.
This README itself is generated by `@wessberg/scaffold`.

## Install

### NPM

```
$ npm install @wessberg/scaffold
```

### Yarn

```
$ yarn add @wessberg/scaffold
```

### Run once with NPX

```
$ npx @wessberg/scaffold
```

## Usage

`@wessberg/scaffold` will enhance your Open Source project based on the configuration provided in `package.json`.

### Generating a README

To generate a README, run:

```
scaffold readme
```

This will try to locate any existing `README.md` file inside your package directory or generate a new one if it is missing.
You can provide the `--reset` flag to the `readme` command to generate a completely new README.
Now, to get the most out of `@wessberg/scaffold`, you can provide further details inside your package.json by adding the `scaffold` property to it.
For example:

```json
{
  "name": "my-package-name",
  "version": "1.2.3",
  "description": "my awesome project!",
  "scaffold": {
    "patreonUserId": "",
    "logo": "",
    "contributorMeta": {
      "John Doe": {
        "imageUrl": "",
        "role": "Lead Developer",
        "twitterHandle": "",
        "isCocEnforcer": true
      }
    },
    "backers": [
      {
        "name": "",
        "url": "",
        "imageUrl": ""
      }
    ]
  }
}
```

You can check out the `package.json` file of this package to see an example configuration.
If you want to blacklist some headers from being added to the README, you can pass the `--blacklist [...comma-separated header names]` option.
For example, you could provide `--blacklist maintainers,backers` to not add those two sections to the README.
In the configuration for the auto-generated README you are reading right now, the `--blacklist faq` option is provided.

#### Preserving formatting

Prettier will be used to format your README. Sometimes, parts of your README may be formatted in ways that you don't like. In such cases,
In these cases, you can put a `<!-- prettier-ignore -->` line immediately above the content that shouldn't be formatted.

You can read more about it [here](https://prettier.io/docs/en/ignore.html) 

### Generating a `LICENSE.md`

To generate a `LICENSE.md` file based on the license you've provided in the `package.json` file, run:

```
scaffold license
```

Many licenses require you to fill out some information such as the year, your name, as well as some details about your project.
`@wessberg/scaffold` will do its best to automate this by filling this information automatically!

### Generating a `CONTRIBUTING.md`

To generate a `CONTRIBUTING.md` file, run:

```
scaffold contributing
```

The file will be in a welcoming language and takes whatever metadata about existing contributors is available in the package's `package.json` and adds it to the file (for example, how to reach current contributors in Twitter).

### Generating a `CODE_OF_CONDUCT.md`

To generate a `CODE_OF_CONDUCT.md` file, run:

```
scaffold coc
```

The `CODE_OF_CONDUCT` will be based on [Contributor Convenant, v1.4](http://contributor-covenant.org/version/1/4/).

## Contributing

Do you want to contribute? Awesome! Please follow [these recommendations](./CONTRIBUTING.md).

## Maintainers

- <a href="https://github.com/wessberg"><img alt="Frederik Wessberg" src="https://avatars2.githubusercontent.com/u/20454213?s=460&v=4" height="11"></img></a> [Frederik Wessberg](https://github.com/wessberg): _Lead Developer_

## Backers 🏅

[Become a backer](https://www.patreon.com/bePatron?u=11315442) and get your name, logo, and link to your site listed here.

## License 📄

MIT © [Frederik Wessberg](https://github.com/wessberg)
