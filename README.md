<div id="top"></div>

[![npm version](https://badge.fury.io/js/%40nfq%2Freact-grid.svg)](https://badge.fury.io/js/%40nfq%2Freact-grid)
[![npm downloads](https://img.shields.io/npm/dm/%40nfq%2Freact-grid.svg)](https://www.npmjs.com/package/%40nfq%2Freact-grid)
[![BundlePhobia](https://img.shields.io/bundlephobia/min/@nfq/react-grid)](https://bundlephobia.com/result?p=%40nfq/react-grid)
[![GitHub issues](https://img.shields.io/github/issues/nfqde/nfq-react-grid.svg)](https://www.npmjs.com/package/%40nfq%2Freact-grid)
![GitHub contributors](https://img.shields.io/github/contributors/nfqde/nfq-react-grid.svg)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/license/mit/)
[![EsLint](https://github.com/nfqde/nfq-react-grid/actions/workflows/eslint.yml/badge.svg)](https://github.com/nfqde/nfq-react-grid/actions/workflows/eslint.yml)
[![Horusec](https://github.com/nfqde/nfq-react-grid/actions/workflows/horusec.yml/badge.svg)](https://github.com/nfqde/nfq-react-grid/actions/workflows/horusec.yml)
[![Cypress](https://github.com/nfqde/nfq-react-grid/actions/workflows/cypress.yml/badge.svg)](https://github.com/nfqde/nfq-react-grid/actions/workflows/cypress.yml)

# @nfq/react-grid

---

* [About the project](#about-the-project)
  * [Installation](#installation)
  * [PeerDependencies](#peerdependencies)
* [Usage](#usage)
  * [Responsive Columns](#responsive-columns)
  * [Offset usage](#offset-usage)
  * [Order usage](#order-usage)
  * [Alignment](#alignment)
  * [Changing directions](#changing-directions)
  * [Spacer usage](#spacer-usage)
  * [Usage of Hidden and Visible](#usage-of-hidden-and-visible)
* [Props](#props)
  * [Container](#container)
  * [Row](#row)
  * [Col](#col)
  * [Spacer](#spacer)
  * [Hidden](#hidden)
  * [Visible](#visible)
* [Types](#types)
  * [Breakpoints](#breakpoints)
  * [FlexAlign](#flexalign)
  * [AlignObject](#alignobject)
  * [FlexDirection](#flexdirection)
  * [DirectionObject](#directionobject)
  * [FlexGap](#flexgap)
  * [GapObject](#gapobject)
  * [FlexJustify](#flexjustify)
  * [JustifyObject](#justifyobject)
  * [OrderObject](#orderobject)
  * [OffsetObject](#offsetobject)
  * [Padding](#padding)
  * [PaddingObject](#paddingobject)
  * [StringSizes](#stringsizes)
  * [SpacerObject](#spacerobject)
* [Utilities](#utilities)
  * [getConfig](#getconfig)
  * [media](#media)
  * [mediaBetween](#mediabetween)
  * [spacing](#spacing)
  * [lighten](#lighten)
  * [darken](#darken)
  * [translucify](#translucify)
  * [ScreenSizeProvider](#screensizeprovider)
* [Hooks](#hooks)
  * [useConfig](#useConfig)
  * [useScreenSize](#useScreenSize)
* [Debugging](#debugging)
* [Custom config](#custom-config)
  * [Configuration Object](#configuration-object)
    * [baseSpacing](#basespacing)
    * [breakpoints](#breakpoints)
    * [columnGap](#columngap)
    * [columns](#columns)
    * [container](#container)
    * [containerPadding](#containerpadding)
    * [debug](#debug)
* [Contributions](#contributions)
* [Licence](#licence)
* [Questions](#questions)

---

## About the project

A responsive (mobile-first) grid system for React using styled-components. Inspired by [santosfrancisco/react-awesome-styled-grid](https://github.com/santosfrancisco/react-awesome-styled-grid).

### Installation

To install the package run

```sh
npm install @nfq/react-grid
```

if you are in yarn

```sh
yarn add @nfq/react-grid
```

or on pnpm

```sh
pnpm install @nfq/react-grid
```

### PeerDependencies

The following PeerDependencies are needed so the component does work:

* react >= 17
* styled-components >= 5

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Usage

```javascript
import {
    Col,
    Container,
    darken,
    getConfig,
    getScreenSize,
    Hidden,
    lighten,
    Row,
    ResponsiveText,
    media,
    mediaBetween,
    ScreenBadge,
    ScreenSizeContext,
    ScreenSizeProvider,
    Spacer,
    spacing,
    translucify,
    useScreenSize,
    useConfig
    Visible
} from '@nfq/react-grid';
```

### Responsive Columns

```javascript
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

```javascript
<Container>
    <Row>
        <Col offset={2}>Col 1</Col>
    </Row>
    <Row>
        <Col offset={{xs:3, sm:7, lg:11}}>Col 2</Col>
    </Row>
</Container>
```

An offset with an single number defines the offset for all screens. Because all screen sizes can have an different number of columns the offset will get calculated on xs basis. So if you have 4 columns on xs and an offset of 2 all screensizes will render the column with 50% width.

If you define an object you can set the offset for every screen size. And so all offsets will calculated for the specific screen sizes. So if you want an offset of one column for all screens you can define an offset of
{xs: 1} because we render mobile first all other screens will calculate the offset with 1 column and use its own max columns.

### Order usage

```javascript
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

```javascript
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

```javascript
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

```javascript
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

### Usage of Hidden and Visible

```javascript
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
Both can get screensizes as props. The screen sizes define when the components work.

### Usage of ResponsiveText

```javascript
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
This component can get an text for every screensize and renders it accordingly. As it works also mobile first you need to only set xs and the other screensizes will use the same text as xs or the text thats used for the next smallest given size.

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

| Prop          | type                                                                 | required | Description                                                                                                                                                                                     |
| ------------- | -------------------------------------------------------------------- | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| align         | [AlignObject](#alignobject)\|[FlexAlign](#flexalign)                 |          | Defines the content alignment of the column. It takes a[`AlignObject`](#alignobject) or a [`FlexAlign`](#flexalign) type value. Its direction is dependent on the `direction` prop.             |
| as            | String (ElementType)                                                 |          | Sets the html element type of the column. If you overwrite its styles with styled() it has to be forwardedAs.                                                                                   |
| className     | string                                                               |          | Classname property to overwrite styles with styled(Col).                                                                                                                                        |
| direction     | [DirectionObject](#directionobject)\|[FlexDirection](#flexdirection) |          | Sets the direction the column children should render ('row' or 'column'). It takes a[`DirectionObject`](#directionobject) or a [`FlexDirection`](#flexdirection) type value.                    |
| isReverse     | [Breakpoints[]](#breakpoints)\|boolean                               |          | Reverses the direction of the column. It takes an array of[`Breakpoints`](#breakpoints) or a `boolean` value.                                                                                   |
| justify       | [FlexJustify](#flexjustify)\|[JustifyObject](#justifyobject)         |          | Defines the content justification of the column. It takes a[`FlexJustify`](#flexjustify) or a [`JustifyObject`](#justifyobject) type value. Its direction is dependent on the `direction` prop. |
| offset        | [OffsetObject](#offsetobject)\|number                                |          | Sets the number of columns this column should offset to the left. It takes an[`OffsetObject`](#offsetobject) or a `number` value.                                                               |
| order         | [OrderObject](#orderobject)\|number                                  |          | Sets the order this column should be in. It takes an[`OrderObject`](#orderobject) or a `number` value.                                                                                          |
| padding       | [Padding](#padding)\|[PaddingObject](#paddingobject)                 |          | Sets the padding added to both sides of the column. It takes a[`Padding`](#padding) or a [`PaddingObject`](#paddingobject) type value.                                                          |
| paddingLeft   | [Padding](#padding)\|[PaddingObject](#paddingobject)                 |          | Sets the padding added to the left side of the column (Gets overwritten by padding). It takes a[`Padding`](#padding) or a [`PaddingObject`](#paddingobject) type value.                         |
| paddingRight  | [Padding](#padding)\|[PaddingObject](#paddingobject)                 |          | Sets the padding added to the right side of the column (Gets overwritten by padding). It takes a[`Padding`](#padding) or a [`PaddingObject`](#paddingobject) type value.                        |
| xs            | number\|[StringSizes](#stringsizes)                                  |          | Sets the number of columns the col takes in width on screens xs. (Can also be auto, max-content, min-content).                                                                                  |
| sm            | number\|[StringSizes](#stringsizes)                                  |          | Sets the number of columns the col takes in width on screens sm. (Can also be auto, max-content, min-content).                                                                                  |
| md            | number\|[StringSizes](#stringsizes)                                  |          | Sets the number of columns the col takes in width on screens md. (Can also be auto, max-content, min-content).                                                                                  |
| lg            | number\|[StringSizes](#stringsizes)                                  |          | Sets the number of columns the col takes in width on screens lg. (Can also be auto, max-content, min-content).                                                                                  |
| xl            | number\|[StringSizes](#stringsizes)                                  |          | Sets the number of columns the col takes in width on screens xl. (Can also be auto, max-content, min-content).                                                                                  |
| xxl           | number\|[StringSizes](#stringsizes)                                  |          | Sets the number of columns the col takes in width on screens xxl. (Can also be auto, max-content, min-content).                                                                                 |
| testId        | string                                                               |          | TestId for cypress testing. (If applicable.) Can than be selected with data-cy="testId"                                                                                                         |
| onClick       | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user clicks the element with the mouse.                                                                                                                |
| onContextMenu | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user right-clicks the element with the mouse.                                                                                                          |
| onDoubleClick | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user double-clicks the element with the mouse.                                                                                                         |
| onDrag        | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user starts dragging the element with the mouse.                                                                                                       |
| onDragEnd     | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user stops dragging the element with the mouse.                                                                                                        |
| onDragEnter   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user drags another element over this element.                                                                                                          |
| onDragLeave   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user stops dragging another element over this element.                                                                                                 |
| onDragOver    | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user is dragging another element over this element.                                                                                                    |
| onDrop        | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user is dropping another element on this element.                                                                                                      |
| onMouseDown   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user presses a mouse button over the element.                                                                                                          |
| onMouseEnter  | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor enters the element.                                                                                                                       |
| onMouseLeave  | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor leaves the element.                                                                                                                       |
| onMouseMove   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor moves over the element.                                                                                                                   |
| onMouseOut    | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor moves out of the element.                                                                                                                 |
| onMouseOver   | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the mouse cursor moves over the element.                                                                                                                   |
| onMouseUp     | (event: MouseEvent\<HTMLElement\>) => void                           |          | A function that will be invoked when the user releases a mouse button over the element.                                                                                                         |
| onScroll      | (event: UIEvent\<HTMLElement\>) => void                              |          | A function that will be invoked when the user scrolls inside this element.                                                                                                                      |

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

### Hidden

| Prop          | type    | required | Description                                                       |
| ------------- | ------- | :------: | ----------------------------------------------------------------- |
| xs            | Boolean |          | Set to true to hide the child only on screen size xs.             |
| sm            | Boolean |          | Set to true to hide the child only on screen size sm.             |
| md            | Boolean |          | Set to true to hide the child only on screen size md.             |
| lg            | Boolean |          | Set to true to hide the child only on screen size lg.             |
| xl            | Boolean |          | Set to true to hide the child only on screen size xl.             |
| xxl           | Boolean |          | Set to true to hide the child only on screen size xxl.            |
| isLoadingHtml | Boolean |          | Set to true to render the HTML even when the component is hidden. |

### Visible

| Prop          | type    | required | Description                                                       |
| ------------- | ------- | :------: | ----------------------------------------------------------------- |
| xs            | Boolean |          | Set to true to show the child only on screen size xs.             |
| sm            | Boolean |          | Set to true to show the child only on screen size sm.             |
| md            | Boolean |          | Set to true to show the child only on screen size md.             |
| lg            | Boolean |          | Set to true to show the child only on screen size lg.             |
| xl            | Boolean |          | Set to true to show the child only on screen size xl.             |
| xxl           | Boolean |          | Set to true to show the child only on screen size xxl.            |
| isLoadingHtml | Boolean |          | Set to true to render the HTML even when the component is hidden. |

### ResponsiveText

| Prop          | type   | required           | Description                                            |
| ------------- | ------ | :----------------: | ------------------------------------------------------ |
| xs            | String | :white_check_mark: | Set to true to hide the child only on screen size xs.  |
| sm            | String |                    | Set to true to hide the child only on screen size sm.  |
| md            | String |                    | Set to true to hide the child only on screen size md.  |
| lg            | String |                    | Set to true to hide the child only on screen size lg.  |
| xl            | String |                    | Set to true to hide the child only on screen size xl.  |
| xxl           | String |                    | Set to true to hide the child only on screen size xxl. |

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Types

### Breakpoints

```typescript
type Breakpoints = 'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'xxl';
```

### FlexAlign

```typescript
type FlexAlign = 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'inherit' | 'initial' | 'stretch' | 'unset';
```

### AlignObject

```typescript
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

```typescript
type FlexDirection = 'column' | 'row';
```

### DirectionObject

```typescript
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

```typescript
type FlexGap = boolean | 'no-column' | 'no-row';
```

### GapObject

```typescript
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

```typescript
type FlexJustify = 'center' | 'flex-end' | 'flex-start' | 'inherit' | 'initial' | 'space-around' | 'space-between' | 'space-evenly' | 'unset';
```

### JustifyObject

```typescript
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

```typescript
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

```typescript
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

```typescript
type PaddingExt = 'em' | 'px' | 'rem' | 'vh' | 'vw';
type Padding = `${number}${PaddingExt}`;
```

### PaddingObject

```typescript
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

```typescript
type StringSizes = 'auto' | 'max-content' | 'min-content';
```

### SpacerObject

```typescript
interface SpacerObject {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Utilities

### getConfig

```javascript
const DemoComponent = styled.div`
    ${({theme}) => getConfig(theme).breakpoints.xs /* Yields the xs breakpoint configured */}
`;
```

Retrieves the complete configuration object by merging the user-provided configuration with the default configuration. If the provided theme is not a configuration object, an error is thrown.

The `theme` object should follow the structure of the `Theme` type. If the `theme` object is incomplete, the default configuration will be used for the missing properties. This function caches the result, so if the same theme is passed multiple times, it will return the previously calculated configuration object.

### media

```javascript
const DemoComponent = styled.div`
    ${media('xs')} {
        padding-top: 2rem;
    }
`;
```

Creates a CSS media query using the given breakpoint and styled-components theme.

### mediaBetween

```javascript
const DemoComponent = styled.div`
    ${mediaBetween('xs', 'md')} {
        padding-top: 2rem;
    }
`;
```

The same as media but it creates an media query between two breakpoints.

### spacing

```javascript
const DemoComponent = styled.div`
    padding: ${spacing(2)}; /* Yields 2 * baseSpacing */
`;
```

Generates a CSS value for a given spacing value, based on the current grid configuration in the theme.

This function uses the base spacing value from the grid configuration to convert the input `space` value to rem. The base spacing value is defined in the `nfqgrid` section of the theme object, and represents the base spacing unit for the grid system.

### lighten

```javascript
const DemoComponent = styled.div`
    background: ${({theme}) => lighten(theme.colors.header, 50)};
`;
```

The `lighten` function is a utility that lightens a given color by a specified percentage.  
It utilizes the CSS `color-mix` function to mix the provided color with white, achieving the desired lightening effect.
This function is especially beneficial for generating hover or active states for UI elements, ensuring consistent color manipulation across the application.

### darken

```javascript
const DemoComponent = styled.div`
    background: ${({theme}) => darken(theme.colors.header, 50)};
`;
```

The `darken` function is a utility that darkens a given color by a specified percentage.  
It leverages the CSS `color-mix` function to mix the provided color with black, achieving the desired darkening effect.
This function is particularly useful for generating hover or active states for UI elements, ensuring consistent color manipulation across the application.

### translucify

```javascript
const DemoComponent = styled.div`
    background: ${({theme}) => translucify(theme.colors.header, 50)};
`;
```

The `translucify` function is a utility designed to make a given color translucent by blending it with transparency.  
By leveraging the CSS `color-mix` function, it combines the provided color with a transparent color, resulting in a translucent version of the original color.
This function is particularly useful for creating semi-transparent overlays, backgrounds, or other UI elements that require a touch of transparency.

### ScreenSizeProvider

```javascript
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

This component uses the `useTheme` and `useReducer` hooks to determine the current screen size and update it when the window is resized. The current screen size is then provided to its child components via context. It has to be an child of the styled-components ThemeProvider.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Hooks

### useConfig

```javascript
const DemoComponent = () => {
    const gridConfig = useConfig();
}
```

Returns the complete grid configuration object based on the current theme merged with the default theme configuration.

### useScreenSize

```javascript
const DemoComponent = () => {
    const screenSize = useScreenSize();
}
```

The useScreenSize hook gives the actual breakpoint defined in your config as string back. (xs, sm, md, lg, xl or xxl)

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Debugging

For debugging there are two helpfull things. First you can see the current breakpoint anytime if you use the ScreenBadge component.

```javascript
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

```javascript
{
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
    mediaQuery: 'only screen'
};
```

To define your own options you only have to define an object with these keys and change any value you want. This object will get merged with the default options. You can then give your styled-component theme provider the options you defined under the `nfqgrid` key.

```javascript
import {ThemeProvider} from 'styled-components';

export default class App extends Component {
    render() {
        const customConf = {
            /** any of your customized options */
        };

        return (
            <ThemeProvider theme={{nfqgrid: customConf}}>
                <div>Content</div>
            </ThemeProvider>
        )
    }
}
```

### Configuration Object

If you dont define one or more of the screen sizes the defaults will get used for these.

### baseSpacing

Defines the spacing factor to use for the spacer component.

### breakpoints

Defines the breakpoint values. For the different screen sizes in px.

### columnGap

This defines the width of the actual gap between each column.

### columns

Defines the number of columns for each screen size.

### container

The container sizes for the different screens. If you use fluid the container will be 100% width.

### containerPadding

Defines the outer padding of the container.

### debug

Defines the colors used for debug mode. You can define them for containers, rows, columns and spacers. Columns have also an padding color to show you the gutter gap.

### mediaQuery

This defines the media type for all media queries. (In most cases the default is enough).

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
