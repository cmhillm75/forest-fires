-- Check for fires by single year
SELECT * FROM fires_data WHERE "FIREYEAR" = 2023;

--Check for number of fires by decade
SELECT
  (FLOOR("FIREYEAR" / 10) * 10) AS decade,
  COUNT(*) AS fire_count
FROM
  fires_data
GROUP BY
  decade
ORDER BY
  decade;

-- Check for the number of fires and total acres burned by decade
SELECT
  (FLOOR("FIREYEAR" / 10) * 10) AS decade,
  COUNT(*) AS fire_count,
  SUM("TOTALACRES") AS total_acres
FROM
  fires_data
GROUP BY
  decade
ORDER BY
  decade;


-- Check for which is the leading cause of fires in the db
SELECT
  "STATCAUSE",
  COUNT(*) AS fire_count
FROM
  fires_data
GROUP BY
  "STATCAUSE"
ORDER BY
  fire_count DESC;
  
-- FIREYEAR with most fires and its count
SELECT "FIREYEAR", COUNT(*) AS fire_count
FROM fires_data
GROUP BY "FIREYEAR"
ORDER BY fire_count DESC
LIMIT 1;

-- Top 10 years with the most fires and their total acres burned
SELECT "FIREYEAR", COUNT(*) AS fire_count, SUM("TOTALACRES") AS total_acres
FROM fires_data
GROUP BY "FIREYEAR"
ORDER BY fire_count DESC
LIMIT 10;

-- Year with the most total acres burned
SELECT "FIREYEAR", SUM("TOTALACRES") AS total_acres
FROM fires_data
GROUP BY "FIREYEAR"
ORDER BY total_acres DESC
LIMIT 1;

-- 10 Longest Burning Fires
SELECT
  "FIRENAME",
  "DISCOVERYDATETIME",
  "FIREOUTDATETIME",
  ("FIREOUTDATETIME" - "DISCOVERYDATETIME") AS burn_duration,
  "TOTALACRES"
FROM
  fires_data
WHERE
  "FIREOUTDATETIME" IS NOT NULL
  AND "DISCOVERYDATETIME" IS NOT NULL
ORDER BY
  burn_duration DESC
LIMIT 10;

