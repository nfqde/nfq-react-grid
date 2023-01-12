# SASS Grid

## Usage
This gird is based on scss and uses the following variables to generate the grid.
```
$dimensions: Array;
$baseSpacing: Number|String;
$breakpoints: Map;
$mediaQuery: String;
$container: Map;
$containerPaddingWidth: Map;
$columns: Number;
$gutterWidth: Map;
$orderMax: Number;
$spacerMax: Number;
$customSpacer: Map;
```
It will also generate css variables for the grid. You can easily use them like this:
```
containerPadding('sm') // returns var(--container-padding-sm)
```
### Container
The ``.container`` is a wrapper for the grid. It has a max-width and a padding. The padding is based on the $containerPaddingWidth. The max-width is based on the $container map. The container is responsive and will change its width based on the $breakpoints map.

### Row
The ``.row`` is a wrapper for the columns. It has a negative margin on the left and right side. The margin is based on the $gutterWidth map. The row is responsive and will change its width based on the $breakpoints map.

* The ``.row`` has a ``.row-nowrawp`` modifyer that will set the flex-wrap to nowrap.
* You can also add a ``.row-align`` modifyer to the ``.row``. The ``.row-align`` has the following options:
  * ``.row-align-start``
  * ``.row-align-end``
  * ``.row-align-center``
  * ``.row-align-baseline``
  * ``.row-align-stretch``
* You can add a ``.row-justify`` modifyer to the ``.row``. The ``.row-justify`` has the following options:
  * ``.row-justify-start``
  * ``.row-justify-end``
  * ``.row-justify-center``
  * ``.row-justify-between``
  * ``.row-justify-around``
* Also each modifyer has a responsive version. For example ``.row-align-sm-start``.

### Column
The ``.col`` is a wrapper for the content. It has a padding on the left and right side. The padding is based on the $gutterWidth map. The column is responsive and will change its width based on the $breakpoints map.

* The ``.col`` has following modifyers:
  * ``.col-1`` to ``.col-12`` (if you set $columns to 12)
  * ``.col-auto`` for ``max-width: auto``
  * ``.col-max`` for ``max-width: max-content``
  * ``.col-min`` for ``max-width: min-content``
  * ``.col-offset-1`` to ``.col-offset-12`` (if you set $columns to 12)
  * ``col-align`` modifiyes like in the row & ``col-align-self`` for ``align-self``
  * Same as for ``justify-content``
  * And of course the responsive versions of the above.

### Spacer
The ``.spacer`` is a handy class to add some spaces.

### Utils
* ``.order-1`` to ``.order-12`` (if you set $orderMax to 12), ``.order-first`` and ``.order-last`` & responsive versions
* ``.d-none``, ``.d-block``, ``.d-inline``, ``d-flex`` & responsive versions

## Functions
* ``spacing($value)``: Returns the calc for spacing based on the baseSpacing css variable.
* ``mediaDown($breakpoint)``: Returns the media query for the given breakpoint (max-width)
* ``mediaUp($breakpoint)``: Returns the media query for the given breakpoint (min-width)
* ``mediaBetween($breakpoint1, $breakpoint2)``: Returns the media query for the given breakpoints (min-width and max-width)
* ``breakpoint($breakpoint)``: Returns the css variable of the given breakpoint
* ``columns()``: Returns the css variable of the columns
* ``container($breakpoint)``: Returns the css variable of the container width for the given breakpoint
* ``gutterWidth($breakpoint)``: Returns the css variable of the gutter width for the given breakpoint
* ``containerPadding($breakpoint)``: Returns the css variable of the container padding for the given breakpoint
* ``baseSpacing()``: Returns the css variable of the base spacing