
from flask import Flask, request, jsonify
from tts_service import generate_speech
from video_service import create_video

app = Flask(__name__)

@app.route('/generate_speech', methods=['POST'])
def generate_speech_route():
    text = request.json.get('text')
    language = request.json.get('language')
    speech_url = generate_speech(text, language)
    return jsonify({'speech_url': speech_url})

@app.route('/create_video', methods=['POST'])
def create_video_route():
    avatar_id = request.json.get('avatar_id')
    speech_url = request.json.get('speech_url')
    video_url = create_video(avatar_id, speech_url)
    return jsonify({'video_url': video_url})

if __name__ == '__main__':
    app.run(debug=True)
