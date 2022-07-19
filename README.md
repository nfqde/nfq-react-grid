
# @nfq/react-grid

# Table of Contents
- [Description](#description)
- [Installation](#installation)
- [PeerDependencies](#peerdependencies)
- [Usage](#usage)
  - [Responsive Columns](#responsive-columns)
  - [Offset usage](#offset-usage)
  - [Order usage](#order-usage)
  - [Alignment](#alignment)
  - [Changing directions](#changing-directions)
  - [Spacer usage](#spacer-usage)
  - [Usage of Hidden and Visible](#usage-of-hidden-and-visible)
  - [ScreenClassRender usage](#screenclassrender-usage)
- [Props](#props)
  - [Container](#container)
  - [Row](#row)
  - [Col](#col)
  - [Spacer](#spacer)
  - [Hidden](#hidden)
  - [Visible](#visible)
  - [ScreenClassRender](#screenclassrender)
- [Utilities](#utilities)
  - [getConfig](#getconfig)
  - [getScreenClass](#getscreenclass)
  - [media](#media)
  - [ScreenClassContext](#screenclasscontext)
- [Hooks](#hooks)
  - [useConfig](#useConfig)
  - [useScreenClass](#useScreenClass)
- [Debugging](#debugging)
- [Custom config](#custom-config)
  - [Configuration Object](#configuration-object)
    - [baseSpacing](#basespacing)
    - [breakpoints](#breakpoints)
    - [columns](#columns)
    - [container](#container)
    - [debug](#debug)
    - [gutterWidth](#gutterwidth)
    - [paddingWidth](#paddingwidth)
- [Contributions](#contributions)
- [Licence](#licence)
- [Questions](#questions)

## Description: [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
A responsive (mobile-first) grid system for React using styled-components. Forked from [santosfrancisco/react-awesome-styled-grid](https://github.com/santosfrancisco/react-awesome-styled-grid) and completely rewritten.
## Installation:
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
---
---
## PeerDependencies:
The following PeerDependencies are needed so the component does work:

- core-decorators >= 0.20.0
- prop-types >= 15
- react >= 17
- styled-components >= 5

---
---
## Usage:
```javascript
import {
    Col,
    Container,
    getConfig,
    getScreenClass,
    Hidden,
    Row,
    media,
    ScreenBadge,
    ScreenClassContext,
    ScreenClassProvider,
    ScreenClassRender,
    Spacer,
    Visible
} from '@nfq/react-grid';
```

### Responsive Columns:
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

### Offset usage:
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

### Order usage:
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

### Alignment:
```javascript
<Container>
    <Row align="center" justify="center">
        <Col align="flex-end" justify="space-between">Col 1</Col>
        <Col align="flex-end" justify="space-between">Col 2</Col>
    </Row>
    <Row align={{xs: 'flex-start', lg: 'center'}} justify={{xs: 'flex-start', lg: 'center'}}>
        <Col  align={{xs: 'flex-start', lg: 'center'}} justify={{xs: 'space-between', lg: 'space-around'}}>Col 1</Col>
        <Col  align={{xs: 'flex-start', lg: 'center'}} justify={{xs: 'space-between', lg: 'space-around'}}>Col 2</Col>
    </Row>
</Container>
```

    The alignment of rows and columns can be set with the align and justify props. Both use the flex css api so all values valid for thoose are also valid here. If you define an object you can set different alignments for different screens.

### Changing directions:
```javascript
<Container>
    <Row direction={{xs: 'column', lg: 'row'}} reverse>
        <Col reverse>Col 1</Col>
        <Col reverse={['xs', 'md']}>Col 2</Col>
    </Row>
    <Row reverse={['xs', 'md']}>
        <Col direction="row" reverse>Col 1</Col>
        <Col direction={{xs: 'column', lg: 'row'}} reverse={['xs', 'md']}>Col 2</Col>
    </Row>
</Container>
```

    You can change the directions of rows and columns. Rows can be reversed if needed. If you give an array you can define in which screen sizes the row should be reversed.
    Columns have also and direction prop. Its usefull if you want to render column children layed out as row. You can also define an object to change direction for different screen sizes.

### Spacer usage:
```javascript
<Container>
    <Row reverse>
        <Col>Col 1</Col>
        <Spacer x={2}>
        <Col>Col 2</Col>
    </Row>
    <Row reverse={['xs', 'md']}>
        <Col direction="row" reverse>Col 1</Col>
        <Spacer maxX={2} maxY={2} x={{xs: 0, lg: 2}} y={{xs: 2, lg: 0}}>
        <Col direction={{xs: 'column', lg: 'row'}} reverse={['xs', 'md']}>Col 2</Col>
    </Row>
</Container>
```

    The Spacer component helps to set spacings like designers do and has some logic for dynamic flex spacings and so on. Its the best way to define spacings in an grid conform matter.

### Usage of Hidden and Visible:
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

### ScreenClassRender usage:
```javascript
<Container>
    <Row>
        <Col>
            <ScreenClassRender render={screenSize => console.log(screenSize)}>
        </Col>
    </Row>
</Container>
```

    The ScreenClassRender component can recieve one prop. The render prop accepts an function that renders react. This function gets the actual screen size as param.
---
---
## Props:

### Container:

| Prop          | type             | required | Description                                                                                           |
| ------------- | ---------------- | :------: | ----------------------------------------------------------------------------------------------------- |
| as            | String           |          | Any html element identifier can be used to change the rendered html element. (usefull for sections)   |
| className     | String           |          | Classname property to overwrite styles with styled(Container)                                         |
| fluid         | Boolean or Array |          | Makes the container fluid. (Should always be set if the container has an container as parent already) |
| testId        | String           |          | TestId for cypress testing. (If applicable.) Can than be selected with data-cy="testId"               |
| EventHandlers | React Events     |          | Can get any of the react on[Event] Handlers.                                                          |

### Row:

| Prop          | type             | required | Description                                                                                                     |
| ------------- | ---------------- | :------: | --------------------------------------------------------------------------------------------------------------- |
| as            | String           |          | Any html element identifier can be used to change the rendered html element. (usefull for head or nav elements) |
| align         | String or Object |          | Content alignment (like flex alignment). Defines the vertical alignment                                         |
| className     | String           |          | Classname property to overwrite styles with styled(Container)                                                   |
| direction     | String or Object |          | Sets the direction the column children should render.                                                           |
| justify       | String or Object |          | Content alignment (like flex alignment). Defines the horizontal alignment                                       |
| order         | Number or Object |          | Sets the order this row should be in its parent container                                                       |
| noWrap        | Boolean or Array |          | Defines if the row will wrap or not                                                                             |
| reverse       | Boolean or Array |          | Reverses the direction of the row                                                                               |
| testId        | String           |          | TestId for cypress testing. (If applicable.) Can than be selected with data-cy="testId"                         |
| EventHandlers | React Events     |          | Can get any of the react on[Event] Handlers.                                                                    |

### Col:

| Prop              | type             | required | Description                                                                                                     |
| ----------------- | ---------------- | :------: | --------------------------------------------------------------------------------------------------------------- |
| xs                | Number or String |          | Sets the number of columns the col gets in width on screens xs. (Can also be auto, max-content or min-content)  |
| sm                | Number or String |          | Sets the number of columns the col gets in width on screens sm. (Can also be auto, max-content or min-content)  |
| md                | Number or String |          | Sets the number of columns the col gets in width on screens md. (Can also be auto, max-content or min-content)  |
| lg                | Number or String |          | Sets the number of columns the col gets in width on screens lg. (Can also be auto, max-content or min-content)  |
| xl                | Number or String |          | Sets the number of columns the col gets in width on screens xl. (Can also be auto, max-content or min-content)  |
| xxl               | Number or String |          | Sets the number of columns the col gets in width on screens xxl. (Can also be auto, max-content or min-content) |
| align             | String or Object |          | Content alignment (like flex alignment). Its direction is dependent on the direction prop.                      |
| className         | String           |          | Classname property to overwrite styles with styled(Container)                                                   |
| direction         | String or Object |          | Sets the direction the column children should render.                                                           |
| extraPadding      | String or Object |          | Sets an extra padding on both sides of the column. Precedes always over extraPaddingLeft and extraPaddingRight. |
| extraPaddingLeft  | String or Object |          | Sets an extra padding only on the left side of the column. Gets overwritten by extraPadding.                    |
| extraPaddingRight | String or Object |          | Sets an extra padding only on the right side of the column. Gets overwritten by extraPadding.                   |
| justify           | String or Object |          | Content justification (like flex justification). Its direction is dependent on the direction prop.              |
| noGutter          | Boolean          |          | Removes the gutter gap in the grid.                                                                             |
| offset            | Number or Object |          | Sets the number of columns this column should offset to the left (Negative offsets will pull it to the right)   |
| order             | Number or Object |          | Sets the order this column should be in                                                                         |
| reverse           | Boolean or Array |          | Reverses the direction of the column                                                                            |
| testId            | String           |          | TestId for cypress testing. (If applicable.) Can than be selected with data-cy="testId"                         |
| EventHandlers     | React Events     |          | Can get any of the react on[Event] Handlers.                                                                    |
### Spacer:

| Prop     | type             | required | Description                                                                                                                           |
| -------- | ---------------- | :------: | ------------------------------------------------------------------------------------------------------------------------------------- |
| isInline | Boolean or Array |          | Tells the spacer if it should behave like an inline element (Good for in text spacings)                                               |
| maxX     | Number or Objext |          | If used in an flex container this defines the max horizontal spacing size. Wants an multiplication factor thats used with baseSpacing |
| maxY     | Number or Object |          | If used in an flex container this defines the max vertical spacing size. Wants an multiplication factor thats used with baseSpacing   |
| x        | Number or Object |          | Defines the horizontal spacing size. (In an flexbox it defines the base) Wants an multiplication factor thats used with baseSpacing   |
| y        | Number or Object |          | Defines the horizontal spacing size. (In an flexbox it defines the base) Wants an multiplication factor thats used with baseSpacing   |

### Hidden:

| Prop          | type    | required | Description                                                                  |
| ------------- | ------- | :------: | ---------------------------------------------------------------------------- |
| xs            | Boolean |          | Determines if the children are hidden on xs screen size                      |
| sm            | Boolean |          | Determines if the children are hidden on xs screen size                      |
| md            | Boolean |          | Determines if the children are hidden on xs screen size                      |
| lg            | Boolean |          | Determines if the children are hidden on xs screen size                      |
| xl            | Boolean |          | Determines if the children are hidden on xs screen size                      |
| xxl           | Boolean |          | Determines if the children are hidden on xs screen size                      |
| isLoadingHtml | Boolean |          | Tells the component to render the html but sets it to display none if hidden |

### Visible:

| Prop          | type    | required | Description                                                                  |
| ------------- | ------- | :------: | ---------------------------------------------------------------------------- |
| xs            | Boolean |          | Determines if the children are rendered on xs screen size                    |
| sm            | Boolean |          | Determines if the children are rendered on xs screen size                    |
| md            | Boolean |          | Determines if the children are rendered on xs screen size                    |
| lg            | Boolean |          | Determines if the children are rendered on xs screen size                    |
| xl            | Boolean |          | Determines if the children are rendered on xs screen size                    |
| xxl           | Boolean |          | Determines if the children are rendered on xs screen size                    |
| isLoadingHtml | Boolean |          | Tells the component to render the html but sets it to display none if hidden |

### ScreenClassRender:

| Prop   | type     | required           | Description                                                                    |
| ------ | -------- | :----------------: | ------------------------------------------------------------------------------ |
| render | Function | :heavy_check_mark: | The function that will be rendered receiving the current screen as a parameter |
---
---
## Utilities:
### getConfig:
```javascript
const DemoComponent = styled.div`
    ${({theme}) => getConfig(theme).breakpoints.xs /* Yields the xs breakpoint configured */}
`;
```
    The getConfig utility function derifes the active configuration from all default options and the custom defined options to use it in your own styled components.

### media:
```javascript
const DemoComponent = styled.div`
    ${({theme}) => media(theme, 'xs')`
        padding-top: 2rem;
    `}
`;
```
    The media utility function gives an template literal function back that defines an mediaquery for the provided screen size and the provided css.

### mediaBetween:
```javascript
const DemoComponent = styled.div`
    ${({theme}) => mediaBetween(theme, 'xs', 'md)`
        padding-top: 2rem;
    `}
`;
```
    The mediaBetween utility function gives an template literal function back that defines an mediaquery betweem the provided screen sizes and the provided css.

### ScreenClassContext:
```javascript
class App extends Component {
    render() {
        return (
            <div>
                <ScreenClassProvider>
                    <AppPage />
                </ScreenClassProvider>
            </div>
        )
    }
}
```
    The ScreenClassProvider provides an context that yields the screen size thats active at the moment. Some utilities need this provider to work. Like the Hidden, Visible, ScreenClassRender and ScreenBadge components.
    To actively use the context for yourself you can use the Context type provided like so:

```javascript
class TestComponent extends Component {
    static contextType = ScreenClassContext;

    render() {
        const screenSize = this.context;

        return <p>The screen is now: {screenSize}</p>
    }
}
```
---
---
## Hooks:
### useConfig:
```javascript
const DemoComponent = () => {
    const gridConfig = useConfig();
}
```
    The useConfig hook derifes the active configuration from all default options and the custom defined options to use it in your own styled components.

### useScreenClass:
```javascript
const DemoComponent = () => {
    const screenSize = useScreenClass();
}
```
    The useScreenClass hook gives the actual viewport size class defined in your config as string back. (xs, sm, md, lg, xl or xxl)
---
---
## Debugging:

For debugging there are two helpfull things. First you can see the screensize anytime if you use the ScreenBadge component.

```javascript
class App extends Component {
    render() {
        return (
            <div>
                <ScreenClassProvider>
                    <AppPage />
                    <ScreenBadge>
                </ScreenClassProvider>
            </div>
        )
    }
}
```
This component renders always on top in the lower right corner and shows the screen class your in currently.

Also if you want to see your grid you can toggle debug mode with this keybord shortcut.

Windows: <kbd>Strg</kbd> + <kbd>D</kbd>

Mac Os: <kbd>Ctrl</kbd> + <kbd>D</kbd>

This Shortcut only works if your build is in development mode. On production builds this feature is deactivated.

---
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
    columns: {
        xs: 4,
        sm: 8,
        md: 8,
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
    debug: {
        col: {
            background: '#9a67cb',
            outline: '#ffffff',
            padding: '#c2cf8a'
        },
        container: {
            background: '#5901ad40',
            outline: '#ffffff'
        },
        row: {
            background: '#5901ad40',
            outline: '#ffffff'
        },
        spacer: {
            background: '#f9cc9d',
            outline: '#ffffff'
        }
    },
    gutterWidth: {
        xs: 20,
        sm: 20,
        md: 20,
        lg: 20,
        xl: 20,
        xxl: 20
    },
    mediaQuery: 'only screen',
    paddingWidth: {
        xs: 10,
        sm: 10,
        md: 10,
        lg: 10,
        xl: 10,
        xxl: 10
    }
};
```
To define your own options you only have to define an object with these keys and change any value you want. This object will get merged this the default options. You can then give your styled component theme provider the options you defined under the `nfqgrid` key.

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
### Configuration Object:
If you dont define one or more of the screen sizes the defaults will get used for these.

### baseSpacing:
Defines the spacing factor to use for the spacer component.

### breakpoints:
Defines the breakpoint values. For the different screen sizes in px.

### columns:
Defines the number of columns for each screen size.

### container:
The container sizes for the different screens. If you use fluid the container will be 100% width.

### debug:
Defines the colors used for debug mode. You can define them for containers, rows, columns and spacers. Columns have also an padding color to show you the gutter gap.

### gutterWidth:
This defines the width of the actual gap between each column.

### mediaQuery:
This defines the media type for all media queries. (In most cases the default is enough).

### paddingWidth:
Defines the outer padding of the container.

---
---
## Contributions:
.NFQ | Christoph Kruppe

This is an fork and rewrite of [santosfrancisco/react-awesome-styled-grid](https://github.com/santosfrancisco/react-awesome-styled-grid)

---
---
## License:
The licence used is: `MIT`
Click on licence badge for licence details:
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---
---
## Questions:
If you have any furter questions please contact the following email address:
email: c.kruppe@nfq.de
