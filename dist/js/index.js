/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

!(function(d3) {
  "use strict"

  // hiding the gross JS :)
  var seasonTotals = __webpack_require__(3);

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 500 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // get the data
  seasonTotals().then(function(data) {

    // format the data
    data.forEach(function(d) {
      d.sales = +d.passing_yds;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.passing_yds; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.year); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.passing_yds); })
        .attr("height", function(d) { return height - y(d.passing_yds); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

  });

})(
  window.d3
)


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

!(function(d3) {
  "use strict"
  // wrapping d3.csv...
  var getCSV = function(year, filename) {
    return new Promise(function(resolve, reject) {
      d3.csv(filename, function(err, data) {
        if (err) {
          return reject(err);
        }

        var formatted = { year: year, passing_att: 0, passing_cmp: 0, passing_ints: 0, passing_tds: 0, passing_twopta: 0, passing_twoptm: 0, passing_yds: 0, rushing_att: 0, rushing_lng: 0, rushing_lngtd: 0, rushing_tds: 0, rushing_twopta: 0, rushing_twoptm: 0, rushing_yds: 0, tds: 0, twopta: 0, twoptm: 0, twoptmissed: 0 }

        for (var i=0; i<data.length; i++) {
          formatted.passing_att += parseInt(data[i].passing_att)
          formatted.passing_cmp += parseInt(data[i].passing_cmp)
          formatted.passing_ints += parseInt(data[i].passing_ints)
          formatted.passing_tds += parseInt(data[i].passing_tds)
          formatted.passing_twopta += parseInt(data[i].passing_twopta)
          formatted.passing_twoptm += parseInt(data[i].passing_twoptm)
          formatted.passing_yds += parseInt(data[i].passing_yds)
          formatted.rushing_att += parseInt(data[i].rushing_att)
          formatted.rushing_lng += parseInt(data[i].rushing_lng)
          formatted.rushing_lngtd += parseInt(data[i].rushing_lngtd)
          formatted.rushing_tds += parseInt(data[i].rushing_tds)
          formatted.rushing_twopta += parseInt(data[i].rushing_twopta)
          formatted.rushing_twoptm += parseInt(data[i].rushing_twoptm)
          formatted.rushing_yds += parseInt(data[i].rushing_yds)
          formatted.tds += parseInt(data[i].tds)
          formatted.twopta += parseInt(data[i].twopta)
          formatted.twoptm += parseInt(data[i].twoptm)
          formatted.twoptmissed += parseInt(data[i].twoptmissed)
        }

        resolve(formatted);
      });
    });
  };

  var supportedYears = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];

  var fetchSeasonTotals = function() {
    return new Promise(function(resolve, reject) {
      var seasons = [];

      for (var i=0; i<supportedYears.length; i++) {
        seasons.push(getCSV(supportedYears[i], './csv/aaron_rodgers/season_totals/'+supportedYears[i]+'.csv'));
      }

      Promise.all(seasons).then(function(values) {
        return resolve(values);
      })
    });
  };

  module.exports = fetchSeasonTotals;

})(
  window.d3
)


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map