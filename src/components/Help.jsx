import React, { useState } from 'react';

const Help = () => {
  const [showHelp, setShowHelp] = useState(false);

  const heading = showHelp
    ? <button onClick={() => setShowHelp(false)}>Hide help {String.fromCharCode(9666)}</button>
    : <button onClick={() => setShowHelp(true)}>Show help {String.fromCharCode(9656)}</button>;

  return (
    <fieldset>
      <legend>Help</legend>
      {heading}
      {showHelp
        ? <div>
          <h2>Nearest Coordinates</h2>
          <p>This is webapp for finding nearest coordinates on Earth in input file by given start coordinate.</p>
          <p>It is very handfull when you have database with interesting places and you want to find the closest ones to your actual position. Usually when you are planning holiday, trip or geocaching adventure.</p>
          <h3>Input file</h3>
          <p>Input file have to be in specific format:</p>
          <pre>
            Galdhøpiggen - 2469 m (N 61°38.18333&apos;, E 8°18.75000&apos;)<br />
            Hoverla - 2061 m (N 48°9.60000&apos;, E 24°30.01667&apos;)<br />
            Sněžka - 1602 m (N 50°44.16667&apos;, E 15°44.41667&apos;)<br />
            Monte Titano - 756 m (N 43°55.70000&apos;, E 12°27.13333&apos;)
          </pre>
          <p>Line without any coordinates, or with coordinates which script cannot parse, will be ignored in output.</p>
          <p>You can have any indentation in file, but this will be stripped out in output.</p>
          <h3>Coordinate format</h3>
          <p>Coordinates can be written only in specific formats:</p>
          <pre>
            50°2&apos;33.819&quot;N, 14°31&apos;49.897&quot;E<br />
            50.0427275N, 14.5305269E<br />
            N 50°2.56365&apos;, E 14°31.83162&apos;<br />
            50.0427275,14.5305269
          </pre>
          <h3>Output</h3>
          <p>Output should be table with:</p>
          <ul>
            <li>Parsed coordinates in one format for check if recognizig was OK</li>
            <li>Distance from start coordinate in km</li>
            <li>Direction from start coordinate (usually with small arrow)</li>
            <li>Whole line from input file like description</li>
          </ul>
          <p>As example:</p>
          <table>
            <thead>
              <tr>
                <th>Coordinates</th>
                <th>Distance</th>
                <th>Azimuth</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>50.73611,15.74028</td>
                <td>115 km</td>
                <td>48 °</td>
                <td>Sněžka - 1602 m (N 50°44.16667&apos;, E 15°44.41667&apos;)</td>
              </tr>
              <tr>
                <td>43.92833,12.45222</td>
                <td>697 km</td>
                <td>194 °</td>
                <td>Monte Titano - 756 m (N 43°55.70000&apos;, E 12°27.13333&apos;)</td>
              </tr>
              <tr>
                <td>48.16,24.50028</td>
                <td>754 km</td>
                <td>102 °</td>
                <td>Hoverla - 2061 m (N 48°9.60000&apos;, E 24°30.01667&apos;)</td>
              </tr>
              <tr>
                <td>61.63639,8.3125</td>
                <td>1344 km</td>
                <td>346 °</td>
                <td>Galdhøpiggen - 2469 m (N 61°38.18333&apos;, E 8°18.75000&apos;)</td>
              </tr>
            </tbody>
          </table>
          {heading}
        </div>
        : null}
    </fieldset>
  );
};

export default Help;
