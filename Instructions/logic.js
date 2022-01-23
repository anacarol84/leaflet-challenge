
// Creating map object
var map = L.map("map", {
  center: [40.7, -94.5],
  zoom: 3
});

// Store API endpoint as queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {

  //Earthquake data

  L.geoJSON(data, {

    // Create circle markers
    pointToLayer: function (feature, latlng) {
      var geojsonMarkerOptions = {
        radius: 3 * feature.properties.mag,
        stroke: true,
        //fillColor: "#ff7800",
        fillColor: fillColor(feature),
        color: "#000000",
        weight: 1,
        opacity: .8,
        fillOpacity: .8
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    },

    onEachFeature: function (feature, layer) {
      return layer.bindPopup(`<strong>Place:</strong> ${feature.properties.place}<br><strong>Magnitude:</strong> ${feature.properties.mag}`);
    }
  }).addTo(map);

  console.log(data)
});

// Function to define marker color based on earthquake magnitude
var colors = ["#7FFF00", "#dfedbe", "#eede9f", "#FF8C00", "#FA8072", "#FF0000"]
function fillColor(feature) {
  var mag = feature.properties.mag;
  if (mag <= 1) {
    return colors[0]
  }
  else if (mag <= 2) {
    return colors[1]
  }
  else if (mag <= 3) {
    return colors[2]
  }
  else if (mag <= 4) {
    return colors[3]
  }
  else if (mag <= 5) {
    return colors[4]
  }
  else {
    return colors[5]
  }
}


// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(map);

// Adding a tile layer (the background map image) to our map (optional) - I did not like this style
// var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "dark-v8",
//     accessToken: API_KEY
//   }).addTo(map)

// Create the legend
var legend = L.control({ position: 'bottomright' });

//Then add all the details for the legend
legend.onAdd = function () {
  var div = L.DomUtil.create("div", "info legend");
  var grades = [-10, 10, 30, 50, 70, 90];
  var color = ["#00ccbc", "#90eb9d", "#f9d057", "#f29e2e", "#e76818", "#d7191c"];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
      + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }

  return div;
};

//Add the legend by default
legend.addTo(map)





