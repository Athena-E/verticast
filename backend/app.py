from flask import Flask, jsonify
from flask_cors import CORS
import requests

# temporary flask backend

app = Flask(__name__)
CORS(app)

# api endpoint to send temperature and location data
@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        # response = requests.get('url')
        # data = response.json()
        data = {'temperature': 30, 'location': 'Not Ben Nevis', 'descr': 'sun'} # temporary data
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
