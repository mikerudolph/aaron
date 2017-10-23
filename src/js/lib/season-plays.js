'use strict';

import * as d3 from 'd3';
import CSV from './csv';

class SeasonPlays {
  constructor() {}

  fetch(seasons) {
    return new Promise((resolve, reject) => {
      const seasonProms = [];

      for (let i=0; i<seasons.length; i++) {
        let csv = new CSV(`./csv/aaron_rodgers/season_plays/${seasons[i]}.csv`);
        seasonProms.push(csv.get(this._iterator));
      }

      Promise.all(seasonProms).then((values) => {
        return resolve(values);
      })
    });
  };

  _iterator(data) {
    const season = parseInt(data[0].season);
    const formatted = [];

    for (let i=0; i<data.length; i++) {
      // TODO: what data should be formatted here?
      formatted.push({
        date: data[i].season
      });
    }

    return formatted;
  };
};

export default new SeasonPlays();
