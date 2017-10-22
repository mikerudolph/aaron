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
