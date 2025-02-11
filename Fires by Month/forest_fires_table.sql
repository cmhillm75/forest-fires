DROP TABLE IF EXISTS forest_fires;


CREATE TABLE forest_fires (
  global_id VARCHAR (38),
  fire_name VARCHAR (30),
  fire_year VARCHAR (4),
  fire_cause VARCHAR (20),
  total_acres FLOAT,
  latitude DECIMAL (8,6) NOT NULL,
  longitude DECIMAL (9,6) NOT NULL,
  discovery_date DATE,
  fireout_date DATE,
  month_name VARCHAR (10),
  month_number FLOAT,
  decade VARCHAR (5),
  size_class VARCHAR (10)
 );


SELECT *
FROM forest_fires

