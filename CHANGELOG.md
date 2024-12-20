## [3.0.2](https://github.com/wessberg/sandhog/compare/v3.0.1...v3.0.2) (2024-10-17)



## [3.0.1](https://github.com/wessberg/sandhog/compare/v3.0.0...v3.0.1) (2024-10-11)



# [3.0.0](https://github.com/wessberg/sandhog/compare/v2.0.2...v3.0.0) (2024-10-10)


### Features

* migrate to Node 22 ([ddcb7fe](https://github.com/wessberg/sandhog/commit/ddcb7fe84def1dd721c30851ef2b86794291cd2b))



## [2.0.2](https://github.com/wessberg/sandhog/compare/v2.0.1...v2.0.2) (2022-05-31)


### Bug Fixes

* convert rollup config to mjs format to instruct Rollup to treat the config as a pure ES module ([336167a](https://github.com/wessberg/sandhog/commit/336167abe14fd7bc01f1c22503e6243fdb7f07bd))
* use ansi-colors instead of Chalk for better CJS fallback support ([85e15d5](https://github.com/wessberg/sandhog/commit/85e15d5a5163f8f17323d2ca0dcfa315cd863d1d))



## [2.0.1](https://github.com/wessberg/sandhog/compare/v2.0.0...v2.0.1) (2022-05-29)


### Bug Fixes

* handle the case where a module has a default export when constructing a config ([9bf7416](https://github.com/wessberg/sandhog/commit/9bf7416a7fa381a28ae8b283dd3311c2b641d95d))



# [2.0.0](https://github.com/wessberg/sandhog/compare/v1.0.44...v2.0.0) (2022-05-29)


### Bug Fixes

* ensure node v14.19.0 or newer is used ([af3fb55](https://github.com/wessberg/sandhog/commit/af3fb5513db3b37a23ef487aeda2f6bedb133248))
* remove internal usage of import assertion in async import for compatibility reasons ([f0fbac8](https://github.com/wessberg/sandhog/commit/f0fbac8a39f5d75ec31ac5b65393319904b6ecc3))



## [1.0.44](https://github.com/wessberg/sandhog/compare/v1.0.43...v1.0.44) (2022-05-28)


### Features

* support .cjs and .mjs configs ([6a4208f](https://github.com/wessberg/sandhog/commit/6a4208f08a65b05005dac570281a06625a47adab))



## [1.0.43](https://github.com/wessberg/sandhog/compare/v1.0.42...v1.0.43) (2021-11-17)



## [1.0.42](https://github.com/wessberg/sandhog/compare/v1.0.41...v1.0.42) (2021-11-16)


### Features

* add support and handling for peerDependenciesMeta in generated README files ([343e3de](https://github.com/wessberg/sandhog/commit/343e3dea945d2872ce2d7a677b81f6add0a10918))



## [1.0.41](https://github.com/wessberg/sandhog/compare/v1.0.40...v1.0.41) (2021-05-28)


### Features

* export 'SandhogConfig' interface ([6616d2c](https://github.com/wessberg/sandhog/commit/6616d2c44a1ad92805a4a0ed4ace12335d57a663))



## [1.0.40](https://github.com/wessberg/sandhog/compare/v1.0.38...v1.0.40) (2021-05-26)



## [1.0.38](https://github.com/wessberg/sandhog/compare/v1.0.37...v1.0.38) (2021-05-18)



## [1.0.37](https://github.com/wessberg/sandhog/compare/v1.0.36...v1.0.37) (2021-05-18)


### Bug Fixes

* **options:** fix regression where CLI arguments were ignored. ([d1d6243](https://github.com/wessberg/sandhog/commit/d1d6243d11eb85560a9aac207f3b49aa0a9792e0))



## [1.0.36](https://github.com/wessberg/sandhog/compare/v1.0.34...v1.0.36) (2021-03-16)


### Bug Fixes

* **style:** don't match the Standard code style if the relevant ESLint rules are turned off ([7f58766](https://github.com/wessberg/sandhog/commit/7f5876633e20079c4711ba76fc3d5f7d58a8d485))



## [1.0.34](https://github.com/wessberg/sandhog/compare/v1.0.33...v1.0.34) (2021-03-16)


### Features

* **backers:** move backers section up in the README template ([1d1f609](https://github.com/wessberg/sandhog/commit/1d1f6094ee82c0b5421b021f10f506a450a49d59))



## [1.0.33](https://github.com/wessberg/sandhog/compare/v1.0.32...v1.0.33) (2021-03-16)


### Bug Fixes

* **patreon:** update patreon shield URL ([d6e0360](https://github.com/wessberg/sandhog/commit/d6e0360d26d8cc5196902d0df7b1499d68a80a83))



## [1.0.32](https://github.com/wessberg/sandhog/compare/v1.0.31...v1.0.32) (2020-09-30)



## [1.0.31](https://github.com/wessberg/sandhog/compare/v1.0.30...v1.0.31) (2020-09-07)


### Bug Fixes

* **badges:** ensure that all badges are rounded ([7fa4ac6](https://github.com/wessberg/sandhog/commit/7fa4ac673223bbd0a8b2af61139371858c6d5c08))



## [1.0.30](https://github.com/wessberg/sandhog/compare/v1.0.29...v1.0.30) (2020-07-03)


### Bug Fixes

* fix singular formatting of peer dependencies ([1e4e553](https://github.com/wessberg/sandhog/commit/1e4e55355dca408b5e5842be86dfdae479567694))
* **readme:** fix singular variant of peer dependencies install instructions ([9514f82](https://github.com/wessberg/sandhog/commit/9514f820b5cea55f138955049b001a8e6f8452d7))



## [1.0.29](https://github.com/wessberg/sandhog/compare/v1.0.28...v1.0.29) (2020-03-13)


### Bug Fixes

* **formatting:** fix list formatting for arrays with 2 elements ([8273ca9](https://github.com/wessberg/sandhog/commit/8273ca94228861d13ab69b7104aabf93f10a0dcd))



## [1.0.28](https://github.com/wessberg/sandhog/compare/v1.0.27...v1.0.28) (2020-03-13)


### Bug Fixes

* **formatting:** fix list formatting for arrays with 2 elements ([2c3d930](https://github.com/wessberg/sandhog/commit/2c3d930076306186eb1aa0f0058d3ffda2b4b13c))



## [1.0.27](https://github.com/wessberg/sandhog/compare/v1.0.26...v1.0.27) (2020-03-13)



## [1.0.26](https://github.com/wessberg/sandhog/compare/v1.0.25...v1.0.26) (2020-03-13)


### Features

* add support for 'isDevelopmentPackage' option that adds '--save-dev' and '--dev' options to generated install commands inside generated READMEs. ([fc14100](https://github.com/wessberg/sandhog/commit/fc14100188e44330b3a9b445d07ab0d531108fe2))



## [1.0.25](https://github.com/wessberg/sandhog/compare/v1.0.24...v1.0.25) (2020-02-29)


### Features

* Have maintainer and backer badges link to the related URL if any is given ([48fa456](https://github.com/wessberg/sandhog/commit/48fa4560f1e0ddf72f8836e53966c855f6843a7e))



## [1.0.24](https://github.com/wessberg/sandhog/compare/v1.0.23...v1.0.24) (2020-02-28)


### Features

* add support for manual sponsors ([8c53b40](https://github.com/wessberg/sandhog/commit/8c53b4019b49fa31fa900d8c3b4bd2b1701bd0a6))



## [1.0.23](https://github.com/wessberg/sandhog/compare/v1.0.22...v1.0.23) (2019-11-16)



## [1.0.22](https://github.com/wessberg/sandhog/compare/v1.0.21...v1.0.22) (2019-11-11)



## [1.0.21](https://github.com/wessberg/sandhog/compare/v1.0.20...v1.0.21) (2019-11-10)



## [1.0.20](https://github.com/wessberg/sandhog/compare/v1.0.19...v1.0.20) (2019-10-31)


### Features

* **patreon:** accepts patreon username as part of config ([d108ed2](https://github.com/wessberg/sandhog/commit/d108ed2afd7d68aed275177725e3d9a7f1b945c5))



## [1.0.19](https://github.com/wessberg/sandhog/compare/v1.0.18...v1.0.19) (2019-06-21)



## [1.0.18](https://github.com/wessberg/sandhog/compare/v1.0.17...v1.0.18) (2019-05-29)


### Features

* **funding:** adds two new commands: 'funding', which generates a config-driven .github/FUNDING.yml file for supporting Github Sponsors, as well as the 'all' command, which generates all of the files that scaffold supports in a single command ([dace835](https://github.com/wessberg/sandhog/commit/dace8359c37c316b977ac5f2d6c834b9f369c13d))



## [1.0.17](https://github.com/wessberg/sandhog/compare/v1.0.16...v1.0.17) (2019-02-09)


### Bug Fixes

* **readme:** fixes FAQ section heading size ([f2ae74c](https://github.com/wessberg/sandhog/commit/f2ae74c00d03887e869c98c9bd58b018dd75527e))



## [1.0.16](https://github.com/wessberg/sandhog/compare/v1.0.15...v1.0.16) (2019-02-08)


### Bug Fixes

* **badge:** fixes an issue where the NPM badge would not be generated ([5e970d9](https://github.com/wessberg/sandhog/commit/5e970d968f0db64c96700655ccde23875b3de765))



## [1.0.15](https://github.com/wessberg/sandhog/compare/v1.0.14...v1.0.15) (2019-02-07)


### Bug Fixes

* **badges:** fixes an issue where the dependencies badge would be wrong for non-scoped packages ([e6b05fe](https://github.com/wessberg/sandhog/commit/e6b05fece0c705e940056c1b1f359c43d7019a29))



## [1.0.14](https://github.com/wessberg/sandhog/compare/v1.0.13...v1.0.14) (2019-02-07)



## [1.0.13](https://github.com/wessberg/sandhog/compare/v1.0.10...v1.0.13) (2019-02-06)


### Bug Fixes

* **chore:** updates dependencies ([b181ad8](https://github.com/wessberg/sandhog/commit/b181ad8111aadec5805a4091d06b571a0a33f060))
* **chore:** updates dependencies ([81bea0a](https://github.com/wessberg/sandhog/commit/81bea0af29049a0bb0102f43414c0a12985a3d20))
* **readme:** removes emojis from headings which was hard to generate relative links to ([5a1f250](https://github.com/wessberg/sandhog/commit/5a1f250f2129779417c28a2a73c2a5ae0cf1f463))



## [1.0.10](https://github.com/wessberg/sandhog/compare/v1.0.9...v1.0.10) (2019-02-05)


### Bug Fixes

* **readme:** fixes an issue with the generation of the Patreon pledger badge ([22a2149](https://github.com/wessberg/sandhog/commit/22a2149b900ac4a77e2a67f0323dabed4c0b384c))



## [1.0.9](https://github.com/wessberg/sandhog/compare/v1.0.8...v1.0.9) (2019-02-04)


### Bug Fixes

* **lint:** fixes lint issues ([8742c98](https://github.com/wessberg/sandhog/commit/8742c98db7fb08bf91955626032fe1e0afc2946f))


### Features

* **core:** major rewrite ([f50d7a5](https://github.com/wessberg/sandhog/commit/f50d7a592e69902931cba65e50fa48522883c117))
* **core:** major rewrite ([f510154](https://github.com/wessberg/sandhog/commit/f510154f3ad328ca1ee140677694e86933e481e8))



## [1.0.8](https://github.com/wessberg/sandhog/compare/v1.0.7...v1.0.8) (2019-01-21)



## [1.0.7](https://github.com/wessberg/sandhog/compare/v1.0.6...v1.0.7) (2019-01-21)



## [1.0.6](https://github.com/wessberg/sandhog/compare/v1.0.5...v1.0.6) (2019-01-21)



## [1.0.5](https://github.com/wessberg/sandhog/compare/v1.0.4...v1.0.5) (2018-12-13)



## [1.0.4](https://github.com/wessberg/sandhog/compare/v1.0.3...v1.0.4) (2018-09-11)



## [1.0.3](https://github.com/wessberg/sandhog/compare/v1.0.2...v1.0.3) (2018-09-11)



## [1.0.2](https://github.com/wessberg/sandhog/compare/v1.0.1...v1.0.2) (2018-09-11)



## [1.0.1](https://github.com/wessberg/sandhog/compare/v1.0.0...v1.0.1) (2018-08-30)



# [1.0.0](https://github.com/wessberg/sandhog/compare/v0.1.0...v1.0.0) (2018-07-02)


### Bug Fixes

* Fixed linting errors ([55a8746](https://github.com/wessberg/sandhog/commit/55a87460787f70c2e7245ce2c5009c01575e4ddb))



# [0.1.0](https://github.com/wessberg/sandhog/compare/v0.0.8...v0.1.0) (2018-07-02)



## [0.0.8](https://github.com/wessberg/sandhog/compare/v0.0.7...v0.0.8) (2018-07-02)



## [0.0.7](https://github.com/wessberg/sandhog/compare/v0.0.6...v0.0.7) (2018-07-02)



## [0.0.6](https://github.com/wessberg/sandhog/compare/v0.0.5...v0.0.6) (2018-06-30)



## [0.0.5](https://github.com/wessberg/sandhog/compare/v0.0.4...v0.0.5) (2018-06-30)



## [0.0.4](https://github.com/wessberg/sandhog/compare/v0.0.3...v0.0.4) (2018-06-30)



## [0.0.3](https://github.com/wessberg/sandhog/compare/v0.0.2...v0.0.3) (2018-06-30)



## [0.0.2](https://github.com/wessberg/sandhog/compare/v0.0.1...v0.0.2) (2018-06-30)



## 0.0.1 (2018-06-30)



