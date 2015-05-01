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
/**
* Better rounding
* @param float what
* @param int accuracy
*/
Math.precisionRound = function(what, accuracy) {
  accuracy = Math.pow(10, accuracy);
  return Math.round(what * accuracy) / accuracy;
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
    idElInputCoord: 'coord_in',
    idElInputFile: 'file_in',
    idElFileProgress: 'file_progressbar'
  },
  locationContainer: [],
  dataReady: false,
  fileReader: null,
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
    for(var i in this.locationContainer) {
      var calcul = this.locationContainer[i];
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
  * Convert GPS coordinates to Float
  * @param int degrees
  * @param int minutes
  * @param int seconds
  * @return float converted coordinates
  */
  gps2float: function(degrees, minutes, seconds) {
    return parseInt(degrees) + parseInt(minutes) / 60 + parseInt(seconds) / 60 / 60;
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
    // lets parse some coordinates
    var search = [];
    if(search = input.match(/[^\d-]*(-?\d+(\.\d+)?)[^ewns]\s?,\s?(-?\d+(\.\d+)?)[^ewns]\D*/i)) {
      // 27.449486,-13.050728
      output.lat = search[1];
      output.lon = search[3];
    } else if(search = input.match(/[^\d-]*(\d+(\.\d+)?)°?([ewns])\s?,\s?(\d+(\.\d+)?)°?([ewns])\D*/i)) {
      // 17.15451°E,50.33167°N ; 50.0950228N, 16.5538242E
      var first = search[6].toLowerCase();
      var second = search[3].toLowerCase();
      switch(first + second) {
        case 'en':
          output.lon = search[4];
          output.lat = search[1];
          break;
        case 'es':
          output.lon = search[4];
          output.lat = -search[1];
          break;
        case 'wn':
          output.lon = -search[4];
          output.lat = search[1];
          break;
        case 'ws':
          output.lon = -search[4];
          output.lat = -search[1];
          break;
        case 'ne':
          output.lon = search[1];
          output.lat = search[4];
          break;
        case 'nw':
          output.lon = search[1];
          output.lat = -search[4];
          break;
        case 'se':
          output.lon = -search[1];
          output.lat = search[4];
          break;
        case 'sw':
          output.lon = -search[1];
          output.lat = -search[4];
          break;
      }
    } else if(search = input.match(/[^\d-]*((\d+)°?((\d+)'?)?((\d+\.\d+)"?)?)([ewns])\s?,\s?((\d+)°?((\d+)'?)?((\d+\.\d+)"?)?)([ewns])\D*/i)) {
      // 49°33'46.745"N, 16°54'28.788"E
      if(search[7] == 'e' || search[7] == 'w') {
        output.lat = this.gps2float(search[9], search[11], search[13]);
        output.lon = this.gps2float(search[2], search[4], search[6]);
      } else {
        output.lat = this.gps2float(search[2], search[4], search[6]);
        output.lon = this.gps2float(search[9], search[11], search[13]);
      }
    }
    if(typeof output.lat != 'undefined' && typeof output.lon != 'undefined') {
      // set full string to description
      output.desc = input;
    }
    return output;
  },
  /**
  * Parse input file with targets coordinates for output table
  * Function will set data to locationContainer array
  * @param FileList filelist input files
  * @return bool true if success, false otherwise
  */
  readFile: function(fileList) {
    // reset locationContainer
    this.locationContainer = [];
    // reset ready flag
    this.dataReady = false;
    // check if we have FileReader global object
    if(!FileReader) {
      this.renderErrorBox(this.config.idElInputFile, 'FileReader object does not exists!');
      return false;
    }
    // just use first file
    var file = fileList[0];
    // allow to read only txt files
    if(!file.type.match('text.*')) {
      this.renderErrorBox(this.config.idElInputFile, 'Cannot parse this file as text!');
      return false;
    }
    // prepare file reading
    this.fileReader = new FileReader();
    // reset progressbar
    this.renderProgressBar(0);
    // log progress of file read
    this.fileReader.onprogress = function(evt) {
      if(evt.lengthComputable) {
        // set percent to progressbar
        this.renderProgressBar(Math.round((evt.loaded / evt.total) * 100));
      }
    }.bind(this);
    // file reading completed, process it
    this.fileReader.onload = function(evt) {
      // cut by newlines
      var lines = evt.target.result.split(/\n/);
      for(var i in lines) {
        var line = lines[i].trim();
        // parse only notempty lines
        if(line) {
          var parsed = this.parseCoordinates(line);
          // get only valid coordinates data
          if(typeof parsed.lat != 'undefined' || typeof parsed.lon != 'undefined') {
            this.locationContainer.push(parsed);
          }
        }
      }
      // set ready flag
      this.dataReady = true;
      this.fileReader = null;
    }.bind(this);
    // read the file content
    this.fileReader.readAsText(file);
    // well, everything seems to be OK
    return true;
  },
  /**
  * Cancel reading and parsing file
  * @param void
  * @return void
  */
  abortReadFile: function() {
    if(!!this.fileReader) {
      // abort fileReader and reset object
      this.fileReader.abort();
      this.fileReader = null;
    }
  },
  /**
  * Format output coordinates
  * @param float lat latitude coordinate
  * @param float lon longitude coordinate
  * @return string formatted coordinates
  */
  formatCoordinates: function(lat, lon) {
    return Math.precisionRound(lat, 5) + ',' + Math.precisionRound(lon, 5);
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
      distance = Math.precisionRound(distance, 2);
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
  * Wait for data, parse them finally and render table
  * @param void
  * @return void
  */
  renderData: function(inLat, inLon) {
    if(!this.dataReady) {
      // set timeout - wait till file is readed
      window.setTimeout(function() { this.renderData(inLat, inLon); }.bind(this), 500);
    } else {
      // find nearest
      this.renderTable(this.findNearest(inLat, inLon));
    }
  },
  /**
  * Will update status of progress bar
  * @param int percent of progress
  * @return void
  */
  renderProgressBar: function(percent) {
    var progress = document.getElementById(this.config.idElFileProgress);
    progress.style.width = percent + '%';
    progress.textContent = percent + '%';
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
  * @param void
  * @return void
  */
  process: function(evt) {
    // clear all previous errors
    this.clearErrorBoxes();
    // read data from input
    var coordIn = this.parseCoordinates(document.getElementById(this.config.idElInputCoord).value);
    // read file from form
    if(this.readFile(document.getElementById(this.config.idElInputFile).files)) {
      // check input
      if(typeof coordIn.lat == 'undefined' || typeof coordIn.lon == 'undefined') {
        this.renderErrorBox(this.config.idElInputCoord, 'Unsupported input coordinates!');
      } else {
        // render computed data to table
        this.renderData(coordIn.lat, coordIn.lon);
      }
    } else {
      this.renderErrorBox(this.config.idElInputFile, 'Cannot read input file!');
    }
    evt.preventDefault();
  }
};
