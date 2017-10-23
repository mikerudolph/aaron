'use strict';

import * as d3 from 'd3';
import BarChart from './charts/bar';
import seasonTotals from './lib/season-totals';
import seasonPlays from './lib/season-plays';

const element = document.querySelector('body');
const seasons = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];

seasonTotals.fetch(seasons).then((data) => {
  const chart = new BarChart(element);

  chart.renderAxisY(() => {
    return [
      0,
      d3.max(data, (d) => {
        return d.passing_yds;
      })
    ];
  })
  .renderAxisX(() => {
    return data.map((d) => {
      return d.season;
    });
  })
  .renderBars(data);
});

seasonPlays.fetch(seasons).then((data) => {
  console.log(data);
});
