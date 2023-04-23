# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.0.1](https://github.com/nfqde/nfq-react-grid/compare/v3.0.0...v3.0.1) (2023-04-23)


### Bug Fixes

* **Types:** Export config type. ([#70](https://github.com/nfqde/nfq-react-grid/issues/70)) ([c5bfe12](https://github.com/nfqde/nfq-react-grid/commit/c5bfe12b4f48b0acd9da9cf0f4a8cac3620cf75f))

## [3.0.0](https://github.com/nfqde/nfq-react-grid/compare/v2.13.1...v3.0.0) (2023-04-23)


### ⚠ BREAKING CHANGES

* **Rewrite:** Many Properties got renamed for better understanding.
Gutter is now achieved through flex gap property and not padding.
The noGutter prop is now on the row component.

### Features

* **Rewrite:** Complete rewrite of the grid library. ([#67](https://github.com/nfqde/nfq-react-grid/issues/67)) ([e415042](https://github.com/nfqde/nfq-react-grid/commit/e4150423e1f826ed302400cca5713f70a3fc2dec))

### [2.13.1](https://github.com/nfqde/nfq-react-grid/compare/v2.13.0...v2.13.1) (2023-01-26)


### Bug Fixes

* **Col:** Remove flex-box declaration on col element ([#66](https://github.com/nfqde/nfq-react-grid/issues/66)) ([6be88d0](https://github.com/nfqde/nfq-react-grid/commit/6be88d0e769549d51b4476b86d443367328238b7))

## [2.13.0](https://github.com/nfqde/nfq-react-grid/compare/v2.12.1...v2.13.0) (2023-01-24)


### Features

* **getScreenSize:** Export helper function too ([#65](https://github.com/nfqde/nfq-react-grid/issues/65)) ([032cace](https://github.com/nfqde/nfq-react-grid/commit/032cace36cf1091db36cd87a9acdaa79cd342d95))

### [2.12.1](https://github.com/nfqde/nfq-react-grid/compare/v2.11.0...v2.12.1) (2023-01-18)


### Features

* **Sass:** Allow strings and numbers in variables ([#61](https://github.com/nfqde/nfq-react-grid/issues/61)) ([c6a4f67](https://github.com/nfqde/nfq-react-grid/commit/c6a4f67754ca697b55a9e9bb46dee8d36ddef3ad))


### Bug Fixes

* **noWrap:** fix no wrap param if array ([#64](https://github.com/nfqde/nfq-react-grid/issues/64)) ([919bac4](https://github.com/nfqde/nfq-react-grid/commit/919bac47d5623d028df3646ae49bc77881ac6815))

## [2.11.0](https://github.com/nfqde/nfq-react-grid/compare/v2.2.9...v2.11.0) (2022-11-28)


### Features

* **Sass:** Add column styling ([#56](https://github.com/nfqde/nfq-react-grid/issues/56)) ([a78bb6a](https://github.com/nfqde/nfq-react-grid/commit/a78bb6af396927f61b37b54fd05124ec43f4eb58))
* **Sass:** Add configuration for sass lib ([#51](https://github.com/nfqde/nfq-react-grid/issues/51)) ([d047d74](https://github.com/nfqde/nfq-react-grid/commit/d047d741a2c9ad3b5ac677df43ea597a4e6caf42))
* **Sass:** Add container styling ([#54](https://github.com/nfqde/nfq-react-grid/issues/54)) ([58f2c99](https://github.com/nfqde/nfq-react-grid/commit/58f2c998bd1c4a14c623ca8710e218b12612810e))
* **Sass:** Add css and sass variables ([#52](https://github.com/nfqde/nfq-react-grid/issues/52)) ([994744c](https://github.com/nfqde/nfq-react-grid/commit/994744cb38d11b02e44b1ef6bc38a9ebdf1443cf))
* **Sass:** Add row styling ([#55](https://github.com/nfqde/nfq-react-grid/issues/55)) ([dc49766](https://github.com/nfqde/nfq-react-grid/commit/dc4976616665367eac5126dae9a97c2c4f4d3fd0))
* **Sass:** Add sass components ([#59](https://github.com/nfqde/nfq-react-grid/issues/59)) ([f638d24](https://github.com/nfqde/nfq-react-grid/commit/f638d24b39eb19232a13581cab03deda51b2b309))
* **Sass:** Add sass function ([#53](https://github.com/nfqde/nfq-react-grid/issues/53)) ([13f1d4d](https://github.com/nfqde/nfq-react-grid/commit/13f1d4de32a71751740569ada02e4cef728a0754))
* **Sass:** Add spacer styling ([#57](https://github.com/nfqde/nfq-react-grid/issues/57)) ([77e5bd1](https://github.com/nfqde/nfq-react-grid/commit/77e5bd188c4f9a922fb37c05bf6760e4a9c6aa2f))
* **Sass:** Add utility classes for order and display ([#58](https://github.com/nfqde/nfq-react-grid/issues/58)) ([d08e0e9](https://github.com/nfqde/nfq-react-grid/commit/d08e0e9a197f7e7763d5009c9f558f76871e0d61))

### [2.2.9](https://github.com/nfqde/nfq-react-grid/compare/v2.2.8...v2.2.9) (2022-10-31)


### Bug Fixes

* **Aria:** Add aria-hidden to spacer ([#48](https://github.com/nfqde/nfq-react-grid/issues/48)) ([6c9e058](https://github.com/nfqde/nfq-react-grid/commit/6c9e05891103cab43051fedc6de49f5a13e955e6))

### [2.2.8](https://github.com/nfqde/nfq-react-grid/compare/v2.2.7...v2.2.8) (2022-10-28)


### Bug Fixes

* **Deps:** Remove unneeded peer dependency ([#47](https://github.com/nfqde/nfq-react-grid/issues/47)) ([e775a93](https://github.com/nfqde/nfq-react-grid/commit/e775a939061aff32a9a7785ce8072c42e0b8077c))

### [2.2.7](https://github.com/nfqde/nfq-react-grid/compare/v2.2.6...v2.2.7) (2022-10-12)


### Bug Fixes

* **Types:** Fix children types ([#46](https://github.com/nfqde/nfq-react-grid/issues/46)) ([0cdbc9d](https://github.com/nfqde/nfq-react-grid/commit/0cdbc9dbe3dc6b869aceed77143834371f286dba))

### [2.2.6](https://github.com/nfqde/nfq-react-grid/compare/v2.2.5...v2.2.6) (2022-10-10)


### Bug Fixes

* **Types:** fix typing ([#45](https://github.com/nfqde/nfq-react-grid/issues/45)) ([9f8ffef](https://github.com/nfqde/nfq-react-grid/commit/9f8ffefe7f61c826730b431f3c7a892da9b5b38a))

### [2.2.5](https://github.com/nfqde/nfq-react-grid/compare/v2.2.4...v2.2.5) (2022-07-19)


### Bug Fixes

* **Readme:** Fix readme ([#44](https://github.com/nfqde/nfq-react-grid/issues/44)) ([0376b66](https://github.com/nfqde/nfq-react-grid/commit/0376b66abb444756cfc8a85784c8328508bba497))

### [2.2.4](https://github.com/nfqde/nfq-react-grid/compare/v2.2.3...v2.2.4) (2022-07-19)


### Bug Fixes

* **Types:** Fix basespacing type ([#43](https://github.com/nfqde/nfq-react-grid/issues/43)) ([8529056](https://github.com/nfqde/nfq-react-grid/commit/8529056ab62037961b04829d411c14ee04c59ff5))

### [2.2.3](https://github.com/nfqde/nfq-react-grid/compare/v2.2.2...v2.2.3) (2022-07-19)


### Bug Fixes

* **Types:** Add missing type. ([#42](https://github.com/nfqde/nfq-react-grid/issues/42)) ([3126b18](https://github.com/nfqde/nfq-react-grid/commit/3126b18626797eeb0022f731dfcb58c396edd285))

### [2.2.2](https://github.com/nfqde/nfq-react-grid/compare/v2.2.1...v2.2.2) (2022-07-05)


### Bug Fixes

* **Typings:** Fix types ([#41](https://github.com/nfqde/nfq-react-grid/issues/41)) ([996e0b4](https://github.com/nfqde/nfq-react-grid/commit/996e0b45af9992378bdbe3b2f8c6886b84028c4c))

### [2.2.1](https://github.com/nfqde/nfq-react-grid/compare/v2.2.0...v2.2.1) (2022-02-14)


### Bug Fixes

* **Col:** fix max-content ([#39](https://github.com/nfqde/nfq-react-grid/issues/39)) ([a9b4a73](https://github.com/nfqde/nfq-react-grid/commit/a9b4a73cb6d623e4688f499238cc39a86b087afa))

## [2.2.0](https://github.com/nfqde/nfq-react-grid/compare/v2.1.0...v2.2.0) (2022-02-14)


### Features

* **Col:** Add max-content and min-content as size values ([#38](https://github.com/nfqde/nfq-react-grid/issues/38)) ([1fad0ab](https://github.com/nfqde/nfq-react-grid/commit/1fad0ab459b656225f92b11dba6abb430eb6eec8))

## [2.1.0](https://github.com/nfqde/nfq-react-grid/compare/v2.0.3...v2.1.0) (2022-01-31)


### Features

* **Spacer:** Spacer in rem and new default columns ([#37](https://github.com/nfqde/nfq-react-grid/issues/37)) ([4737ab6](https://github.com/nfqde/nfq-react-grid/commit/4737ab66a53c2cfc92c9a89f1869440bc5aafd58))

### [2.0.3](https://github.com/nfqde/nfq-react-grid/compare/v2.0.2...v2.0.3) (2022-01-26)


### Bug Fixes

* **Col:** Fix auto propagation of auto keyword ([#36](https://github.com/nfqde/nfq-react-grid/issues/36)) ([9d5e364](https://github.com/nfqde/nfq-react-grid/commit/9d5e3643c8d7228fb868589c0515301bcc296227))

### [2.0.2](https://github.com/nfqde/nfq-react-grid/compare/v2.0.1...v2.0.2) (2022-01-26)


### Bug Fixes

* **Col:** fix auto size ([#35](https://github.com/nfqde/nfq-react-grid/issues/35)) ([0eaa912](https://github.com/nfqde/nfq-react-grid/commit/0eaa91266ec92400f9b16dbdca93b618788839d4))

### [2.0.1](https://github.com/nfqde/nfq-react-grid/compare/v2.0.0...v2.0.1) (2022-01-04)


### Bug Fixes

* **Hidden:** Add !important to prevent css specifity bugs ([#34](https://github.com/nfqde/nfq-react-grid/issues/34)) ([69c7d49](https://github.com/nfqde/nfq-react-grid/commit/69c7d49f2ef414cfbf6922e404d9e331ea43f197))

## [2.0.0](https://github.com/nfqde/nfq-react-grid/compare/v1.8.0...v2.0.0) (2021-12-03)


### ⚠ BREAKING CHANGES

* **ExtraPadding:** Changed spacer inline prop to isInline according to eslint rules.

### Features

* **ExtraPadding:** Added possibility to add extra padding ([#33](https://github.com/nfqde/nfq-react-grid/issues/33)) ([fe39363](https://github.com/nfqde/nfq-react-grid/commit/fe39363eabc489db2e5bf4964d9f5cd44a02e582))

## [1.8.0](https://github.com/nfqde/nfq-react-grid/compare/v1.7.2...v1.8.0) (2021-11-16)


### Features

* **mediaBetween:** Introduce public media between ([#32](https://github.com/nfqde/nfq-react-grid/issues/32)) ([bf74269](https://github.com/nfqde/nfq-react-grid/commit/bf74269055caf09e819038f87bf2e32c83ded064))

### [1.7.2](https://github.com/nfqde/nfq-react-grid/compare/v1.7.1...v1.7.2) (2021-11-16)


### Bug Fixes

* **Col:** Allow negative offsets. ([#31](https://github.com/nfqde/nfq-react-grid/issues/31)) ([65c4eeb](https://github.com/nfqde/nfq-react-grid/commit/65c4eebf2725bdbc66b307986062082280d2db55))

### [1.7.1](https://github.com/nfqde/nfq-react-grid/compare/v1.7.0...v1.7.1) (2021-11-16)


### Bug Fixes

* **Hidden:** Display none but without extra element. ([#30](https://github.com/nfqde/nfq-react-grid/issues/30)) ([64809ff](https://github.com/nfqde/nfq-react-grid/commit/64809ff28eb4f9ef34f333a6809144b93b1c2da2))

## [1.7.0](https://github.com/nfqde/nfq-react-grid/compare/v1.5.0...v1.7.0) (2021-11-16)


### Features

* **HiddenCss:** Add possibility for hidden and visible to render html. ([#29](https://github.com/nfqde/nfq-react-grid/issues/29)) ([22a9a5f](https://github.com/nfqde/nfq-react-grid/commit/22a9a5fa489c93224638f1fd62fb24f0a3ddf544))
* **ScreenSizeContext:** Set right screen on load ([#28](https://github.com/nfqde/nfq-react-grid/issues/28)) ([0c178f9](https://github.com/nfqde/nfq-react-grid/commit/0c178f9228754cfe54eff15c9dfa9c76e98b491c))

## [1.5.0](https://github.com/nfqde/nfq-react-grid/compare/v1.4.1...v1.5.0) (2021-11-15)


### Features

* **EventListeners:** Allow for eventlisteners on grid elements. ([#27](https://github.com/nfqde/nfq-react-grid/issues/27)) ([92f7a85](https://github.com/nfqde/nfq-react-grid/commit/92f7a8516ee5df64ffe8aad1cc6c7c3043b6a56a))

### [1.4.1](https://github.com/nfqde/nfq-react-grid/compare/v1.4.0...v1.4.1) (2021-09-24)


### Bug Fixes

* **Row:** Fix noWrap behavior ([#26](https://github.com/nfqde/nfq-react-grid/issues/26)) ([c4328a8](https://github.com/nfqde/nfq-react-grid/commit/c4328a8470bd40e8653437de63340ed3bd7d56ce))

## [1.4.0](https://github.com/nfqde/nfq-react-grid/compare/v1.3.2...v1.4.0) (2021-09-23)


### Features

* **Hooks:** Add some handy hooks. ([#25](https://github.com/nfqde/nfq-react-grid/issues/25)) ([6aa20b7](https://github.com/nfqde/nfq-react-grid/commit/6aa20b74d29bd94236b7381056956fc7a5d5c4c9))

### [1.3.2](https://github.com/nfqde/nfq-react-grid/compare/v1.3.1...v1.3.2) (2021-09-22)


### Bug Fixes

* **Rollup:** Add preserveModules ([#24](https://github.com/nfqde/nfq-react-grid/issues/24)) ([80a580e](https://github.com/nfqde/nfq-react-grid/commit/80a580e82437d5122f5fcf65b1faaa0a006bfa82))

### [1.3.1](https://github.com/nfqde/nfq-react-grid/compare/v1.3.0...v1.3.1) (2021-09-22)


### Bug Fixes

* **Rollup:** Perform cleanup and remove browser field. ([#23](https://github.com/nfqde/nfq-react-grid/issues/23)) ([e148722](https://github.com/nfqde/nfq-react-grid/commit/e148722436867fe9ddc425f2951022fb8ff33dd7))

## [1.3.0](https://github.com/nfqde/nfq-react-grid/compare/v1.2.11...v1.3.0) (2021-09-21)


### Features

* **Rollup:** Change to rollup ([#22](https://github.com/nfqde/nfq-react-grid/issues/22)) ([a0f40d4](https://github.com/nfqde/nfq-react-grid/commit/a0f40d48f5df41faa757ed6f991235a6422131be))

### [1.2.11](https://github.com/nfqde/nfq-react-grid/compare/v1.2.10...v1.2.11) (2021-09-21)


### Bug Fixes

* **Babel:** Add styled-components plugin ([#21](https://github.com/nfqde/nfq-react-grid/issues/21)) ([2a7924c](https://github.com/nfqde/nfq-react-grid/commit/2a7924c32f72719a49135c5f3f74beabceed0f03))

### [1.2.10](https://github.com/nfqde/nfq-react-grid/compare/v1.2.8...v1.2.10) (2021-09-21)


### Bug Fixes

* **Package:** Remove peer dependency ([#20](https://github.com/nfqde/nfq-react-grid/issues/20)) ([1627554](https://github.com/nfqde/nfq-react-grid/commit/1627554a2afcf910da13acd86e987b8f1bb0004c))

### [1.2.8](https://github.com/nfqde/nfq-react-grid/compare/v1.2.7...v1.2.8) (2021-09-21)


### Bug Fixes

* **Package:** Fix dependencies ([#19](https://github.com/nfqde/nfq-react-grid/issues/19)) ([976acc4](https://github.com/nfqde/nfq-react-grid/commit/976acc4577c8ba9612c9b48bbd890a8435913a6d))

### [1.2.7](https://github.com/nfqde/nfq-react-grid/compare/v1.2.6...v1.2.7) (2021-09-21)


### Bug Fixes

* **Package:** change styled-components to dependency ([#18](https://github.com/nfqde/nfq-react-grid/issues/18)) ([b1da1d9](https://github.com/nfqde/nfq-react-grid/commit/b1da1d99199ebf80d4b8219af6008322db239b86))

### [1.2.6](https://github.com/nfqde/nfq-react-grid/compare/v1.2.5...v1.2.6) (2021-09-21)


### Bug Fixes

* **Babel:** File extensions ([#17](https://github.com/nfqde/nfq-react-grid/issues/17)) ([3cd6ee0](https://github.com/nfqde/nfq-react-grid/commit/3cd6ee03b46717933f48ee411d124753865da0c1))

### [1.2.5](https://github.com/nfqde/nfq-react-grid/compare/v1.2.4...v1.2.5) (2021-09-21)


### Bug Fixes

* **Babel:** Remove add-module-exports ([#16](https://github.com/nfqde/nfq-react-grid/issues/16)) ([19499bb](https://github.com/nfqde/nfq-react-grid/commit/19499bbd608d7eecf621954d93641b56c46308b9))

### [1.2.4](https://github.com/nfqde/nfq-react-grid/compare/v1.2.3...v1.2.4) (2021-09-21)


### Bug Fixes

* **Package:** Add type module ([#15](https://github.com/nfqde/nfq-react-grid/issues/15)) ([085e74b](https://github.com/nfqde/nfq-react-grid/commit/085e74bdc47824a35bb93901d845426615caa975))

### [1.2.3](https://github.com/nfqde/nfq-react-grid/compare/v1.2.2...v1.2.3) (2021-09-21)


### Bug Fixes

* **Babel:** Remove modules false ([#14](https://github.com/nfqde/nfq-react-grid/issues/14)) ([d80d30c](https://github.com/nfqde/nfq-react-grid/commit/d80d30c6891e998fc9f1355793854c69994f1ee7))

### [1.2.2](https://github.com/nfqde/nfq-react-grid/compare/v1.2.1...v1.2.2) (2021-09-21)


### Bug Fixes

* **Lib:** No silo export ([#13](https://github.com/nfqde/nfq-react-grid/issues/13)) ([3b947b5](https://github.com/nfqde/nfq-react-grid/commit/3b947b566c56df7db7b6a9e2bfb1684f13a8aaef))

### [1.2.1](https://github.com/nfqde/nfq-react-grid/compare/v1.2.0...v1.2.1) (2021-09-21)


### Bug Fixes

* **Babel:** Add modules false ([#12](https://github.com/nfqde/nfq-react-grid/issues/12)) ([5ea3c7f](https://github.com/nfqde/nfq-react-grid/commit/5ea3c7f2339326e6d45735dfb228031474ad093c))

## [1.2.0](https://github.com/nfqde/nfq-react-grid/compare/v1.1.1...v1.2.0) (2021-09-21)


### Features

* **Lib:** use functional components and hooks for better bundle size. ([#11](https://github.com/nfqde/nfq-react-grid/issues/11)) ([24d58b9](https://github.com/nfqde/nfq-react-grid/commit/24d58b9244987a77bd0955b5895bd1371eaf0de4))

### [1.1.1](https://github.com/nfqde/nfq-react-grid/compare/v1.1.0...v1.1.1) (2021-09-06)


### Bug Fixes

* **Config:** Add unneded files to ignores ([#9](https://github.com/nfqde/nfq-react-grid/issues/9)) ([f0c1839](https://github.com/nfqde/nfq-react-grid/commit/f0c1839ddbac842de660d34d73209727be0305d2))

## [1.1.0](https://github.com/nfqde/nfq-react-grid/compare/v1.0.2...v1.1.0) (2021-09-06)


### Features

* **Cypress:** Add Cypress for testing ([#7](https://github.com/nfqde/nfq-react-grid/issues/7)) ([b0f5db3](https://github.com/nfqde/nfq-react-grid/commit/b0f5db32bd8f1ecf60aeffa31f84a8c1128961e9))


### Bug Fixes

* **Debug:** Better threeshaking for debug mode ([#6](https://github.com/nfqde/nfq-react-grid/issues/6)) ([fd185f7](https://github.com/nfqde/nfq-react-grid/commit/fd185f73799c2035552e97e39255d841982e484e))
* **Lib:** Throw if theme is not the right shape ([#3](https://github.com/nfqde/nfq-react-grid/issues/3)) ([6b1ef4b](https://github.com/nfqde/nfq-react-grid/commit/6b1ef4bec5418807b13c5ddc8934be89a88da27a))
* **Row:** Change default direction ([#5](https://github.com/nfqde/nfq-react-grid/issues/5)) ([163770c](https://github.com/nfqde/nfq-react-grid/commit/163770c20fcf9ed2d9e734cd45f24f4cf915369e))
* **ScreenBadge:** Fix missing React import ([#4](https://github.com/nfqde/nfq-react-grid/issues/4)) ([aa4222d](https://github.com/nfqde/nfq-react-grid/commit/aa4222d05850b84d0d148263845a726297b806af))

### [1.0.2](https://github.com/nfqde/nfq-react-grid/compare/v1.0.1...v1.0.2) (2021-09-03)


### Bug Fixes

* **Package:** Change tags. ([#1](https://github.com/nfqde/nfq-react-grid/issues/1)) ([4b0dc61](https://github.com/nfqde/nfq-react-grid/commit/4b0dc61801d508c7ec6a6ce1e0658e8f594dce90))

### 1.0.1 (2021-09-03)
