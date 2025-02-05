# Forest Fires Data Visualization & Web Application (Project 3)

## Description of Project

This project analyzes wildfire incidents using structured datasets, SQL queries, and visualizations. It includes a cleaned dataset of fire records, SQL queries for data extraction, a Jupyter Notebook for data analysis and visualization, and an interactive web application map displaying fire data.

## Data Source

Department of Agriculture, United States Forest Service (USFS)

## Links to Source Data

<https://data-usfs.hub.arcgis.com/datasets/usfs::national-usfs-fire-occurrence-point-feature-layer/about?form=MG0AV3>

## Link to Fire Occurrences Metadata

<https://www.fs.usda.gov/r3/gis/gisdata/FireOccurrence.html#2>

## Features

Dataset Analysis: Structured fire data with over 15,000 records.

SQL Queries: Predefined queries to analyze fire trends and causes.

Visualizations: Interactive graphs generated using Python.

Web Application: Flask API serving wildfire data.

Interactive Map: Leaflet.js map visualizing fire data by decade.

[Google Slides](https://docs.google.com/presentation/d/10PRHJxYHzHH4yVl10pQoEe522UiQr8c0lNpbePEXb1I/edit#slide=id.g32fed920d04_3_28)

## Installation

To install and set up our project, these steps must be completed prior to running:

Clone the repository

git clone <https://github.com/tohassan21/forest-fires>

## Navigate to the project directory

cd .../forest-fires

Install dependencies

pip install -r requirements.txt  # For Python dependencies

## Usage

Troubleshooting: Due to size of the clean_fire.csv file, may nee to download it to the desktop directly from the repository first. If downloading on a Mac, the file may download as a .txt file. To reformat to a .csv file, enter the following line in a terminal window in the repository folder:

mv `clean_fire.txt` to `clean_fire.csv`

Now you should be able to continue to the following step.

Run all of the cells in the `clean_fire_visuals.ipynb` file in jupyter notebook.

This file pulls the data from the `clean_fire.csv` file and exports 3 visualizations:

1. fires_per_year_by_sizeclass.png
2. total_fires_by_sizeclass.png
3. total_fires_per_year.png

## Running SQL Queries

Use the fire_queries.sql file to run predefined queries on fire data. We used Postgres (pgAdmin 4).

## Running Jupyter Notebook

To analyze and visualize data:

jupyter notebook clean_fire_visuals.ipynb

## Running Flask API

To start the Flask web application:

python app.py

The API will be available at <http://127.0.0.1:5000/data>.

## Running the Interactive Map

The map is powered by Leaflet.js and fetches data from the Flask API. Open the relevant HTML file in a browser to view fire incidents.

Dataset Details (clean_fire.csv)

15,322 wildfire records

20 columns, including:

LONGITUDE, LATITUDE: Fire location

FIREYEAR: Year of occurrence

TOTALACRES: Total acres burned

STATCAUSE: Cause of the fire

Some missing values in GLOBALID, DISCOVERYDATETIME, and OWNERAGENCY.

## SQL Queries Overview (fire_queries.sql)

- Fetches fires by a specific year.

- Counts fires per decade.

- Summarizes total acres burned by decade.

- Investigates fire causes.

## Database Schema (schema.sql)

Defines the fires_data table structure.

Includes:

FIRENAME, FIREYEAR, STATCAUSE, TOTALACRES.

DISCOVERYDATETIME, FIREOUTDATETIME for tracking fire duration.

- Uses DOUBLE PRECISION for latitude/longitude.

- Visualization Notebook (`clean_fire_visuals.ipynb`)

- Uses pandas, numpy, matplotlib for data processing and visualization.

- Loads `clean_fire.csv` and generates insights.

## Web Application (app.py)

- Flask API that serves wildfire data.

- Uses SQLAlchemy to connect to a PostgreSQL database (forest_fires_db).

- Defines a fires_data model for querying fire records.

- Provides an endpoint (/data) to return fire data as JSON.

## Interactive Map (fire.js)

- Uses Leaflet.js to display fire locations on an interactive map.

- Allows filtering by decade using a dropdown.

- Fetches fire data from the Flask API.

- Uses a color-coded legend based on acres burned.

## Styling (style.css)

- Styles map layout, dropdown menu, and legend.

- Ensures responsive design for interactive elements.

- Positions UI components effectively for better usability.

## Contributors

Lannon Grady

Toka Hassan

Toni Makakoa

Daniel Simonson

Chad Hillman
