
from flask_cors import CORS
from flask import Flask, jsonify, request
from sqlalchemy import create_engine
import pandas as pd

app = Flask(__name__)
CORS(app)

DATABASE_URL = "postgresql://postgres:Zell&Flynn@localhost:5432/forest_fires"
engine = create_engine(DATABASE_URL)

# The below portion of code was derived entirely from A.I. assistance using various internet resources. 
# I tried like mad to code this on my own but just couldn't, so please grade me on the understanding of how to display the data but not on the execution.
@app.route('/data')
def get_data():
    query = """
        SELECT month_number, month_name, COUNT(*) AS fire_count
        FROM forest_fires
        GROUP BY month_number, month_name
        ORDER BY month_number;
    """
    df = pd.read_sql(query, engine)
    return jsonify(df.to_dict(orient="records"))

@app.route('/data/month')
def get_data_by_month():
    month = request.args.get('month')
    if not month:
        return jsonify({"error": "Month parameter is required"}), 400

    query = """
        SELECT size_class, SUM(total_acres) as total_acres
        FROM forest_fires
        WHERE month_name = %s
        GROUP BY size_class
        ORDER BY 
            CASE size_class
                WHEN 'Class D' THEN 1
                WHEN 'Class E' THEN 2
                WHEN 'Class F' THEN 3
                WHEN 'Class G' THEN 4
                WHEN 'Class H' THEN 5
                WHEN 'Class I' THEN 6
                WHEN 'Class J' THEN 7
                WHEN 'Class K' THEN 8
                WHEN 'Class L' THEN 9
                ELSE 10
            END;
    """
    df = pd.read_sql(query, engine, params=(month,))
    return jsonify(df.to_dict(orient="records"))

@app.route('/data/decade')
def get_data_by_decade():
    decade = request.args.get('decade')
    if not decade:
        return jsonify({"error": "Decade parameter is required"}), 400

    query = """
        SELECT size_class, SUM(total_acres) as total_acres
        FROM forest_fires
        WHERE decade = %s
        GROUP BY size_class
        ORDER BY 
            CASE size_class
                WHEN 'Class D' THEN 1
                WHEN 'Class E' THEN 2
                WHEN 'Class F' THEN 3
                WHEN 'Class G' THEN 4
                WHEN 'Class H' THEN 5
                WHEN 'Class I' THEN 6
                WHEN 'Class J' THEN 7
                WHEN 'Class K' THEN 8
                WHEN 'Class L' THEN 9
                ELSE 10
            END;
    """
    df = pd.read_sql(query, engine, params=(decade,))  
    return jsonify(df.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)