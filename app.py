# Add dependecies
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Create the Flask app CORS required to share to .js
app = Flask(__name__)

# Configure SQLALCHEMY part of the app instance
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:bootcamp_data@localhost/forest_fires_db'

# Create SQLALCHEMY database instance
db = SQLAlchemy(app)

# Enable CORS to send to javascript
CORS(app)  

# Define the data model
class YourModel(db.Model):
    __tablename__ = 'fires_data'

    GLOBALID = db.Column(db.Text, primary_key=True)
    LONGITUDE = db.Column(db.Float, nullable=False)
    LATITUDE = db.Column(db.Float, nullable=False)
    FIRENAME = db.Column(db.Text, nullable=False)
    FIREYEAR = db.Column(db.Integer, nullable=False)
    TOTALACRES = db.Column(db.Float, nullable=False)
    STATCAUSE = db.Column(db.Text, nullable=False)
    OWNERAGENCY = db.Column(db.Text, nullable=False)

# Define the route to get the data from SQL database
@app.route('/data', methods=['GET'])
def get_data():
    try:
        # Query all records and filter out None items
        data = YourModel.query.filter(YourModel.LATITUDE.isnot(None), YourModel.LONGITUDE.isnot(None)).all()
        
        # Confirm we are receiving data, if not display error
        if not data:
            return jsonify({"message": "No data found in the database"}), 404

        # Prepare the results 
        results = []
        for item in data:
            if item is None:
                continue

            result = {
                "GLOBALID": item.GLOBALID,
                "LONGITUDE": item.LONGITUDE,
                "LATITUDE": item.LATITUDE,
                "FIRENAME": item.FIRENAME,
                "FIREYEAR": item.FIREYEAR,
                "TOTALACRES": item.TOTALACRES,
                "STATCAUSE": item.STATCAUSE,
                "OWNERAGENCY": item.OWNERAGENCY
            }

            results.append(result)

        # Return the results (output to url as JSON)
        return jsonify(results)
    except Exception as error:
        print("Error while fetching data", error)
        return jsonify({"message": "An error occurred while fetching data"}), 500

# Runs the app, creates the tables in the app and apply debugging in the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
