from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
import math

app = Flask(__name__)
CORS(app)

DB_HOST = "db.qhwycqmphkzleaatpibj.supabase.co"
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASSWORD = "MatLuEduFito"

def create_connection():
    connection = psycopg2.connect(
        host     = DB_HOST,
        database = DB_NAME,
        user     = DB_USER,
        password = DB_PASSWORD
    )
    return connection


@app.route('/')
def index():
    return 'Pruebaprueba'


@app.route('/listing/<int:listing_id>')
def listing(listing_id):
    listing = fetch_listing(listing_id)



@app.route('/cocheras', methods=['GET'])
def fetch_listings():

    lat1 = math.radians(float(request.args.get('lat')))
    lon1 = math.radians(float(request.args.get('lng')))
    
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT direc, cant_vehiculos, lat, lon FROM cochera")
    listings = cursor.fetchall()

    nearby_listings = []

    for listing in listings:
        lat2 = math.radians(listing[2])
        lon2 = math.radians(listing[3])

        distance = math.acos(math.sin(lat1)*math.sin(lat2) + math.cos(lat1)*math.cos(lat2)*math.cos(lon2-lon1)) * 6371

        if distance <= 5:
            nearby_listings.append(listing)

    print(nearby_listings)


    
    connection.close()
    return jsonify(nearby_listings)



def fetch_listing(listing_id):
    # Implement logic to fetch a specific listing from the database
    # Return the listing object
    pass


if __name__ == '__main__':
    app.run(debug=True)