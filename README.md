<div id="top"></div>

# @nfq/react-grid

<p align="center">
  <a href="https://badge.fury.io/js/%40nfq%2Freact-grid"><img src="https://img.shields.io/npm/v/@nfq/react-grid.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/%40nfq%2Freact-grid"><img src="https://img.shields.io/npm/dm/@nfq/react-grid.svg" alt="npm downloads" /></a>
  <a href="https://bundlephobia.com/result?p=%40nfq/react-grid"><img src="https://img.shields.io/bundlephobia/min/@nfq/react-grid" alt="BundlePhobia size" /></a>
  <a href="https://www.npmjs.com/package/%40nfq%2Freact-grid"><img src="https://img.shields.io/github/issues/nfqde/nfq-react-grid.svg" alt="GitHub issues" /></a>
  <img src="https://img.shields.io/github/contributors/nfqde/nfq-react-grid.svg" alt="Contributors" />
  <a href="https://opensource.org/license/mit/"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
</p>

<p align="center">
  <a href="https://github.com/nfqde/nfq-react-grid/actions/workflows/eslint.yml"><img src="https://github.com/nfqde/nfq-react-grid/actions/workflows/eslint.yml/badge.svg" alt="ESLint" /></a>
  <a href="https://github.com/nfqde/nfq-react-grid/actions/workflows/horusec.yml"><img src="https://github.com/nfqde/nfq-react-grid/actions/workflows/horusec.yml/badge.svg" alt="Horusec" /></a>
  <a href="https://github.com/nfqde/nfq-react-grid/actions/workflows/cypress.yml"><img src="https://github.com/nfqde/nfq-react-grid/actions/workflows/cypress.yml/badge.svg" alt="Cypress Tests" /></a>
</p>

---
> [!WARNING]
>
> This project switched over to @emotion/styled. As Styled-Components is in "Maintainance Mode".  
> If you use styled-components you can use the version `<= 6.0.0` of this package.

---

## Table of Contents

- [@nfq/react-grid](#nfqreact-grid)
  - [Table of Contents](#table-of-contents)
  - [About the project](#about-the-project)
    - [🚀 Features](#-features)
    - [📦 Installation](#-installation)
    - [📦 PeerDependencies](#-peerdependencies)
  - [Configuration](#configuration)
    - [`globalGridCss` (Required)](#globalgridcss-required)
    - [Extend Module Declarations (For typescript autocompletion for your custom breakpoints)](#extend-module-declarations-for-typescript-autocompletion-for-your-custom-breakpoints)
  - [Usage](#usage)
    - [Responsive Columns](#responsive-columns)
    - [Offset usage](#offset-usage)
    - [Order usage](#order-usage)
    - [Alignment](#alignment)
    - [Changing directions](#changing-directions)
    - [Spacer usage](#spacer-usage)
    - [Skeleton usage](#skeleton-usage)
    - [Usage of Hidden and Visible](#usage-of-hidden-and-visible)
    - [Usage of ResponsiveText](#usage-of-responsivetext)
  - [Props](#props)
    - [Container](#container)
    - [Row](#row)
    - [Col](#col)
    - [Spacer](#spacer)
    - [Skeleton](#skeleton)
    - [Hidden](#hidden)
    - [Visible](#visible)
    - [ResponsiveText](#responsivetext)
  - [Types](#types)
    - [Breakpoints](#breakpoints)
    - [FlexAlign](#flexalign)
    - [AlignObject](#alignobject)
    - [FlexDirection](#flexdirection)
    - [DirectionObject](#directionobject)
    - [FlexGap](#flexgap)
    - [GapObject](#gapobject)
    - [FlexJustify](#flexjustify)
    - [JustifyObject](#justifyobject)
    - [OrderObject](#orderobject)
    - [OffsetObject](#offsetobject)
    - [Padding](#padding)
    - [PaddingObject](#paddingobject)
    - [StringSizes](#stringsizes)
    - [SpacerObject](#spacerobject)
    - [Height](#height)
    - [Width](#width)
  - [Utilities](#utilities)
    - [media](#media)
    - [mediaBetween](#mediabetween)
    - [spacing](#spacing)
    - [ScreenSizeProvider](#screensizeprovider)
  - [Hooks](#hooks)
    - [useScreenSize](#usescreensize)
  - [Debugging](#debugging)
  - [Custom config](#custom-config)
    - [Configuration Object](#configuration-object)
    - [baseSpacing](#basespacing)
    - [breakpoints](#breakpoints-1)
    - [columnGap](#columngap)
    - [columns](#columns)
    - [container](#container-1)
    - [containerPadding](#containerpadding)
    - [debug](#debug)
    - [skeleton](#skeleton-1)
    - [skeletonDefault](#skeletondefault)
  - [Contributions](#contributions)
  - [License](#license)
  - [Questions](#questions)

---

## About the project

A powerful, theme-free, responsive grid system for React powered by `@emotion/react`.  
Built on modern CSS variables, mobile-first principles, and full TypeScript support.

Inspired by [react-awesome-styled-grid](https://github.com/santosfrancisco/react-awesome-styled-grid), re-engineered for real-world production use.

### 🚀 Features

- ⚛️ No dependency on theme providers – works out of the box with CSS custom properties.
- 🧱 Responsive grid layout: `Container`, `Row`, `Col`, `Spacer`
- 🧩 Extra helpers: `Skeleton`, `Hidden`, `Visible`, `ResponsiveText`
- 🧠 Hooks and utilities: `useScreenSize`, `spacing`, `media()`
- 🔍 Built-in debug layer via `Ctrl + D`
- 🎨 Fully configurable skeleton animations and design tokens
- 🧪 Test-friendly via `testId` props


### 📦 Installation

To install the package run

```sh
npm install @nfq/react-grid @emotion/react @emotion/styled
# or
yarn add @nfq/react-grid @emotion/react @emotion/styled
# or
pnpm add @nfq/react-grid @emotion/react @emotion/styled
```

### 📦 PeerDependencies

The following PeerDependencies are needed so the component does work:

- `@emotion/react >= 10`
- `@emotion/styled >= 10`
- `react >= 18`
- `react-dom >= 18`

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Configuration

Define your grid configuration using `createConfig` somewhere in your app. This is a required step to use the grid system. Full documentation can be found [here.](#custom-config)

```ts
// grid.config.ts
import { createConfig } from '@nfq/react-grid';

export const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const; // Add your Breakpoints and its sorting smallest to biggest.
export const { configType, globalCss: globalGridCss } = createConfig(breakpoints, {
  baseSpacing: 0.4,
  breakpoints: {}, // ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] are defaulted and don't need to be defined. If your breakpoints are different you can define them here.
  container: {
    xs: 'fluid',
    sm: 'fluid',
    md: 'fluid',
    lg: 'fluid',
    xl: 1140,
    xxl: 1140
  } // this is the only mandatory property. It defines the container width for every breakpoint. You can also set it to 'fluid'.
});
```

### `globalGridCss` (Required)

You must inject `globalGridCss` once at app level to enable the grid’s base variables and behavior:

```tsx
/** globals.ts */
import { css, Global } from '@emotion/react';
import { globalCss, globalGridCss } from './grid.config';

export const globals = (
  <Global
    styles={css`
      ${globalCss}
      ${globalGridCss}
      html {
        font-size: 10px;
      }
    `}
  />
);
```

### Extend Module Declarations (For typescript autocompletion for your custom breakpoints)

```ts
// grid.d.ts
import '@nfq/react-grid';
import {breakpoints, configType} from './grid.config';

declare module '@nfq/react-grid' {
  export interface UserConfig {
    Breakpoints: typeof breakpoints;
    Config: typeof configType;
  }
}
```

## Usage

```ts
import {
    Col,
    Container,
    Hidden,
    ResponsiveText,
    Row,
    ScreenBadge,
    ScreenSizeContext,
    ScreenSizeProvider,
    Skeleton,
    Spacer,
    Visible,
    createConfig,
    getScreenSize,
    lighten,
    media,
    mediaBetween,
    spacing,
    useScreenSize
} from '@nfq/react-grid';
```

### Responsive Columns

```tsx
<Container>
    <Row>
        <Col xs={2} sm={6} md={2} lg={6}>Col 1</Col>
        <Col xs={2} sm={2} md={6} lg={6}>Col 2</Col>
    </Row>
    <Row>
        <Col xs={1} sm={4} md={3} lg={4}>Col 3</Col>
        <Col xs={3} sm={4} md={5} lg={8}>Col 4</Col>
    </Row>
</Container>
```

The screen params define the Col size in its respective screen class. If no size is defined the col will be auto width. The mobile first nature defines also the definitions used for undefined sizes. (in the above example xl and xxl will use the same value as lg).

### Offset usage

```tsx
<Container>
    <Row>
        <Col offset={2}>Col 1</Col>
    </Row>
    <Row>
        <Col offset={{xs:3, sm:7, lg:11}}>Col 2</Col>
    </Row>
</Container>
```

An offset with an single number defines the offset for all screens. Because all screen sizes can have an different number of columns the offset will get calculated on basis of the smallest defined breakpoint. So if you have 4 columns on this breakpoint and an offset of 2 all screensizes will render the column with 50% width.

If you define an object you can set the offset for every screen size. And so all offsets will calculated for the specific screen sizes. So if you want an offset of one column for all screens you can define an offset of
your smallest breakpoint as `{[breakpoint]: 1}` because we render mobile first all other screens will calculate the offset with 1 column and use its own max columns.

### Order usage

```tsx
<Container>
    <Row order={{xs: 1, lg: 2}}>
        <Col order={2}>Col 1</Col>
        <Col order={1}>Col 2</Col>
    </Row>
    <Row order={{xs: 1, lg: 2}}>
        <Col order={{xs: 1, lg: 2}}>Col 1</Col>
        <Col order={{xs: 2, lg: 1}}>Col 2</Col>
    </Row>
</Container>
```

The order can be defined for Cols and Rows and orders the components in its parent container. Components without an order will be rendered as if they had an order of 0. If you define an object you can define an order for every screen in seperate

### Alignment

```tsx
<Container>
    <Row align="center" justify="center">
        <Col align="flex-end" justify="space-between">Col 1</Col>
        <Col align="flex-end" justify="space-between">Col 2</Col>
    </Row>
    <Row align={{xs: 'flex-start', lg: 'center'}} justify={{xs: 'flex-start', lg: 'center'}}>
        <Col align={{xs: 'flex-start', lg: 'center'}} justify={{xs: 'space-between', lg: 'space-around'}}>Col 1</Col>
        <Col align={{xs: 'flex-start', lg: 'center'}} justify={{xs: 'space-between', lg: 'space-around'}}>Col 2</Col>
    </Row>
</Container>
```

The alignment of rows and columns can be set with the align and justify props. Both use the flex css api so all values valid for thoose are also valid here. If you define an object you can set different alignments for different screens.

### Changing directions

```tsx
<Container>
    <Row direction={{xs: 'column', lg: 'row'}} isReverse>
        <Col isReverse>Col 1</Col>
        <Col isReverse={['xs', 'md']}>Col 2</Col>
    </Row>
    <Row isReverse={['xs', 'md']}>
        <Col direction="row" isReverse>Col 1</Col>
        <Col direction={{xs: 'column', lg: 'row'}} isReverse={['xs', 'md']}>Col 2</Col>
    </Row>
</Container>
```

You can change the directions of rows and columns. Rows can be reversed if needed. If you give an array you can define in which screen sizes the row should be reversed.
Columns have also and direction prop. Its usefull if you want to render column children layed out as row. You can also define an object to change direction for different screen sizes.

### Spacer usage

```tsx
<Container>
    <Row isReverse>
        <Col>Col 1</Col>
        <Spacer x={2}>
        <Col>Col 2</Col>
    </Row>
    <Row isReverse={['xs', 'md']}>
        <Col direction="row" isReverse>Col 1</Col>
        <Spacer maxX={2} maxY={2} x={{xs: 0, lg: 2}} y={{xs: 2, lg: 0}}>
        <Col direction={{xs: 'column', lg: 'row'}} isReverse={['xs', 'md']}>Col 2</Col>
    </Row>
</Container>
```

The Spacer component helps to set spacings like designers do and has some logic for dynamic flex spacings and so on. Its the best way to define spacings in an grid conform matter.

### Skeleton usage

```tsx
<Container>
    <Row>
        <Col>
            <h1><Skeleton isLoading>This is text</Skeleton></h1>
        </Col>
        <Col>
            <p><Skeleton group="one" isLoading>This is text</Skeleton></p>
        </Col>
        <Col>
            <p><Skeleton group="one" isCircle isLoading>This is text</Skeleton></p>
        </Col>
    </Row>
</Container>
```

The Skeleton component is an easy way to render a skeleton of an component. It can be used to render an skeleton of an component while its loading. It renders its children only if isLoading is false. If it is true it renders an skeleton loader. The skeleton loader can be configured with the config object. (See [Custom config](#custom-config))
The Skeleton has some usefull properties to define its appearance and its behavior. You can group Skeletons to have an slightly delayed loading effect between different skeletons of the same group. You can also define if the skeleton should be a circle or not. The skeleton will then render an circle instead of a rectangle.

> [!NOTE]
>
> For the skeletons to work you need to wrap your app in the ScreenSizeProvider.

### Usage of Hidden and Visible

```tsx
<Container>
    <Visible xs sm md>
        <Row>
            <Col>Col 1</Col>
            <Col>Col 2</Col>
        </Row>
    </Visible>
    <Hidden xs sm md>
        <Row>
            <Col>Col 1</Col>
            <Col>Col 2</Col>
        </Row>
    </Hidden>
</Container>
```

Sometimes you want to hide something on specific screens. Or show something only on some screens. Thats the usecase for Visible and Hidden.
Both can get screensizes as props. The screen sizes define when the components apply their logic for hiding and showing.

### Usage of ResponsiveText

```tsx
<Container>
    <Row>
        <Col>
            <ResponsiveText
                xs="Extra Small Screen Text"
                sm="Small Screen Text"
                md="Medium Screen Text"
                lg="Large Screen Text"
                xl="Extra Large Screen Text"
                xxl="Extra Extra Large Screen Text"
            />
            <ResponsiveText
                xs="Extra Small Screen Text"
                lg="Large Screen Text"
                xxl="Extra Extra Large Screen Text"
            />
        </Col>
    </Row>
</Container>
```

Sometimes you need to render different text snippets depending on your screensize. Thats an usecase for ResponsiveText.  
This component can get an text for every screensize and renders it accordingly. As it works also mobile first you need to only set the smallest defined breakpoints and the other screensizes will use the same text as this breakpoint or the text thats used for the next smallest given size.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Props

### Container

| Prop          | type                                       | required | Description                                                                                                                                                                                     |
| ------------- | ------------------------------------------ | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| as            | string (ElementType)                       |          | Sets the html element type of the container. If you overwrite its styles with styled() it has to be forwardedAs.                                                                                |
| className     | string                                     |          | Classname property to overwrite styles with styled(Container)                                                                                                                                   |
| hasNoPadding  | [Breakpoints[]](#breakpoints)\|boolean     |          | Determines if the container has an padding. (Should always be set if the container has an container as parent already). It takes an array of[`Breakpoints`](#breakpoints) or a `boolean` value. |
| isFluid       | [Breakpoints[]](#breakpoints)\|boolean     |          | Makes the container fluid. (Should always be set if the container has an container as parent already). It takes an array of[`Breakpoints`](#breakpoints) or a `boolean` value.                  |
| maxWidth      | [SizesObject](#sizesobject)\|number        |          | Sets the max width of the container. It takes a[`SizesObject`](#sizesobject) or a `number` value. Its intended for usage with isFluid.                                                          |
| testId        | string                                     |          | TestId for cypress testing. (If applicable.) Can than be selected with data-cy="testId"                                                                                                         |
| onClick       | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the user clicks the element with the mouse.                                                                                                                |
| onContextMenu | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the user right-clicks the element with the mouse.                                                                                                          |
| onDoubleClick | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the user double-clicks the element with the mouse.                                                                                                         |
| onDrag        | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the user starts dragging the element with the mouse.                                                                                                       |
| onDragEnd     | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the user stops dragging the element with the mouse.                                                                                                        |
| onDragEnter   | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the user drags another element over this element.                                                                                                          |
| onDragLeave   | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the user stops dragging another element over this element.                                                                                                 |
| onDragOver    | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the user is dragging another element over this element.                                                                                                    |
| onDrop        | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the user is dropping another element on this element.                                                                                                      |
| onMouseDown   | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the user presses a mouse button over the element.                                                                                                          |
| onMouseEnter  | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the mouse cursor enters the element.                                                                                                                       |
| onMouseLeave  | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the mouse cursor leaves the element.                                                                                                                       |
| onMouseMove   | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the mouse cursor moves over the element.                                                                                                                   |
| onMouseOut    | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the mouse cursor moves out of the element.                                                                                                                 |
| onMouseOver   | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the mouse cursor moves over the element.                                                                                                                   |
| onMouseUp     | (event: MouseEvent\<HTMLElement\>) => void |          | A function that will be invoked when the user releases a mouse button over the element.                                                                                                         |
| onScroll      | (event: UIEvent\<HTMLElement\>) => void    |          | A function that will be invoked when the user scrolls inside this element.                                                                                                                      |

### Row

| Prop          | type                                                                 | required | Description                                                                                                                                                                                              |
| ------------- | -------------------------------------------------------------------- | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| align         | [AlignObject](#alignobject)\|[FlexAlign](#flexalign)                 |          | Defines the content alignment of the row. It takes a[`AlignObject`](#alignobject) or a [`FlexAlign`](#flexalign) type value. Its direction is dependent on the `direction` prop.                         |
| as            | string (ElementType)                                                 |          | Sets the html element type of the row. If you overwrite its styles with styled() it has to be forwardedAs.                                                                                               |
| className     | string                                                               |          | Classname property to overwrite styles with styled(Row)                                                                                                                                                  |
| direction     | [DirectionObject](#directionobject)\|[FlexDirection](#flexdirection) |          | Sets the direction the row children should render ('row' or 'column'). It takes a[`DirectionObject`](#directionobject) or a [`FlexDirection`](#flexdirection) type value.                                |
| hasNoGap      | [FlexGap](#flexgap)\|[GapObject](#gapobject)                         |          | Removes the gap between columns in the grid. Can be also no-column and no-row which deactivates the gap for either direction. It takes a[`FlexGap`](#flexgap) or a [`GapObject`](#gapobject) type value. |
| hasNoWrap     | [Breakpoints[]](#breakpoints)\|boolean                               |          | Defines if the row will wrap or not. It takes an array of[`Breakpoints`](#breakpoints) or a `boolean` value.                                                                                             |
| isReverse     | [Breakpoints[]](#breakpoints)\|boolean                               |          | Reverses the direction of the row. It takes an array of[`Breakpoints`](#breakpoints) or a `boolean` value.                                                                                               |
| justify       | [FlexJustify](#flexjustify)\|[JustifyObject](#justifyobject)         |          | Defines the content justification of the row. It takes a[`FlexJustify`](#flexjustify) or a [`JustifyObject`](#justifyobject) type value. Its direction is dependent on the `direction` prop.             |
| order         | [OrderObject](#orderobject)\|number                                  |          | Sets the order this row should be in. It takes an[`OrderObject`](#orderobject) or a `number` value.                                                                                                      |
| testId        | string                                                               |          | TestId for cypress testing. (If applicable.) Can than be selected with data-cy="testId"                                                                                                                  |
| onClick       | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user clicks the element with the mouse.                                                                                                                         |
| onContextMenu | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user right-clicks the element with the mouse.                                                                                                                   |
| onDoubleClick | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user double-clicks the element with the mouse.                                                                                                                  |
| onDrag        | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user starts dragging the element with the mouse.                                                                                                                |
| onDragEnd     | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user stops dragging the element with the mouse.                                                                                                                 |
| onDragEnter   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user drags another element over this element.                                                                                                                   |
| onDragLeave   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user stops dragging another element over this element.                                                                                                          |
| onDragOver    | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user is dragging another element over this element.                                                                                                             |
| onDrop        | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user is dropping another element on this element.                                                                                                               |
| onMouseDown   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user presses a mouse button over the element.                                                                                                                   |
| onMouseEnter  | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor enters the element.                                                                                                                                |
| onMouseLeave  | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor leaves the element.                                                                                                                                |
| onMouseMove   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor moves over the element.                                                                                                                            |
| onMouseOut    | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor moves out of the element.                                                                                                                          |
| onMouseOver   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor moves over the element.                                                                                                                            |
| onMouseUp     | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user releases a mouse button over the element.                                                                                                                  |
| onScroll      | (event: UIEvent\<HTMLElement\>) => void                              |          | A function that will be invoked when the user scrolls inside this element.                                                                                                                               |

### Col

| Prop                     | type                                                                 | required | Description                                                                                                                                                                                     |
| ------------------------ | -------------------------------------------------------------------- | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| align                    | [AlignObject](#alignobject)\|[FlexAlign](#flexalign)                 |          | Defines the content alignment of the column. It takes a[`AlignObject`](#alignobject) or a [`FlexAlign`](#flexalign) type value. Its direction is dependent on the `direction` prop.             |
| as                       | String (ElementType)                                                 |          | Sets the html element type of the column. If you overwrite its styles with styled() it has to be forwardedAs.                                                                                   |
| className                | string                                                               |          | Classname property to overwrite styles with styled(Col).                                                                                                                                        |
| direction                | [DirectionObject](#directionobject)\|[FlexDirection](#flexdirection) |          | Sets the direction the column children should render ('row' or 'column'). It takes a[`DirectionObject`](#directionobject) or a [`FlexDirection`](#flexdirection) type value.                    |
| isReverse                | [Breakpoints[]](#breakpoints)\|boolean                               |          | Reverses the direction of the column. It takes an array of[`Breakpoints`](#breakpoints) or a `boolean` value.                                                                                   |
| justify                  | [FlexJustify](#flexjustify)\|[JustifyObject](#justifyobject)         |          | Defines the content justification of the column. It takes a[`FlexJustify`](#flexjustify) or a [`JustifyObject`](#justifyobject) type value. Its direction is dependent on the `direction` prop. |
| offset                   | [OffsetObject](#offsetobject)\|number                                |          | Sets the number of columns this column should offset to the left. It takes an[`OffsetObject`](#offsetobject) or a `number` value.                                                               |
| order                    | [OrderObject](#orderobject)\|number                                  |          | Sets the order this column should be in. It takes an[`OrderObject`](#orderobject) or a `number` value.                                                                                          |
| padding                  | [Padding](#padding)\|[PaddingObject](#paddingobject)                 |          | Sets the padding added to both sides of the column. It takes a[`Padding`](#padding) or a [`PaddingObject`](#paddingobject) type value.                                                          |
| paddingLeft              | [Padding](#padding)\|[PaddingObject](#paddingobject)                 |          | Sets the padding added to the left side of the column (Gets overwritten by padding). It takes a[`Padding`](#padding) or a [`PaddingObject`](#paddingobject) type value.                         |
| paddingRight             | [Padding](#padding)\|[PaddingObject](#paddingobject)                 |          | Sets the padding added to the right side of the column (Gets overwritten by padding). It takes a[`Padding`](#padding) or a [`PaddingObject`](#paddingobject) type value.                        |
| Your defined Breakpoints | number\|[StringSizes](#stringsizes)                                  |          | Sets the number of columns the col takes in width on your defined screensizes. (Can also be auto, max-content, min-content).                                                                    |
| testId                   | string                                                               |          | TestId for cypress testing. (If applicable.) Can than be selected with data-cy="testId"                                                                                                         |
| onClick                  | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user clicks the element with the mouse.                                                                                                                |
| onContextMenu            | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user right-clicks the element with the mouse.                                                                                                          |
| onDoubleClick            | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user double-clicks the element with the mouse.                                                                                                         |
| onDrag                   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user starts dragging the element with the mouse.                                                                                                       |
| onDragEnd                | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user stops dragging the element with the mouse.                                                                                                        |
| onDragEnter              | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user drags another element over this element.                                                                                                          |
| onDragLeave              | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user stops dragging another element over this element.                                                                                                 |
| onDragOver               | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user is dragging another element over this element.                                                                                                    |
| onDrop                   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user is dropping another element on this element.                                                                                                      |
| onMouseDown              | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user presses a mouse button over the element.                                                                                                          |
| onMouseEnter             | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor enters the element.                                                                                                                       |
| onMouseLeave             | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor leaves the element.                                                                                                                       |
| onMouseMove              | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor moves over the element.                                                                                                                   |
| onMouseOut               | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor moves out of the element.                                                                                                                 |
| onMouseOver              | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor moves over the element.                                                                                                                   |
| onMouseUp                | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user releases a mouse button over the element.                                                                                                         |
| onScroll                 | (event: UIEvent\<HTMLElement\>) => void                              |          | A function that will be invoked when the user scrolls inside this element.                                                                                                                      |

### Spacer

| Prop            | type                                   | required | Description                                                                                                                                                                                                                                                                                                                                                                                |
| --------------- | -------------------------------------- | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| isInline        | [Breakpoints[]](#breakpoints)\|boolean |          | Whether the spacer should behave like an inline element. If true, the spacer will behave like a regular inline element and not create a new line. If false, the spacer will behave like a block element and create a new line. It takes an array of[`Breakpoints`](#breakpoints) or a `boolean` value.                                                                                     |
| isNotStretching | [Breakpoints[]](#breakpoints)\|boolean |          | Whether the spacer should not stretch. If true, the spacer will not stretch to fill its container if its an flex container. If false, the spacer will stretch to fill its container. It takes an array of[`Breakpoints`](#breakpoints) or a `boolean` value.                                                                                                                               |
| maxX            | [SpacerObject](#spacerobject)\|number  |          | The maximum horizontal spacing size in a flex container. This is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the maximum horizontal spacing value. It takes an [`SpacerObject`](#spacerobject) or a `number` value.                                                                                                                     |
| maxY            | [SpacerObject](#spacerobject)\|number  |          | The maximum vertical spacing size in a flex container. This is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the maximum vertical spacing value. It takes an [`SpacerObject`](#spacerobject) or a `number` value.                                                                                                                         |
| testId          | string                                 |          | TestId for cypress testing. (If applicable.) Can than be selected with data-cy="testId"                                                                                                                                                                                                                                                                                                    |
| x               | [SpacerObject](#spacerobject)\|number  |          | The horizontal spacing size. In a flex container, this defines the base horizontal spacing value and is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the horizontal spacing value. In a non-flex container, this defines the actual horizontal spacing value in pixels. It takes an [`SpacerObject`](#spacerobject) or a `number` value. |
| y               | [SpacerObject](#spacerobject)\|number  |          | The vertical spacing size. In a flex container, this defines the base vertical spacing value and is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the vertical spacing value. In a non-flex container, this defines the actual vertical spacing value in pixels. It takes an [`SpacerObject`](#spacerobject) or a `number` value.         |

### Skeleton

| Prop          | type                      | required | Description                                                                             |
| ------------- | ------------------------- | :------: | --------------------------------------------------------------------------------------- |
| isCircle      | Boolean                   |          | Set to true to set the border-radius to 50% to get an circular shape.                   |
| className     | String                    |          | To override the current styles the Skeleton does not have options for.                  |
| count         | Number                    |          | Defines the number of skeleton lines the component should render                        |
| group         | String                    |          | To apply the delay on your skeleton use this property to add it to an delay group       |
| height        | [Height](#height)\|Number |          | Sets the height of the skeleton.                                                        |
| isLoading     | Boolean                   |          | Set to true to hide the child only on screen size xxl.                                  |
| testId        | String                    |          | TestId for cypress testing. (If applicable.) Can than be selected with data-cy="testId" |
| width         | [Width](#width)\|Number   |          | Sets the width of the sceleton                                                          |

### Hidden

| Prop                     | type    | required | Description                                                       |
| ------------------------ | ------- | :------: | ----------------------------------------------------------------- |
| Your defined Breakpoints | Boolean |          | Set to true to hide the child only on the defined screen size     |
| isLoadingHtml            | Boolean |          | Set to true to render the HTML even when the component is hidden. |

### Visible

| Prop                     | type    | required | Description                                                       |
| ------------------------ | ------- | :------: | ----------------------------------------------------------------- |
| Your defined Breakpoints | Boolean |          | Set to true to show the child only on the defined screen size.    |
| isLoadingHtml            | Boolean |          | Set to true to render the HTML even when the component is hidden. |

### ResponsiveText

| Prop                     | type   | required                                          | Description                                            |
| ------------------------ | ------ | :-----------------------------------------------: | ------------------------------------------------------ |
| Your defined Breakpoints | String | :white_check_mark: (only the smallest breakpoint) | Shows the given text on the appropreate screen size.   |

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Types

### Breakpoints

Your breakpoints are defined in the config under the key `breakpoints`. This is the default.

```ts
type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
```

### FlexAlign

```ts
type FlexAlign = 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'inherit' | 'initial' | 'stretch' | 'unset';
```

### AlignObject

```ts
interface AlignObject {
    xs?: FlexAlign;
    sm?: FlexAlign;
    md?: FlexAlign;
    lg?: FlexAlign;
    xl?: FlexAlign;
    xxl?: FlexAlign;
}
```

### FlexDirection

```ts
type FlexDirection = 'column' | 'row';
```

### DirectionObject

```ts
interface DirectionObject {
    xs?: FlexDirection;
    sm?: FlexDirection;
    md?: FlexDirection;
    lg?: FlexDirection;
    xl?: FlexDirection;
    xxl?: FlexDirection;
}
```

### FlexGap

```ts
type FlexGap = boolean | 'no-column' | 'no-row';
```

### GapObject

```ts
interface GapObject {
    xs?: FlexGap;
    sm?: FlexGap;
    md?: FlexGap;
    lg?: FlexGap;
    xl?: FlexGap;
    xxl?: FlexGap;
}
```

### FlexJustify

```ts
type FlexJustify = 'center' | 'flex-end' | 'flex-start' | 'inherit' | 'initial' | 'space-around' | 'space-between' | 'space-evenly' | 'unset';
```

### JustifyObject

```ts
interface JustifyObject {
    xs?: FlexJustify;
    sm?: FlexJustify;
    md?: FlexJustify;
    lg?: FlexJustify;
    xl?: FlexJustify;
    xxl?: FlexJustify;
}
```

### OrderObject

```ts
interface OrderObject {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}
```

### OffsetObject

```ts
interface OffsetObject {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}
```

### Padding

```ts
type PaddingExt = 'em' | 'px' | 'rem' | 'vh' | 'vw';
type Padding = `${number}${PaddingExt}`;
```

### PaddingObject

```ts
interface PaddingObject {
    xs?: Padding;
    sm?: Padding;
    md?: Padding;
    lg?: Padding;
    xl?: Padding;
    xxl?: Padding;
}
```

### StringSizes

```ts
type StringSizes = 'auto' | 'max-content' | 'min-content';
```

### SpacerObject

```ts
interface SpacerObject {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}
```

### Height

```ts
type HeightExt = 'em' | 'px' | 'rem' | 'vh' | 'vw' | '%';
type Height = `${number}${HeightExt}`;
```

### Width

```ts
type WidthExt = 'em' | 'px' | 'rem' | 'vh' | 'vw' | '%';
type Width = `${number}${WidthExt}`;
```

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Utilities

### media

```ts
const DemoComponent = styled.div`
    ${media('xs')} {
        padding-top: 2rem;
    }
`;
```

Creates a CSS media query using the given breakpoint and styled-components theme.

### mediaBetween

```ts
const DemoComponent = styled.div`
    ${mediaBetween('xs', 'md')} {
        padding-top: 2rem;
    }
`;
```

The same as media but it creates an media query between two breakpoints.

### spacing

```ts
const DemoComponent = styled.div`
    padding: ${spacing(2)}; /* Yields 2 * baseSpacing */
`;
```

Generates a CSS value for a given spacing value, based on the current grid configuration in the theme.

This function uses the base spacing value from the grid configuration to convert the input `space` value to rem. The base spacing value is defined in baseSpacing key of your configuration object, and represents the base spacing unit for the grid system.

### ScreenSizeProvider

```ts
class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <ScreenSizeProvider>
                    <AppPage />
                </ScreenSizeProvider>
            </ThemeProvider>
        )
    }
}
```

A component that provides the current screen size to its children via context.
Its also needed to for the Skeleton component to work. It has to be used in the root of your app.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Hooks

### useScreenSize

```ts
const DemoComponent = () => {
    const screenSize = useScreenSize();
}
```

The useScreenSize hook gives the actual breakpoint defined in your config as string back. (xs, sm, md, lg, xl or xxl)
The ScreenSizeProvider has to be used in the root of your app for this hook to work.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Debugging

For debugging there are two helpfull things. First you can see the current breakpoint anytime if you use the ScreenBadge component.

```ts
class App extends Component {
    render() {
        return (
            <div>
                <ScreenSizeProvider>
                    <AppPage />
                    <ScreenBadge>
                </ScreenSizeProvider>
            </div>
        )
    }
}
```

This component renders always on top in the lower right corner and shows the screen class your in currently.

Also if you want to see your grid you can toggle debug mode with this keybord shortcut.

Windows: Strg + D

Mac Os: Ctrl + D

This Shortcut only works if your build is in development mode. On production builds this feature is deactivated.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Custom config

There are many options you can define for the Grid. To give you an overview and show the actual defaults here the complete object:

```ts
const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
createConfig(breakpoints, {
    baseSpacing: 0.5,
    breakpoints: {
        xs: 0,
        sm: 576,
        md: 769,
        lg: 992,
        xl: 1200,
        xxl: 1600
    },
    columnGap: {
        xs: 20,
        sm: 20,
        md: 20,
        xl: 20,
        lg: 20,
        xxl: 20
    },
    columns: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12
    },
    container: {
        xs: 'fluid',
        sm: 'fluid',
        md: 'fluid',
        lg: 1440,
        xl: 1440,
        xxl: 1440
    },
    containerPadding: {
        xs: 10,
        sm: 10,
        md: 10,
        lg: 10,
        xl: 10,
        xxl: 10
    },
    debug: {
        col: {
            background: '#9a67cb',
            outline: '#ffffff',
            padding: '#c2cf8a'
        },
        container: {
            background: '#5901ad40',
            outline: '#ffffff',
            padding: '#c2cf8a'
        },
        row: {
            background: '#5901ad40',
            outline: '#ffffff',
            padding: '#c2cf8a'
        },
        spacer: {
            background: '#f9cc9d',
            outline: '#ffffff',
            padding: '#c2cf8a'
        }
    },
    skeleton: {
        dark: {
            animation: {
                delay: 0.02,
                direction: 'ltr',
                duration: 1.8
            },
            borderRadius: 0.4,
            colors: {
                base: 'rgba(0, 0, 102, 0.3)',
                baseHighlight: 'rgba(0, 0, 102, 0)',
                highlight: 'rgba(0, 0, 102, 0.3)'
            }
        },
        light: {
            animation: {
                delay: 0.02,
                direction: 'ltr',
                duration: 1.8
            },
            borderRadius: 0.4,
            colors: {
                base: 'rgba(255, 255, 255, 0.3)',
                baseHighlight: 'rgba(0, 0, 102, 0)',
                highlight: 'rgba(0, 0, 102, 0.3)'
            }
        }
    },
    skeletonDefault: 'dark'
};
```

### Configuration Object

If you dont define one or more of the screen sizes the defaults will get used for these.

### baseSpacing

Defines the spacing factor to use for the spacer component. Its defined in rem. The default is 0.5 rem.

### breakpoints

Defines the breakpoint values. For the different screen sizes in px. (If you use default breakpoints its completely optional. Should you define breakpoints that are not in the defaults this becomes madatory.)

### columnGap

This defines the width of the actual gap between each column.

### columns

Defines the number of columns for each screen size.

### container

The container sizes for the different screens. If you use fluid the container will be 100% width. (This option is required for all your defined breakpoints.)

### containerPadding

Defines the outer padding of the container.

### debug

Defines the colors used for debug mode. You can define them for containers, rows, columns and spacers. Columns have also an padding color to show you the gutter gap.

### skeleton

This defines the behavior and styling of the skeleton component. Its possible to define custom variants. The default variants are an dark and light variant. You can define your own variants and use them in the skeleton component. If you change the default variants you have to define a default variant.

### skeletonDefault

Defines the default variant for the skeleton component.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Contributions

[Christoph Kruppe](https://github.com/ckruppe) - c.kruppe@nfq.de  
[Max Heuschneider](https://github.com/mheuschneider) - m.heuschneider@nfq.de  
[Michael Fest](https://github.com/mfestNFQ) - m.fest@nfq.de

This is inspired by [santosfrancisco/react-awesome-styled-grid](https://github.com/santosfrancisco/react-awesome-styled-grid)

<p align="right">(<a href="#top">back to top</a>)</p>

---

## License

The licence used is: [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/license/mit/)  
Click on licence badge for licence details.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Questions

If you have any furter questions please contact me.

<p align="right">(<a href="#top">back to top</a>)</p>
