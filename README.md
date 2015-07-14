# Nearest Coordinates

JavaScript for **finding nearest coordinates on Earth** in input file by given start coordinate.

It is very handfull when you have database with interesting places and you want to find the closest ones to your actual position. Usually when you are planning holiday, trip or geocaching adventure.

Can be runned in browser that supports ECMAScript 5 - usually all modern browsers.

## Output

Output should be table with:
- Parsed coordinates in one format for check if recognizig was OK
- Distance from start coordinate in km
- Direction from start coordinate (usually with small arrow)
- Whole line from input file like description

As example:

| Coordinates | Distance | Azimuth | Description |
| --- | --- | --- | --- |
| 50.73611,15.74028 | 115 km | 48 ° | Sněžka - 1602 m (N 50°44.16667', E 15°44.41667') |
| 43.92833,12.45222 | 697 km | 194 ° | Monte Titano - 756 m (N 43°55.70000', E 12°27.13333') |
| 48.16,24.50028 | 754 km | 102 ° | Hoverla - 2061 m (N 48°9.60000', E 24°30.01667') |
| 61.63639,8.3125 | 1344 km | 346 ° | Galdhøpiggen - 2469 m (N 61°38.18333', E 8°18.75000') |

## Input file

Input file have to be in specific format:

```
Galdhøpiggen - 2469 m (N 61°38.18333', E 8°18.75000')
Hoverla - 2061 m (N 48°9.60000', E 24°30.01667')
Sněžka - 1602 m (N 50°44.16667', E 15°44.41667')
Monte Titano - 756 m (N 43°55.70000', E 12°27.13333')
```

Line without any coordinates, or with coordinates which script cannot parse, will be ignored in output.

You can have any indentation in file, but this will be stripped out in output (there is not needed).

For testing, you can use [example file](https://github.com/krajvy/nearest-coordinates/blob/master/example-input.txt)

## Coordinate format

Coordinates can be written only in specific formats:
- `50°2'33.819"N, 14°31'49.897"E`
- `50.0427275N, 14.5305269E`
- `N 50°2.56365', E 14°31.83162'`
- `50.0427275,14.5305269`

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/krajvy/nearest-coordinates/issues) or send me an e-mail at [krajvy@gmail.com](mailto:krajvy@gmail.com).


## License

Nearest Coordinates is published under the [MIT license](https://github.com/krajvy/nearest-coordinates/blob/master/LICENSE).
