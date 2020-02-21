import * as d3 from "d3";

export function clearSVG() {
  let svg = d3.select('svg');
  svg.selectAll('g').remove();
}

export async function drawCoinNumbers(coinSizes, coinCollection) {
  const offsetY = 300;
  const SCREEN_BREAKPOINT = 768;
  // Animation duration
  const duration = 100;
  // Number on bars to draw
  const n = coinSizes.length;
  // Size of one bar in pixels
  const barSize = window.innerWidth < SCREEN_BREAKPOINT ? 40 : 70;
  // Margin and bar chart dimentions
  const margin1 = {
    top: 80,
    right: Math.max(65, (window.innerWidth - 500) / 2),
    bottom: 60 + offsetY,
    left: Math.max(65, (window.innerWidth - 500) / 2)
  };
  const margin2 = {
    top: 60 + offsetY,
    right: Math.max(65, (window.innerWidth - 500) / 2),
    bottom: 80,
    left: Math.max(65, (window.innerWidth - 500) / 2)
  };
  let height = 600;

  let svg = d3.select('svg');

  clearSVG();

  // X and Y scale
  const xScale1 = d3.scaleBand()
    .domain(coinSizes)
    .rangeRound([margin1.left, margin1.left + barSize * (n + 1 + 0.1)])
    .padding(0.1);
  const yScale1 = d3.scaleLinear().range([height - margin1.bottom, margin1.top]);

  const xScale2 = d3.scaleBand()
    .domain(coinSizes)
    .rangeRound([margin2.left, margin2.left + barSize * (n + 1 + 0.1)])
    .padding(0.1);
  const yScale2 = d3.scaleLinear().range([height - margin2.bottom, margin2.top]);

  // X and Y axis
  const xAxis1 = g => g
    .attr("transform", `translate(0,${height - margin1.bottom})`)
    .call(d3.axisBottom(xScale1).tickFormat(coin => (coin + "¢")));
  const xAxis2 = g => g
    .attr("transform", `translate(0,${height - margin2.bottom})`)
    .call(d3.axisBottom(xScale2).tickFormat(coin => (coin + "¢")));

  svg.append("g")
    .attr("class", "x-axis")
    .call(xAxis1);

  svg.append("g")
    .attr("class", "x-axis")
    .call(xAxis2);

  function yAxis1(svg) {
    const g = svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin1.left},0)`)

    const axis = d3.axisLeft(yScale1)
      .ticks(height / 100)
      .tickSizeOuter(0)
      .tickSizeInner(-barSize * (n + 1));

    return (_, transition) => {
        g.transition(transition).call(axis);
        g.select(".tick:first-of-type text").remove();
        g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#eeeeee");
        g.select(".domain").remove();
    };
  }

  function yAxis2(svg) {
    const g = svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin2.left},0)`)

    const axis = d3.axisLeft(yScale2)
      .ticks(height / 100)
      .tickSizeOuter(0)
      .tickSizeInner(-barSize * (n + 1));

    return (_, transition) => {
        g.transition(transition).call(axis);
        g.select(".tick:first-of-type text").remove();
        g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#eeeeee");
        g.select(".domain").remove();
    };
  }

  // Bars and labels
  function bars1(svg) {
    let bar = svg.append("g")
      .attr("class", "bars")
      .attr("fill", '#ffdb4d')
      .selectAll("rect");

    return (coinNums, transition) => bar = bar
      .data(coinSizes, coin => coinNums[coin])
      .join(
        enter => enter.append("rect")
          .attr("x", coin => xScale1(coin))
          .attr("y", coin => yScale1(coinNums[coin]))
          .attr("height", coin => yScale1(0) - yScale1(coinNums[coin]))
          .attr("width", xScale1.bandwidth()),
        update => update,
        exit =>exit.transition(transition).remove()
          .attr("y", coin => yScale1(coinNums[coin]))
          .attr("height", coin => yScale1(0) - yScale1(coinNums[coin]))
      )
      .call(bar => bar.transition(transition)
        .attr("y", coin => yScale1(coinNums[coin]))
        .attr("height", coin => yScale1(0) - yScale1(coinNums[coin])));
  }

  function bars2(svg) {
    let bar = svg.append("g")
      .attr("class", "bars")
      .attr("fill", '#ffdb4d')
      .selectAll("rect");

    return (coinNums, transition) => bar = bar
      .data(coinSizes, coin => coinNums[coin])
      .join(
        enter => enter.append("rect")
          .attr("x", coin => xScale2(coin))
          .attr("y", coin => yScale2(coinNums[coin]))
          .attr("height", coin => yScale2(0) - yScale2(coinNums[coin]))
          .attr("width", xScale2.bandwidth()),
        update => update,
        exit =>exit.transition(transition).remove()
          .attr("y", coin => yScale2(coinNums[coin]))
          .attr("height", coin => yScale2(0) - yScale2(coinNums[coin]))
      )
      .call(bar => bar.transition(transition)
        .attr("y", coin => yScale2(coinNums[coin]))
        .attr("height", coin => yScale2(0) - yScale2(coinNums[coin])));
  }

  function labels1(svg) {
    let label = svg.append('g')
      .style('font-variant-numeric', 'tabular-nums')
      .style('font-size', '16')
      .style('fill', 'rgb(205, 169, 27)')
      .style('text-anchor', 'middle')
      .selectAll('text');

    return (coinNums, transition) => label = label
      .data(coinSizes, coin => coinNums[coin])
      .join(
        enter => enter.append('text')
          .attr('transform', d => `translate(${xScale1(d)}, ${yScale1(coinNums[d])})`)
          .attr('x', xScale1.bandwidth() / 2)
          .attr('y', -10)
          .text(d => coinNums[d]),
        update => update,
        exit => exit.transition(transition).remove()
          .attr('transform', d => `translate(${xScale1(d)}, ${yScale1(coinNums[d])})`)
          .text(d => coinNums[d])
      )
      .call(labels => labels.transition(transition)
        .attr('transform', d => `translate(${xScale1(d)}, ${yScale1(coinNums[d])})`))
        .text(d => coinNums[d])
  }

  function labels2(svg) {
    let label = svg.append('g')
      .style('font-variant-numeric', 'tabular-nums')
      .style('font-size', '16')
      .style('fill', 'rgb(205, 169, 27)')
      .style('text-anchor', 'middle')
      .selectAll('text');

    return (coinNums, transition) => label = label
      .data(coinSizes, coin => coinNums[coin])
      .join(
        enter => enter.append('text')
          .attr('transform', d => `translate(${xScale2(d)}, ${yScale2(coinNums[d])})`)
          .attr('x', xScale2.bandwidth() / 2)
          .attr('y', -10)
          .text(d => coinNums[d]),
        update => update,
        exit => exit.transition(transition).remove()
          .attr('transform', d => `translate(${xScale2(d)}, ${yScale2(coinNums[d])})`)
          .text(d => coinNums[d])
      )
      .call(labels => labels.transition(transition)
        .attr('transform', d => `translate(${xScale2(d)}, ${yScale2(coinNums[d])})`))
        .text(d => coinNums[d])
  }

  function header1(svg) {
    let header = svg.append('g')
      .style('font-variant-numeric', 'tabular-nums')
      .style('font-size', '18')
      .style('fill', '#333')
      .style('text-anchor', 'middle')
      .selectAll('text');

    return (cycles, transition) => header = header
      .data([cycles], cycles => cycles)
      .join(
        enter => enter.append('text')
          .attr('transform', d => `translate(${margin1.left + (barSize * (n + 1 + 0.1)) / 2}, ${margin1.top - 40})`)
          .attr('x', 0)
          .attr('y', 0)
          .text('DUMB MODE clients served: ' + cycles),
        update => update,
        exit => exit.transition(transition).remove()
          .text('DUMB MODE clients served: ' + cycles)
      )
      .call(labels => labels.transition(transition)
        .text('DUMB MODE clients served: ' + cycles))
  }

  function header2(svg) {
    let header = svg.append('g')
      .style('font-variant-numeric', 'tabular-nums')
      .style('font-size', '18')
      .style('fill', '#333')
      .style('text-anchor', 'middle')
      .selectAll('text');

    return (cycles, transition, end) => header = header
      .data([cycles], cycles => cycles)
      .join(
        enter => enter.append('text')
          .attr('transform', d => `translate(${margin2.left + (barSize * (n + 1 + 0.1)) / 2}, ${margin2.top - 40})`)
          .attr('x', 0)
          .attr('y', 0)
          .text('SMART MODE clients served: ' + cycles),
        update => update,
        exit => exit.transition(transition).remove()
          .text('SMART MODE clients served: ' + cycles)
      )
      .call(labels => labels.transition(transition)
        .text('SMART MODE clients served: ' + cycles))
  }

  function message(svg) {
    let header = svg.append('g')
      .style('font-size', '26')
      .style('fill', '#ff0000')
      .style('text-anchor', 'middle')
      .selectAll('text');

    return (message, height, transition) => header = header
      .data([message], message => message)
      .join(
        enter => enter.append('text')
          .attr('transform', d => `translate(${margin2.left + (barSize * (n + 1 + 0.1)) / 2}, ${height})`)
          .attr('x', 0)
          .attr('y', 0)
          .text(message),
        update => update,
        exit => exit.transition(transition).remove()
          .text(message)
      )
      .call(labels => labels.transition(transition)
        .text(message))
  }

  const updateHeader1 = header1(svg);
  const updateBars1 = bars1(svg);
  const updateAxis1 = yAxis1(svg);
  const updateLabels1 = labels1(svg);

  const updateHeader2 = header2(svg);
  const updateBars2 = bars2(svg);
  const updateAxis2 = yAxis2(svg);
  const updateLabels2 = labels2(svg);

  let chart1Finished = false;
  let chart2Finished = false;
  let cycles = {smart: 0, dumb: 0};
  let animationLength = coinCollection.smart.length;
  let prevNums = {smart: {}, dumb: {}};
  for (let index = 0; index < animationLength; index++) {
    if (chart1Finished && chart2Finished) {
      return;
    }
    const transition = svg.transition()
      .duration(duration)
      .ease(d3.easeLinear);

    yScale1.domain([0, d3.max(coinSizes, coin => coinCollection.dumb[index][coin])]);
    yScale2.domain([0, d3.max(coinSizes, coin => coinCollection.smart[index][coin])]);
    cycles.smart += 100;
    cycles.dumb += 100;

    const noCoins = {dumb: true, smart: true};
    for (let coin of coinSizes) {
      if (prevNums.dumb[coin] !== coinCollection.dumb[index][coin]) {
        noCoins.dumb = false;
      }
    }
    if (noCoins.dumb && !chart1Finished) {
      message(svg)('Out of coins!', margin1.top + 75);
      chart1Finished = true;
    }

    for (let coin of coinSizes) {
      if (prevNums.smart[coin] !== coinCollection.smart[index][coin]) {
        noCoins.smart = false;
      }
    }
    if (noCoins.smart && !chart2Finished) {
      message(svg)('Out of coins!', margin2.top + 75);
      chart2Finished = true;
    }

    if (!chart1Finished) {
      updateHeader1(cycles.dumb, transition);
      updateAxis1(coinCollection.dumb[index], transition);
      updateBars1(coinCollection.dumb[index], transition);
      updateLabels1(coinCollection.dumb[index], transition);
    }
    if (!chart2Finished) {
      updateHeader2(cycles.smart, transition);
      updateAxis2(coinCollection.smart[index], transition);
      updateBars2(coinCollection.smart[index], transition);
      updateLabels2(coinCollection.smart[index], transition);
    }

    prevNums.dumb = coinCollection.dumb[index];
    prevNums.smart = coinCollection.smart[index];
    await transition.end();
  }
}
