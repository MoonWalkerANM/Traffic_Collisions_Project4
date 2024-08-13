$(document).ready(function() {
    var map = L.map('map').setView([36.7783, -119.4179], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add street data
    var dangerousStreets = [/* Add dangerous streets data */];
    var safestStreets = [/* Add safest streets data */];

    // Function to add streets to the map
    function addStreetsToMap(streets, color) {
        streets.forEach(function(street) {
            L.polyline(street.coordinates, {color: color, name: street.name, accidentCount: street.accidentCount})
                .on('click', onStreetClick)
                .addTo(map);
        });
    }

    // Add dangerous streets in red
    addStreetsToMap(dangerousStreets, 'red');

    // Add safest streets in green
    addStreetsToMap(safestStreets, 'green');

    // Add click event to show accident numbers
    function onStreetClick(e) {
        var streetName = e.target.options.name;
        var accidentCount = e.target.options.accidentCount;
        alert('Street: ' + streetName + '\nAccidents: ' + accidentCount);
    }

    // Apply filters
    $('#apply_filters').click(function() {
        var county = $('#county').val();
        var severity = $('#severity').val();
        var weather = $('#weather').val();
        var sunrise_sunset = $('#sunrise_sunset').val();
        var end_time = $('#end_time').val();

        // Filter logic 
        var filteredDangerousStreets = dangerousStreets.filter(function(street) {
            return (county === '' || street.county === county) &&
                   (severity === '' || street.severity === severity) &&
                   (weather === '' || street.weather === weather) &&
                   (sunrise_sunset === '' || street.sunrise_sunset === sunrise_sunset) &&
                   (end_time === '' || new Date(street.end_time) <= new Date(end_time));
        });

        var filteredSafestStreets = safestStreets.filter(function(street) {
            return (county === '' || street.county === county) &&
                   (severity === '' || street.severity === severity) &&
                   (weather === '' || street.weather === weather) &&
                   (sunrise_sunset === '' || street.sunrise_sunset === sunrise_sunset) &&
                   (end_time === '' || new Date(street.end_time) <= new Date(end_time));
        });

        // Clear existing layers
        map.eachLayer(function(layer) {
            if (layer instanceof L.Polyline) {
                map.removeLayer(layer);
            }
        });

        // Add filtered streets to the map
        addStreetsToMap(filteredDangerousStreets, 'red');
        addStreetsToMap(filteredSafestStreets, 'green');
    });
});
