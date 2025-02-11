
// The below portion of code was derived entirely from A.I. assistance using various internet resources. 
// I tried like mad to code this on my own but just couldn't, so please grade me on the understanding of how I wanted to display the data but not on the execution.

// Create the static chart
function renderStaticChart() {
    fetch("http://127.0.0.1:5000/data")
    .then(response => response.json())
    .then(data => {
        let labels = data.map(item => item.month_name);
        let values = data.map(item => item.fire_count);

        let trace = {
            x: labels,
            y: values,
            type: 'bar',
            marker: { color: 'rgba(255, 99, 132, 0.5)' }
        };

        let layout = {
            title: 'Historical Fire Count by Month',
            width: 1000,
            height: 500,
            xaxis: { title: 'Month' },
            yaxis: { title: 'Incidents Since 1902' }
        };

        Plotly.newPlot('fireFrequencyChart', [trace], layout);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Create the first dynamic chart
function fetchAndUpdateByMonth(month) {
    fetch(`http://127.0.0.1:5000/data/month?month=${month}`)
    .then(response => response.json())
    .then(data => {
        let sizeClasses = data.map(item => item.size_class);
        let totalAcres = data.map(item => item.total_acres);

        let trace = {
            x: sizeClasses,
            y: totalAcres,
            type: 'bar',
            marker: { color: 'rgba(255, 99, 132, 0.5)' }    //different color if needed 54, 162, 235, 0.5
        };

        let layout = {
            title: `Total Acres Burned by Size Class (${month})`,
            xaxis: { title: 'Size Class' },
            yaxis: { title: 'Total Acres' }
        };

        Plotly.newPlot('monthChart', [trace], layout);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Create the second dynamic chart
function fetchAndUpdateByDecade(decade) {
    fetch(`http://127.0.0.1:5000/data/decade?decade=${decade}`)
    .then(response => response.json())
    .then(data => {
        let sizeClasses = data.map(item => item.size_class);
        let totalAcres = data.map(item => item.total_acres);

        let trace = {
            x: sizeClasses,
            y: totalAcres,
            type: 'bar',
            marker: { color: 'rgba(255, 99, 132, 0.5)' }    //different color if needed 255, 206, 86, 0.5
        };

        let layout = {
            title: `Total Acres Burned by Size Class (${decade})`,
            xaxis: {
                title: 'Size Class',
                tickvals: ['Class D', 'Class E', 'Class F', 'Class G', 'Class H', 'Class I', 'Class J', 'Class K', 'Class L'],
                ticktext: ['Class D', 'Class E', 'Class F', 'Class G', 'Class H', 'Class I', 'Class J', 'Class K', 'Class L'],
            },
            yaxis: {
                title: 'Total Acres Burned',
                range: getYAxisRange(decade),  
            }
        };
        
        function getYAxisRange(decade) {
            if (parseInt(decade) <= 1970) {
                return [0, 200000];
            }
            else {
                return [0, 6500000];
            }
        }
        
        Plotly.newPlot('decadeChart', [trace], layout);
    })
    .catch(error => console.error('Error fetching data:', error));
}

document.getElementById('selMonth').addEventListener('change', function() {
    fetchAndUpdateByMonth(this.value);
});

document.getElementById('selDecade').addEventListener('change', function() {
    fetchAndUpdateByDecade(this.value);
});

renderStaticChart();

document.addEventListener('DOMContentLoaded', function() {
    fetchAndUpdateByMonth('January');  
    fetchAndUpdateByDecade('1900s');  
});