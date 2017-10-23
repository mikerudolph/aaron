'use strict';

import * as d3 from 'd3';

class SeasonPlays {
  constructor() {}

  fetch(years) {
    return new Promise((resolve, reject) => {
      const seasons = [];

      for (let i=0; i<years.length; i++) {
        seasons.push(
          this._getCSV(
            years[i],
            './csv/aaron_rodgers/season_plays/'+years[i]+'.csv'
          )
        );
      }

      Promise.all(seasons).then((values) => {
        return resolve(values);
      })
    });
  };

  // TODO: convert these params to template string
  _getCSV(year, filename) {
    return new Promise((resolve, reject) => {
      d3.csv(filename, (err, data) => {
        if (err) {
          return reject(err);
        }

        const formatted = [];

        for(let i=0; i<data.length; i++) {
          // TODO: what data should be formatted here?
          formatted.push({
            date: data[i].date_stamp
          })
        }

        return resolve({
          year: year,
          data: formatted
        });
      })
    });
  }
}

export default new SeasonPlays();
