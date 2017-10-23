'use strict';

import * as d3 from 'd3';

class BarChart {
  constructor(element) {

    // Margins and dimensions
    this.margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    };

    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;

    // Scales
    this.x = d3.scaleBand()
               .range([0, this.width])
               .padding(0.1);
    this.y = d3.scaleLinear()
               .range([this.height, 0]);

    // SVG
    this.svg = d3.select(element).append('svg')
                 .attr('width', this.width + this.margin.left + this.margin.right)
                 .attr('height', this.height + this.margin.top + this.margin.bottom)
                 .append('g')
                 .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  };

  renderBars(data) {
    this.svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
                .attr('class', 'bar')
                .attr('x', (d) => { return this.x(d.season); })
                .attr('width', this.x.bandwidth())
                .attr('y', (d) => { return this.y(d.passing_yds); })
                .attr('height', (d) => { return this.height - this.y(d.passing_yds); });
  };

  renderAxisY(domainSetFunc) {
    this.y.domain(domainSetFunc());

    this.svg.append('g')
            .call(d3.axisLeft(this.y));

    return this;
  };

  renderAxisX(domainSetFunc) {
    this.x.domain(domainSetFunc());

    this.svg.append('g')
            .attr('transform', 'translate(0, ' + this.height + ')')
            .call(d3.axisBottom(this.x));

    return this;
  };
}

export default BarChart;
