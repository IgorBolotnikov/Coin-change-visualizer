import * as d3 from "d3";

export function clearSVG() {
  let svg = d3.select('svg');
  svg.selectAll('g').remove();
}

export async function drawCoinNumbers(coinSizes, coinNumsCollection) {
  const SCREEN_BREAKPOINT = 768;
  // Animation duration
  const duration = 100;
  // Number on bars to draw
  const n = coinSizes.length;
  // Size of one bar in pixels
  const barSize = window.innerWidth < SCREEN_BREAKPOINT ? 40 : 70;
  // Margin and bar chart dimentions
  const margin = {
    top: Math.max(80, (window.innerHeight - 600) / 2),
    right: Math.max(65, (window.innerWidth - 500) / 2),
    bottom: Math.max(80, (window.innerHeight - 600) / 2),
    left: Math.max(65, (window.innerWidth - 500) / 2)
  };
  let width = window.innerWidth;
  let height = Math.max(500, window.innerHeight - 54);

  let svg = d3.select('svg');

  clearSVG();

  // X and Y scale
  const xScale = d3.scaleBand()
    .domain(coinSizes)
    .rangeRound([margin.left, margin.left + barSize * (n + 1 + 0.1)])
    .padding(0.1);
  // const yScale = d3.scaleLinear()
  //   .domain([0, d3.max(coinSizes.map(coin => coinNums[coin]))])
  //   .nice()
  //   .range([height - margin.bottom, margin.top]);
  const yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);

  // X and Y axis
  const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickFormat(coin => (coin + "¢")));

  svg.append("g")
    .attr("class", "x-axis")
    .call(xAxis);

  function yAxis(svg) {
    const g = svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)

    const axis = d3.axisLeft(yScale)
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
  function bars(svg) {
    let bar = svg.append("g")
      .attr("class", "bars")
      .attr("fill", '#ffdb4d')
      .selectAll("rect");

    return (coinNums, transition) => bar = bar
      .data(coinSizes, coin => coinNums[coin])
      .join(
        enter => enter.append("rect")
          .attr("x", coin => xScale(coin))
          .attr("y", coin => yScale(coinNums[coin]))
          .attr("height", coin => yScale(0) - yScale(coinNums[coin]))
          .attr("width", xScale.bandwidth()),
        update => update,
        exit =>exit.transition(transition).remove()
          .attr("y", coin => yScale(coinNums[coin]))
          .attr("height", coin => yScale(0) - yScale(coinNums[coin]))
      )
      .call(bar => bar.transition(transition)
        .attr("y", coin => yScale(coinNums[coin]))
        .attr("height", coin => yScale(0) - yScale(coinNums[coin])));
  }

  function labels(svg) {
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
          .attr('transform', d => `translate(${xScale(d)}, ${yScale(coinNums[d])})`)
          .attr('x', xScale.bandwidth() / 2)
          .attr('y', -10)
          .text(d => coinNums[d]),
        update => update,
        exit => exit.transition(transition).remove()
          .attr('transform', d => `translate(${xScale(d)}, ${yScale(coinNums[d])})`)
          .text(d => coinNums[d])
      )
      .call(labels => labels.transition(transition)
        .attr('transform', d => `translate(${xScale(d)}, ${yScale(coinNums[d])})`))
        .text(d => coinNums[d])
  }

  function header(svg) {
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
          .attr('transform', d => `translate(${margin.left + (barSize * (n + 1 + 0.1)) / 2}, ${margin.top - 40})`)
          .attr('x', 0)
          .attr('y', 0)
          .text('Cycles passed: ' + cycles),
        update => update,
        exit => exit.transition(transition).remove()
          .text('Cycles passed: ' + cycles)
      )
      .call(labels => labels.transition(transition)
        .text('Cycles passed: ' + cycles))
    }

  const updateHeader = header(svg);
  const updateBars = bars(svg);
  const updateAxis = yAxis(svg);
  const updateLabels = labels(svg);

  let cycles = 0;
  let prevNums = {};
  for (const coinNums of coinNumsCollection) {
    const transition = svg.transition()
      .duration(duration)
      .ease(d3.easeLinear);

    yScale.domain([0, d3.max(coinSizes, coin => coinNums[coin])]);
    cycles += 100;

    // Check if algorithm ran cout of needed coins and doesn't use any others
    let end = true;
    for (let coin of coinSizes) {
      if (prevNums[coin] !== coinNums[coin]) {
        end = false;
      }
    }
    if (end) {
      break;
    }

    updateHeader(cycles, transition);
    updateAxis(coinNums, transition);
    updateBars(coinNums, transition);
    updateLabels(coinNums, transition);

    prevNums = coinNums;
    await transition.end();
  }
}
