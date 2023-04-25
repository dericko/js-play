
/**
 * https://raw.githubusercontent.com/shreyansb/places-lived/master/static/json/landtopo.json
 * 
 * var svg = d3.select(‘#map’).append(‘svg’);
d3.json('static/json/landtopo.json', function(error, geoJson) {
    
    // The shapes of the continents are loaded into `geoJson`.
    // Everything else happens here.
});
 * 
 * // select a projection
var projection = d3.geo.miller();
// create a geographic path generator
var path = d3.geo.path().projection(projection);
 
// use the generator to draw shapes defined in our json data
svg.append(‘path’)
   .datum(topojson.feature(geoJson, geoJson.objects.landgeo))
   .attr(‘d’, path);
 */

function MapComponent() {
    // render an svg map of the world using d3 and this TopoJSON file: https://raw.githubusercontent.com/shreyansb/places-lived/master/static/json/landtopo.json
    return (
        <div>
        <h1>Map Component</h1>
        </div>
    );
}

export default MapComponent;