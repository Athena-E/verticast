from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:8081"}})


@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        # response = requests.get('')
        # data = response.json()
        data = {'temperature': 30, 'location': 'Not Ben Nevis'}
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
