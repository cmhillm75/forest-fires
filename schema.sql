CREATE TABLE fires_data (
    "LONGITUDE" DOUBLE PRECISION,
    "LATITUDE" DOUBLE PRECISION,
    "GLOBALID" TEXT,
    "FIRENAME" TEXT,
    "FIREYEAR" INTEGER,
    "SECURITYID" TEXT,
    "DISCOVERYDATETIME" TIMESTAMP,
    "SIZECLASS" CHAR(1),
    "TOTALACRES" DOUBLE PRECISION,
    "STATCAUSE" TEXT,
    "DATASOURCE" TEXT,
    "FIREOUTDATETIME" TIMESTAMP,
    "OWNERAGENCY" TEXT,
    "UNITIDOWNER" TEXT,
    "PROTECTIONAGENCY" TEXT,
    "POINTTYPE" TEXT,
    "PERIMEXISTS" CHAR(1),
    "FIRERPTQC" TEXT,
    "ACCURACY" DOUBLE PRECISION,
    "SHAPE" TEXT
);


DROP TABLE fires_data;


SELECT * from fires_data;