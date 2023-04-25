import d3 from 'd3';

// make a map of the USA
// https://observablehq.com/@d3/choropleth

const width = 960;
const height = 600;

function calculateDaysBetweenDates(begin, end) {
  const diff = end.getTime() - begin.getTime();
  return diff / (1000 * 60 * 60 * 24);
}