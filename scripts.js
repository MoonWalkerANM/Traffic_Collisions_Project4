document.addEventListener('DOMContentLoaded', () => {
     // Add the map title
     const title = document.createElement('h2');
     title.textContent = 'Traffic Collision Incidents in Los Angeles (2020 - 2022)';
     title.style.textAlign = 'center'; // Optional: Center the title
     document.body.insertBefore(title, document.getElementById('map'));
    // Initialize the map
    const map = L.map('map').setView([34.0522, -118.2437], 12); // Center on Los Angeles

    // Add base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create a GeoJSON layer
    const geojsonLayer = L.geoJson(null, {
        pointToLayer: function (feature, latlng) {
            const severity = feature.properties.Severity;
            let size, color;

            // Determine size and color based on severity
            switch (severity) {
                case 1:
                    size = 2;
                    color = 'green';
                    break;
                case 2:
                    size = 3;
                    color = 'yellow';
                    break;
                case 3:
                    size = 4;
                    color = 'orange';
                    break;
                case 4:
                    size = 6;
                    color = 'red';
                    break;
                default:
                    size = 6;
                    color = 'gray';
            }

            return L.circleMarker(latlng, {
                radius: size,
                fillColor: color,
                color: 'black',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                layer.bindPopup(`
                    <b>Description:</b> ${feature.properties.Description}<br>
                    <b>Severity:</b> ${feature.properties.Severity}<br>
                    <b>Zipcode:</b> ${feature.properties.Left_Zipcode}
                `);
            }
        }
    }).addTo(map);

    // Load and display GeoJSON data
    function loadGeoJSON() {
        fetch('data.geojson')
            .then(response => response.json())
            .then(data => {
                geojsonLayer.addData(data);
            })
            .catch(error => console.error('Error loading GeoJSON:', error));
    }

    loadGeoJSON();

    // Apply filters based on user input
    window.applyFilters = function() {
        const streetName = document.getElementById('streetName').value.toLowerCase();
        const severity = parseInt(document.getElementById('severity').value, 10);
        const dayOfWeek = document.getElementById('dayOfWeek').value;
        const year = parseInt(document.getElementById('year').value, 10); // Convert to number
        const leftZipcode = document.getElementById('leftZipcode').value;

        geojsonLayer.clearLayers();

        fetch('data.geojson')
            .then(response => response.json())
            .then(data => {
                const filteredData = {
                    type: "FeatureCollection",
                    features: data.features.filter(feature => {
                        const props = feature.properties;
                        return (streetName === '' || props.Street.toLowerCase().includes(streetName)) &&
                               (isNaN(severity) || props.Severity === severity) &&
                               (dayOfWeek === '' || props.Day_of_the_Week === dayOfWeek) &&
                               (isNaN(year) || props.Year === year) &&
                               (leftZipcode === '' || props.Left_Zipcode.toString().includes(leftZipcode));
                    })
                };
                geojsonLayer.addData(filteredData);
            })
            .catch(error => console.error('Error filtering GeoJSON:', error));
    };
});
