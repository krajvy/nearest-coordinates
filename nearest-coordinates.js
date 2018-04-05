/**
* Library for computing nearest earth coordinates
* @author Jan 'krajvy' Krivohlavek <krajvy@gmail.com>
*/

/* global FileReader, OpenLayers */

/* Usefull functions -------- */

/**
* Extend JS Math object with degrees to radian converter
* @param float deg input degree
* @return float radians
*/
Math.deg2rad = function (deg) {
  return (deg / 180) * Math.PI
}
/**
* Extend JS Math object with radian to degrees converter
* @param float rad input radians
* @return float degrees
*/
Math.rad2deg = function (rad) {
  return (rad / Math.PI) * 180
}
/**
* Better rounding
* @param float what
* @param int accuracy
*/
Math.precisionRound = function (what, accuracy) {
  accuracy = Math.pow(10, accuracy)
  return Math.round(what * accuracy) / accuracy
}

/* -------------------------- */

/**
* Main object of Nearest Coordintes
*/
var NearestCoordinates = { // eslint-disable-line no-unused-vars
  config: {
    // Authalic radius - hypothetical perfect sphere which has the same surface
    // area as the reference ellipsoid
    earthRadius: 6371.0072,
    classElError: 'box-error',
    classElInputError: 'input-error',
    classHidden: 'hidden',
    idElOutput: 'data_out',
    idElInputCoord: 'coord_in',
    idElInputFile: 'file_in',
    idElFileProgress: 'file_progressbar',
    idElFileProgressCounter: 'file_progressbar_counter',
    idElBtnLoadMap: 'map_load',
    idElInputRange: 'map_range',
    idElMapCanvas: 'map--canvas'
  },
  coordIn: {},
  locationContainer: [],
  dataReady: false,
  fileReader: null,
  datainput: {
    coordIn: { 'lat': undefined, 'lon': undefined, 'desc': '' }
  },
  map: {
    popup: {},
    loaded: false
  },
  /**
  * Checks latitude and longitude is set
  * @param object with lat and lon
  * @return boolean true if it is OK, false otherwise
  */
  issetCoordinates: function (coord) {
    return (
      typeof coord.lat !== 'undefined' &&
      typeof coord.lon !== 'undefined'
    )
  },
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
  getMutualPosition: function (lat1, lon1, lat2, lon2) {
    // distance will be in km
    var ret = { 'distance': 0, 'azimuth': 0 }
    if (
      !this.issetCoordinates({lat: lat1, lon: lon1}) ||
      !this.issetCoordinates({lat: lat2, lon: lon2})
    ) {
      return ret
    }
    // convert coordinates do radians
    var radLat1 = Math.deg2rad(lat1)
    var radLat2 = Math.deg2rad(lat2)
    var radDeltaLon = Math.deg2rad(lon2 - lon1)

    // alghorithms based on:
    // http://cs.wikipedia.org/wiki/Loxodroma
    // http://cs.wikipedia.org/wiki/Ortodroma
    ret.distance = Math.acos(
      Math.sin(radLat1) *
      Math.sin(radLat2) +
      Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.cos(radDeltaLon)
    ) * this.config.earthRadius

    ret.azimuth = Math.rad2deg(Math.atan2(
      Math.sin(radDeltaLon) * Math.cos(radLat2)
      ,
      Math.cos(radLat1) *
      Math.sin(radLat2) -
      Math.sin(radLat1) *
      Math.cos(radLat2) *
      Math.cos(radDeltaLon)
    ))
    return ret
  },
  /**
  * Process nearest search
  * @param float lat latitude coordinate for searching start point
  * @param float lon longitude coordinate for searching start point
  * @return object sorted output data with nearest points
  */
  findNearest: function (lat, lon) {
    var outputData = []
    if (!this.issetCoordinates({lat: lat, lon: lon})) {
      return outputData
    }
    for (var i in this.locationContainer) {
      var calcul = this.locationContainer[i]
      var mutual = this.getMutualPosition(lat, lon, calcul.lat, calcul.lon)
      calcul['distance'] = mutual.distance
      calcul['azimuth'] = mutual.azimuth
      outputData.push(calcul)
    }
    // sort data by distance
    outputData.sort(function (a, b) {
      if (a.distance > b.distance) {
        return 1
      } else if (a.distance < b.distance) {
        return -1
      }
      return 0
    })
    return outputData
  },
  /**
  * Convert GPS coordinates to Float
  * @param int degrees
  * @param int minutes
  * @param int seconds
  * @return float converted coordinates
  */
  gps2float: function (degrees, minutes, seconds) {
    return parseFloat(degrees) + parseFloat(minutes) / 60 + parseFloat(seconds) / 60 / 60
  },
  /**
  * Parse input string and try to find coordinates there
  * @param string input
  * @return object parsed coordinates or error info
  */
  parseCoordinates: function (input) {
    var output = { 'lat': undefined, 'lon': undefined, 'desc': '' }
    // find out that input is filled with anything
    input = input.trim()
    if (!input) {
      return output
    }
    var getDesc = function (output) {
      if (this.issetCoordinates(output)) {
        // set full string to description
        return input
      }
    }.bind(this)
    // lets parse some coordinates
    // 17.15451°E,50.33167°N ; 50.0950228N, 16.5538242E
    var search = input.match(/[^\d-]*(\d+(\.\d+)?)°?([ewns])\s?,\s?(\d+(\.\d+)?)°?([ewns])\D*/i)
    if (search) {
      var first = search[6].toLowerCase()
      var second = search[3].toLowerCase()
      switch (first + second) {
        case 'en':
          output.lon = search[4]
          output.lat = search[1]
          break
        case 'es':
          output.lon = search[4]
          output.lat = -search[1]
          break
        case 'wn':
          output.lon = -search[4]
          output.lat = search[1]
          break
        case 'ws':
          output.lon = -search[4]
          output.lat = -search[1]
          break
        case 'ne':
          output.lon = search[1]
          output.lat = search[4]
          break
        case 'nw':
          output.lon = search[1]
          output.lat = -search[4]
          break
        case 'se':
          output.lon = -search[1]
          output.lat = search[4]
          break
        case 'sw':
          output.lon = -search[1]
          output.lat = -search[4]
          break
      }
      output.desc = getDesc(output)
      return output
    }
    // 49°33'46.745"N, 16°54'28.788"E
    search = input.match(/[^\d-]*((\d+)°?((\d+)'?)?((\d+\.\d+)"?)?)([ewns])\s?[,/]?\s?((\d+)°?((\d+)'?)?((\d+\.\d+)"?)?)([ewns])\D*/i)
    if (search) {
      if (search[7] === 'e' || search[7] === 'w') {
        output.lat = this.gps2float(search[9], search[11], search[13])
        output.lon = this.gps2float(search[2], search[4], search[6])
      } else {
        output.lat = this.gps2float(search[2], search[4], search[6])
        output.lon = this.gps2float(search[9], search[11], search[13])
      }
      output.desc = getDesc(output)
      return output
    }
    // N 50°45.65197', E 15°3.19075'
    search = input.match(/[^\d-]*([ewns])\s+((\d+)°?((\d+\.\d+)'?)?)\s?[,/]?\s?([ewns])\s+((\d+)°?((\d+\.\d+)'?)?)\D*/i)
    if (search) {
      if (search[1] === 'e' || search[1] === 'w') {
        output.lat = this.gps2float(search[8], search[10], 0)
        output.lon = this.gps2float(search[3], search[5], 0)
      } else {
        output.lat = this.gps2float(search[3], search[5], 0)
        output.lon = this.gps2float(search[8], search[10], 0)
      }
      output.desc = getDesc(output)
      return output
    }
    // 27.449486,-13.050728
    search = input.match(/[^\d-]*(-?\d+(\.\d+)?)[^ewns]\s?,\s?(-?\d+(\.\d+)?)[^ewns]\D*/i)
    if (search) {
      output.lat = search[1]
      output.lon = search[3]
      output.desc = getDesc(output)
      return output
    }
    return output
  },
  /**
  * Parse input file with targets coordinates for output table
  * Function will set data to locationContainer array
  * @param FileList filelist input files
  * @return bool true if success, false otherwise
  */
  readFile: function (fileList) {
    // reset locationContainer
    this.locationContainer = []
    // reset ready flag
    this.dataReady = false
    // check if we have FileReader global object
    if (!FileReader) {
      this.renderErrorBox(this.config.idElInputFile, 'FileReader object does not exists!')
      return false
    }
    // just use first file
    var file = fileList[0]
    // allow to read only txt files
    if (!file.type.match('text.*')) {
      this.renderErrorBox(this.config.idElInputFile, 'Cannot parse this file as text!')
      return false
    }
    // prepare file reading
    this.fileReader = new FileReader()
    // reset progressbar
    this.renderProgressBar(0)
    // log progress of file read
    this.fileReader.onprogress = function (evt) {
      if (evt.lengthComputable) {
        // set percent to progressbar
        this.renderProgressBar(Math.round((evt.loaded / evt.total) * 100))
      }
    }.bind(this)
    // file reading completed, process it
    this.fileReader.onload = function (evt) {
      // cut by newlines
      var lines = evt.target.result.split(/\n/)
      for (var i in lines) {
        var line = lines[i].trim()
        // parse only notempty lines
        if (line) {
          var parsed = this.parseCoordinates(line)
          // get only valid coordinates data
          if (this.issetCoordinates(parsed)) {
            this.locationContainer.push(parsed)
          }
        }
      }
      // set ready flag
      this.dataReady = true
      this.fileReader = null
    }.bind(this)
    // read the file content
    this.fileReader.readAsText(file)
    // well, everything seems to be OK
    return true
  },
  /**
  * Cancel reading and parsing file
  * @param void
  * @return void
  */
  abortReadFile: function () {
    if (this.fileReader) {
      // abort fileReader and reset object
      this.fileReader.abort()
      this.fileReader = null
    }
  },
  /**
  * Format output coordinates
  * @param float lat latitude coordinate
  * @param float lon longitude coordinate
  * @return string formatted coordinates
  */
  formatCoordinates: function (lat, lon) {
    return Math.precisionRound(lat, 5) + ',' + Math.precisionRound(lon, 5)
  },
  /**
  * Format output distance
  * @param float distance
  * @return string formatted distance with units
  */
  formatDistance: function (distance) {
    if (distance > 50) {
      // roud values to integers
      distance = parseInt(distance)
    } else {
      // round values to last two digits
      distance = Math.precisionRound(distance, 2)
    }
    return distance + ' km'
  },
  /**
  * Format output azimuth in degrees
  * @param int azimuth degrees
  * @return string formatted azimuth with units
  */
  formatAzimuth: function (azimuth) {
    azimuth = Math.round(azimuth)
    if (azimuth < 0) {
      azimuth += 360
    }
    var arrow = {
      'entity': '&#10140;',
      'degree': azimuth - 90
    }
    var css = [
      '-webkit-transform: rotate(' + arrow.degree + 'deg);',
      '-moz-transform: rotate(' + arrow.degree + 'deg);',
      '-o-transform: rotate(' + arrow.degree + 'deg);',
      '-ms-transform: rotate(' + arrow.degree + 'deg);',
      'transform: rotate(' + arrow.degree + 'deg);'
    ]
    return '<span class="rotation" style="' + css.join(' ') + '">' + arrow.entity + '</span> <span class="azimuth">' + azimuth + ' °</span>'
  },
  /**
  * Wait for data, parse them finally and render table
  * @param void
  * @return void
  */
  renderData: function (inLat, inLon) {
    if (!this.dataReady) {
      // set timeout - wait till file is readed
      window.setTimeout(function () { this.renderData(inLat, inLon) }.bind(this), 500)
    } else {
      // find nearest
      this.renderTable(this.findNearest(inLat, inLon))
    }
  },
  /**
  * Will update status of progress bar
  * @param int percent of progress
  * @return void
  */
  renderProgressBar: function (percent) {
    document.getElementById(this.config.idElFileProgress).style.width = percent + '%'
    document.getElementById(this.config.idElFileProgressCounter).textContent = percent + '%'
  },
  /**
  * Output data to table
  * @param object outputData data for output to table
  * @return bool true if success, false elsewhere
  */
  renderTable: function (outputData) {
    var outputEl = document.getElementById(this.config.idElOutput)
    if (!outputEl) {
      return false
    }

    // emtpty workspace
    outputEl.innerHTML = ''

    // fill output with formatted output
    for (var i in outputData) {
      var _tr = document.createElement('tr')

      var _tdCoord = document.createElement('td')
      _tdCoord.textContent = this.formatCoordinates(outputData[i].lat, outputData[i].lon)
      _tr.appendChild(_tdCoord)

      var _tdDist = document.createElement('td')
      _tdDist.textContent = this.formatDistance(outputData[i].distance)
      _tr.appendChild(_tdDist)

      var _tdAzimuth = document.createElement('td')
      _tdAzimuth.innerHTML = this.formatAzimuth(outputData[i].azimuth)
      _tr.appendChild(_tdAzimuth)

      var _tdDesc = document.createElement('td')
      _tdDesc.textContent = outputData[i].desc
      _tr.appendChild(_tdDesc)

      var _tdMap = document.createElement('td')
      var _inputCheckbox = document.createElement('input')
      _inputCheckbox.type = 'checkbox'
      _inputCheckbox.value = i
      _inputCheckbox.setAttribute('data-distance', outputData[i].distance)
      _inputCheckbox.setAttribute('data-lat', outputData[i].lat)
      _inputCheckbox.setAttribute('data-lon', outputData[i].lon)
      _inputCheckbox.setAttribute('data-desc', outputData[i].desc)
      _tdMap.appendChild(_inputCheckbox)
      _tr.appendChild(_tdMap)

      // and finally append it to output element
      outputEl.appendChild(_tr)
    }
    this.mapCheckRange()
    return true
  },
  /**
  * Render error messages around element
  * @param string elId element ID where to display error
  * @param string message what will appear after element
  */
  renderErrorBox: function (elId, message) {
    var el = document.getElementById(elId)
    if (el) {
      // set input element error class
      el.className += (el.className ? ' ' : '') + this.config.classElInputError
      // insert error message box
      if (message) {
        var _err = document.createElement('span')
        _err.className = this.config.classElError
        _err.textContent = message
        // insert after
        el.parentNode.insertBefore(_err, el.nextSibling)
      }
    }
  },
  /**
  * Clear all error boxes from page
  */
  clearErrorBoxes: function () {
    var errorMsgBox = document.getElementsByClassName(this.config.classElError)
    while (errorMsgBox[0]) {
      // remove error message box element
      errorMsgBox[0].parentNode.removeChild(errorMsgBox[0])
    }
    var errorInput = document.getElementsByClassName(this.config.classElInputError)
    while (errorInput[0]) {
      // remove input element error class
      errorInput[0].classList.remove(this.config.classElInputError)
    }
  },
  /**
  * Checks boxes in selected range
  * @param void
  * @return void
  */
  mapCheckRange: function () {
    // read value from input
    var range = parseInt(document.getElementById(this.config.idElInputRange).value, 10) + 1
    // check checkboxes in that input
    document.getElementById('data_out').querySelectorAll('input[type="checkbox"]').forEach((line) => {
      line.checked = line.getAttribute('data-distance') < range
    })
  },
  /**
  * Renders OSM map - main function
  * @param void
  * @return void
  */
  mapRender: function () {
    this.clearErrorBoxes()
    // check if I have all data
    if (!this.issetCoordinates(this.datainput.coordIn) || !this.dataReady) {
      this.renderErrorBox(this.config.idElBtnLoadMap, 'Data not ready!')
      return
    }
    // clear previous map
    document.getElementById(this.config.idElMapCanvas).innerHTML = ''
    // display wrapper
    document.getElementById(this.config.idElMapCanvas).classList.remove(this.config.classHidden)
    this.mapLoadAPI()
  },
  /**
  * Load OSM map API and create
  * @param void
  * @return void
  */
  mapLoadAPI: function () {
    // load main JS for map rendering
    if (!this.map.loaded) {
      this.map.loaded = true
      var head = document.getElementsByTagName('head')[0]
      var api = document.createElement('script')
      api.src = 'http://www.openlayers.org/api/OpenLayers.js'
      api.onload = () => this.mapCreate()
      head.appendChild(api)
    } else {
      this.mapCreate()
    }
  },
  /**
  * Transforms our coordinates to OpenLayers format
  * @param int lon longitude
  * @param int lat latitude
  * @param object map OpenLayers.Map object
  * @return int converted coodrinates
  */
  transformCoordinates: function (lat, lon, map) {
    return new OpenLayers.LonLat(lon, lat)
      .transform(
        new OpenLayers.Projection('EPSG:4326'), // transform from WGS 1984
        map.getProjectionObject() // to Spherical Mercator Projection
      )
  },
  /**
  * Creates the OSM map
  * @param void
  * @return void
  */
  mapCreate: function () {
    // create new map
    var map = new OpenLayers.Map(this.config.idElMapCanvas)
    // add layers with OSM and POIs
    map.addLayer(new OpenLayers.Layer.OSM())
    var markers = new OpenLayers.Layer.Markers('Markers')
    map.addLayer(markers)
    // get all checked locations
    document.getElementById('data_out').querySelectorAll('input[type="checkbox"]:checked').forEach((check) => {
      var pos = check.getAttribute('value')
      var lat = check.getAttribute('data-lat')
      var lon = check.getAttribute('data-lon')
      var desc = check.getAttribute('data-desc')
      // add point - set feature
      var feature = new OpenLayers.Feature(markers, this.transformCoordinates(lat, lon, map),
        {
          popupContentHTML: desc
        }
      )
      // create marker from feature
      var marker = feature.createMarker()
      // bind click
      marker.events.register('mousedown', feature, (evt) => {
        if (this.map.popup[feature.id] == null) {
          this.map.popup[feature.id] = feature.createPopup(true)
          this.map.popup[feature.id].setSize(new OpenLayers.Size(170, 100))
          map.addPopup(this.map.popup[feature.id])
          this.map.popup[feature.id].show()
        } else {
          this.map.popup[feature.id].toggle()
        }
        OpenLayers.Event.stop(evt)
      })
      markers.addMarker(marker)
    })
    map.setCenter(this.transformCoordinates(this.datainput.coordIn.lat, this.datainput.coordIn.lon, map), 11)
  },
  /**
  * Read data from form and find nearest objects
  * @param evt Form submit event
  * @return void
  */
  process: function (evt) {
    // clear all previous errors
    this.clearErrorBoxes()
    // read data from input
    this.datainput.coordIn = this.parseCoordinates(document.getElementById(this.config.idElInputCoord).value)
    // read file from form
    var inputFile = document.getElementById(this.config.idElInputFile).files
    if (inputFile.length && this.readFile(inputFile)) {
      // check input
      if (!this.issetCoordinates(this.datainput.coordIn)) {
        this.renderErrorBox(this.config.idElInputCoord, 'Unsupported input coordinates!')
      } else {
        // render computed data to table
        this.renderData(this.datainput.coordIn.lat, this.datainput.coordIn.lon)
      }
    } else {
      this.renderErrorBox(this.config.idElInputFile, 'Cannot read input file!')
    }
    if (evt) {
      evt.preventDefault()
    }
  }
}
