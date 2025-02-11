Forest Fires Project 3: Lannon Grady

Step-by-Step Instructions for creating the Forest Fires Dashboard:

I took the clean_fire.csv that was provided by Chad and pulled it into Pandas to clean the data and build a dataframe containing only the columns I would need.

To replicate these steps, please:
1. Download the Fires by Month Folder from the forest-fires repo.
2. Open the fires_by_month.ipynb file in Jupyter Notebook.
3. Follow the steps including importing the clean_fire.csv from the same folder.
4. Eventually, near the bottom of the fires_by_month Jupyter file, you will create the "fire_ready_data3.csv". When you've reached that point, you can now move over to PGAdmin 4. 
5. Open pgAdmin 4.
6. Right click on Database and select "Create".
7. Name the database "forest_fires" and click Save.
8. Right click on the forest_fires you just created. Select "Query Tool".
9. Press Ctrl + O to access the Open File menu.
10. Select "forest_fires_table.sql" that you recently downloaded from the Fires by Month folder.
11. Press F5 to execute the script.
12. Now right click and choose "Refresh" within the left hand tool bar under the database labeled forest_fires.
13. Click on "Tables" so you can see the newly created "forest_fires" table. Right click on "forest_fires" and select "Import/Export Data".
14. From within the import/export data menu, click on filename and select the "fire_ready_data3.csv" that you recently downloaded.
15. Before clicking "Ok", be sure that the Options/Header toggle switch is "On", and the Columns/Columns to export selections look correct. Click "Ok".
16. Two green boxes should appear and indicate Import Data completed without error.
17. Returning to the query tool, you can highlight rows 29-30 and press F5 to ensure that the SQL table imported the data correctly into the forest_fires table.
18. Now, you should be able to recreate the dashboard by first ensuring the Flask app is refreshed and running.
19. Open a terminal into the Fires by Month folder.
20. Input python app.py and hit enter. This should activate the Flask app.
21. Once Flask is running, you may now open the Fires by Month folder within Visual Studio Code.
22. Right click on the index.html file and select Open with Live Server.
23. A new browser window will pop up and the dashboard will appear.
24. The top chart is static but the button two charts will enable you to select the month of fire detection or decade to see the variances in forest fires.

Sources:
Python data cleaning/Jupyter Notebooks/SQL/CSV - no real assistance was needed. I'm comfortable doing these tasks with minimal assistance.
index.html - I amended the code from the Belly Button Biodiversity challenge file to make sense for our Forest Fire purposes and used Google AI to spot-check/resolve console errors.

The next two files were almost derived entirely using A.I. assistance and almost none of my code. I kept running into Flask conflicts and continually creating errors so this is the only way I was able to execute the visual presentation of the data in the manner I desired. For these reasons, I should be graded on the understanding of how I wanted to display the data but NOT on the execution of the app.py or script.js files. Please reach out to me if you would like to discuss this point in detail.