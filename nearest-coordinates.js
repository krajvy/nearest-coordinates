/**
* Library for computing nearest earth coordinates
* @author Jan 'krajvy' Krivohlavek <krajvy@gmail.com>
*/

/* Usefull functions -------- */

/**
* Extend JS Math object with degrees to radian converter
* @param float deg input degree
* @return float radians
*/
Math.deg2rad = function(deg) {
  return (deg / 180) * Math.PI;
};
/**
* Extend JS Math object with radian to degrees converter
* @param float rad input radians
* @return float degrees
*/
Math.rad2deg = function(rad) {
  return (rad / Math.PI) * 180;
};

/* -------------------------- */

/**
* Main object of Nearest Coordintes
*/
var NearestCoordinates = {
  config: {
    // Authalic radius - hypothetical perfect sphere which has the same surface
    // area as the reference ellipsoid
    earthRadius: 6371.0072,
    classElError: 'box-error',
    classElInputError: 'input-error',
    idElOutput: 'data_out',
    idElInputCoord: 'coord_in'
  },
  testData: [
    { 'lat': 50.083333, 'lon': 14.416667, 'desc': 'Prague' },
    { 'lat': 50.45, 'lon': 30.523333, 'desc': 'Kiev' },
    { 'lat': 52.366667, 'lon': 4.9, 'desc': 'Amsterdam' },
    { 'lat': 59.329444, 'lon': 18.068611, 'desc': 'Stockholm' },
    { 'lat': 41.326, 'lon': 19.816, 'desc': 'Tirana' },
    { 'lat': 53.347778, 'lon': -6.259722, 'desc': 'Dublin' },
    { 'lat': -34.603333, 'lon': -58.381667, 'desc': 'Buenos Aires' },
    { 'lat': -33.865, 'lon': 151.209444, 'desc': 'Sydney' },
    { 'lat': 45.416667, 'lon': -75.683333, 'desc': 'Ottawa' },
    { 'lat': 43.133333, 'lon': 131.9, 'desc': 'Vladivostok' },
    { 'lat': 0.016667, 'lon': 37.066667, 'desc': 'Nanyuki' },
    { 'lat': 65.584167, 'lon': -170.988889, 'desc': 'Lavrentiya' },
    { 'lat': 0, 'lon': 109.333333, 'desc': 'Pontianak' },
    { 'lat': 0, 'lon': 0, 'desc': 'Middleearth' },
    { 'lat': 90, 'lon': 0, 'desc': 'North Pole' },
    { 'lat': 80, 'lon': 14, 'desc': 'Azimuth point 1' },
    { 'lat': -80, 'lon': 14, 'desc': 'Azimuth point 2' },
    { 'lat': 80, 'lon': -14, 'desc': 'Azimuth point 3' },
    { 'lat': -80, 'lon': -14, 'desc': 'Azimuth point 4' },
    { 'lat': -90, 'lon': 0, 'desc': 'South Pole' },
    { 'lat': -64.497, 'lon': 137.684, 'desc': 'South Magnetic Pole' },
    { 'lat': -76, 'lon': -157, 'desc': 'Control checksum' },
    { 'lat': 83.95, 'lon': -120.72, 'desc': 'North Magnetic Pole' }
  ],
  testInputCoordinates: { 'lat': 49.8117486, 'lon': 13.9886431, 'desc': 'Plesivec (test start point)'},
  /**
  * Calculate mutual position data of two points on sphere
  * I know this alghorithm based on sphere isn't accurate for Earth,
  * but this should be only hint where to look for interesting places near
  * selected point, and for this it is good enough.
  * @param float lat1 latitude of start point
  * @param float lon1 longitude of start point
  * @param float lat2 latitude of end point
  * @param float lon2 longitude of end point
  * @return object mutual position data of those two points
  */
  getMutualPosition: function(lat1, lon1, lat2, lon2) {
    // distance will be in km
    var ret = { 'distance': 0, 'azimuth': 0 };
    if(
      typeof lat1 == 'undefined'
      || typeof lon1 == 'undefined'
      || typeof lat2 == 'undefined'
      || typeof lon2 == 'undefined'
    ) {
      return ret;
    }
    // convert coordinates do radians
    var radLat1 = Math.deg2rad(lat1);
    var radLat2 = Math.deg2rad(lat2);
    var radDeltaLon = Math.deg2rad(lon2 - lon1);
    
    // alghorithms based on:
    // http://cs.wikipedia.org/wiki/Loxodroma
    // http://cs.wikipedia.org/wiki/Ortodroma
    ret.distance = Math.acos(
      Math.sin(radLat1)
      * Math.sin(radLat2)
      + Math.cos(radLat1)
      * Math.cos(radLat2)
      * Math.cos(radDeltaLon)
    ) * this.config.earthRadius;
    
    ret.azimuth = Math.rad2deg(Math.atan2(
      Math.sin(radDeltaLon) * Math.cos(radLat2)
      ,
      Math.cos(radLat1)
      * Math.sin(radLat2)
      - Math.sin(radLat1)
      * Math.cos(radLat2)
      * Math.cos(radDeltaLon)
    ));
    return ret;
  },
  /**
  * Process nearest search
  * @param float lat latitude coordinate for searching start point
  * @param float lon longitude coordinate for searching start point
  * @return object sorted output data with nearest points
  */
  findNearest: function(lat, lon) {
    var outputData = [];
    if(
      typeof lat == 'undefined'
      || typeof lon == 'undefined'
    ) {
      return outputData;
    }
    for(var i in this.testData) {
      var calcul = this.testData[i];
      var mutual = this.getMutualPosition(lat, lon, calcul.lat, calcul.lon);
      calcul['distance'] = mutual.distance;
      calcul['azimuth'] = mutual.azimuth;
      outputData.push(calcul);
    }
    // sort data by distance
    outputData.sort(function(a, b) {
      if(a.distance > b.distance) { return 1; }
      else if(a.distance < b.distance) { return -1; }
      return 0;
    });
    return outputData;
  },
  /**
  * Parse input string and try to find coordinates there
  * @param string input
  * @return object parsed coordinates or error info
  */
  parseCoordinates: function(input) {
    var output = { 'lat': undefined, 'lon': undefined, 'desc': '' };
    // find out that input is filled with anything
    input = input.trim();
    if(!input) {
      return output;
    }
    // set full string to description
    output.desc = input;
    // lets parse some coordinates
    var search = '';
    if(search = input.match(/[^\d-]*(-?\d+(\.\d+)?)\s?,\s?(-?\d+(\.\d+)?)\D*/i)) {
      output.lat = search[1];
      output.lon = search[3];
    }
    // TODO: more coordinate formats
    return output;
  },
  /**
  * Format output coordinates
  * @param float lat latitude coordinate
  * @param float lon longitude coordinate
  * @return string formatted coordinates
  */
  formatCoordinates: function(lat, lon) {
    return lat + ',' + lon;
  },
  /**
  * Format output distance
  * @param float distance
  * @return string formatted distance with units
  */
  formatDistance: function(distance) {
    if(distance > 50) {
      // roud values to integers
      distance = parseInt(distance);
    } else {
      // round values to last two digits
      distance = Math.round(distance * 100) / 100;
    }
    return distance + ' km';
  },
  /**
  * Format output azimuth in degrees
  * @param int azimuth degrees
  * @return string formatted azimuth with units
  */
  formatAzimuth: function(azimuth) {
    return Math.round(azimuth) + ' °';
  },
  /**
  * Output data to table
  * @param object outputData data for output to table
  * @return bool true if success, false elsewhere
  */
  renderTable: function(outputData) {
    var outputEl = document.getElementById(this.config.idElOutput);
    if(!outputEl) {
      return false;
    }
    
    // emtpty workspace
    outputEl.innerHTML = '';

    // fill output with formatted output
    for(var i in outputData) {
      var _tr = document.createElement('tr');
      
      var _tdCoord = document.createElement('td');
      _tdCoord.textContent = this.formatCoordinates(outputData[i].lat, outputData[i].lon);
      _tr.appendChild(_tdCoord);
      
      var _tdDist = document.createElement('td');
      _tdDist.textContent = this.formatDistance(outputData[i].distance);
      _tr.appendChild(_tdDist);
      
      var _tdAzimuth = document.createElement('td');
      _tdAzimuth.textContent = this.formatAzimuth(outputData[i].azimuth);
      _tr.appendChild(_tdAzimuth);
      
      var _tdDesc = document.createElement('td');
      _tdDesc.textContent = outputData[i].desc;
      _tr.appendChild(_tdDesc);
      
      // and finally append it to output element
      outputEl.appendChild(_tr);
    }
    return true;
  },
  /**
  * Render error messages around element
  * @param string elId element ID where to display error
  * @param string message what will appear after element
  */
  renderErrorBox: function(elId, message) {
    var el = document.getElementById(elId);
    if(el) {
      // set input element error class
      el.className += (el.className ? ' ' : '') + this.config.classElInputError;
      // insert error message box
      if(message) {
        var _err = document.createElement('span');
        _err.className = this.config.classElError;
        _err.textContent = message;
        // insert after
        el.parentNode.insertBefore(_err, el.nextSibling);
      }
    }
  },
  /**
  * Clear all error boxes from page
  */
  clearErrorBoxes: function() {
    var errorMsgBox = document.getElementsByClassName(this.config.classElError);
    while(errorMsgBox[0]) {
      // remove error message box element
      errorMsgBox[0].parentNode.removeChild(errorMsgBox[0]);
    }
    var errorInput = document.getElementsByClassName(this.config.classElInputError);
    while(errorInput[0]) {
      // remove input element error class
      errorInput[0].classList.remove(this.config.classElInputError);
    }
  },
  /**
  * Read data from form and find nearest objects
  */
  process: function() {
    // clear all previous errors
    this.clearErrorBoxes();
    // read data from input
    var coordIn = this.parseCoordinates(document.getElementById(this.config.idElInputCoord).value);
    // check input
    if(typeof coordIn.lat == 'undefined' || typeof coordIn.lon == 'undefined') {
      this.renderErrorBox(this.config.idElInputCoord, 'Unsupported input coordinates!');
    } else {
      // render computed data to table
      this.renderTable(this.findNearest(coordIn.lat, coordIn.lon));
    }
    // TODO: return false is not quite correct...will use preventDefault instead in future
    return false;
  }
};
