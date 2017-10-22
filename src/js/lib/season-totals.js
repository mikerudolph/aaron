'use strict';

import * as d3 from 'd3';

class SeasonTotals {
  constructor() {}

  fetch(years) {
    return new Promise((resolve, reject) => {
      const seasons = [];

      for (let i=0; i<years.length; i++) {
        seasons.push(
          this._getCSV(
            years[i],
            './csv/aaron_rodgers/season_totals/'+years[i]+'.csv'
          )
        );
      }

      Promise.all(seasons).then((values) => {
        return resolve(values);
      })
    });
  };

  _getCSV(year, filename) {
    return new Promise((resolve, reject) => {
      d3.csv(filename, (err, data) => {
        if (err) {
          return reject(err);
        }

        const formatted = { year: year, passing_att: 0, passing_cmp: 0, passing_ints: 0, passing_tds: 0, passing_twopta: 0, passing_twoptm: 0, passing_yds: 0, rushing_att: 0, rushing_lng: 0, rushing_lngtd: 0, rushing_tds: 0, rushing_twopta: 0, rushing_twoptm: 0, rushing_yds: 0, tds: 0, twopta: 0, twoptm: 0, twoptmissed: 0 };

        for (let i=0; i<data.length; i++) {
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

        return resolve(formatted);
      })
    });
  }
}

export default new SeasonTotals();
