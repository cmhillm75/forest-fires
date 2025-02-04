document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map centered on the US with zoom level 4.5
    let myMap = L.map("map", {
        center: [37, -95],
        zoom: 4.5
    });

    // Add street map layer with attribution
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    // Add topographic map layer with attribution
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://opentopomap.org/">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Add layer control to switch between street map and topographic map
    L.control.layers({
        "Street Map": streetmap,
        "Topographic Map": topo
    }).addTo(myMap);

    // Create a variable to store the open popup
    let currentPopup = null;

    // Event listener for the decade dropdown menu
    document.getElementById('decade-select').addEventListener('change', function(event) {
        let selectedDecade = event.target.value;
        fetchDataForDecade(selectedDecade);
    });

    // Function to calculate the decade from a given year
    function getDecadeRange(year) {
        let startYear = Math.floor(year / 10) * 10;
        return `${startYear}s`;
    }

    // Function to determine the color based on the total acres burned
    function getColor(acres) {
        if (acres >= 750000) return "#8B0000";  // DarkRed
        else if (acres >= 500000) return "#B22222";  // FireBrick
        else if (acres >= 250000) return "#800000";  // Maroon
        else if (acres >= 100000) return "#FF0000";  // Red
        else if (acres >= 50000) return "#FF8C00";  // DarkOrange 
        else if (acres >= 20000) return "#D2691E";  // Chocolate
        else if (acres >= 10000) return "#FFA500";  // Orange
        else if (acres >= 5000) return "#DAA520";  // GoldenRod
        else if (acres >= 1000) return "#808000";  // Olive
        else if (acres >= 500) return "#0000CD";  // MediumBlue
        else return "#008000";  // Green 
    }

    // Function to calculate the radius based on the total acres burned
    function getRadius(acres) {
        const baseRadius = Math.sqrt(acres) * 80;  // Sets the scaling factor
        return baseRadius < 40 ? 40 : baseRadius;  // applies a minimum radius
    }

    // Function to fetch and display data for the selected decade
    function fetchDataForDecade(decade) {
        // Clear existing layers
        myMap.eachLayer(function(layer) {
            if (layer instanceof L.Circle) {
                myMap.removeLayer(layer);
            }
        });

        // Remove the currently open popup if it exists
        if (currentPopup) {
            myMap.closePopup(currentPopup);
            currentPopup = null;
        }

        // Fetch the fire data from the server
        fetch('http://127.0.0.1:5000/data')
        .then(response => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                console.error('No valid data fetched.');
                return;
            }

            let fireCount = 0;  // Variable to keep track of the number of fires

            // Loop through each fire record and add circles to the map
            data.forEach(item => {
                let itemDecade = getDecadeRange(item.FIREYEAR);
                if (itemDecade === decade) {
                    fireCount++;  // Increment the fire count
                    if (item.LATITUDE && item.LONGITUDE && item.LATITUDE !== '' && item.LONGITUDE !== '') {
                        let circleRadius = getRadius(item.TOTALACRES);
                        let circleColor = getColor(item.TOTALACRES);
                        let circle = L.circle([item.LATITUDE, item.LONGITUDE], {
                            radius: circleRadius,
                            color: circleColor,
                            fillColor: circleColor,
                            fillOpacity: 0.8
                        });

                        // Add an invisible layer for mouseover interaction
                        let interactionCircle = L.circle([item.LATITUDE, item.LONGITUDE], {
                            radius: circleRadius * 2.0,  // Increase interaction area
                            color: "transparent",  // Invisible border
                            fillColor: "transparent",
                            fillOpacity: 0
                        });

                        // Bind a popup to the circle with fire details
                        circle.bindPopup(`<b>${item.FIRENAME}</b><br>Year: ${item.FIREYEAR}<br>Total Acres: ${item.TOTALACRES}<br>Cause: ${item.STATCAUSE}<br>Owner: ${item.OWNERAGENCY}`);

                        // Highlight circle on mouseover
                        interactionCircle.on('mouseover', function(e) {
                            circle.openPopup();
                            circle.setStyle({fillOpacity: 0.8, color: "#FFFFFF"});  // Highlight circle
                        });

                        // Reset circle style on mouseout
                        interactionCircle.on('mouseout', function(e) {
                            circle.closePopup();
                            circle.setStyle({fillOpacity: 0.8, color: circleColor});  // Reset circle style
                        });

                        // Add interaction layer and circle to the map
                        interactionCircle.addTo(myMap);
                        circle.addTo(myMap);
                    } else {
                        console.error("Missing latitude or longitude for item:", item);
                    }
                }
            });

            // Create a popup with the total number of fires for the selected decade
            currentPopup = L.popup({ closeOnClick: false, autoClose: false })
                .setLatLng(myMap.getCenter())  // Position the popup at the center of the map
                .setContent(`<div style="font-weight: bold; font-size: 16px;"><b>Total Fires in ${decade}:</b> ${fireCount}</div>`)
                .openOn(myMap);  // Open the popup on the map
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    // Initialize with the first decade option
    fetchDataForDecade('1900s');
});
