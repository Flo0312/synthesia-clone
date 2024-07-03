import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en');
  const [avatarId, setAvatarId] = useState(1);
  const [videoUrl, setVideoUrl] = useState('');

  const handleGenerate = async () => {
    const speechResponse = await axios.post('/generate_speech', { text, language });
    const videoResponse = await axios.post('/create_video', { avatar_id: avatarId, speech_url: speechResponse.data.speech_url });
    setVideoUrl(videoResponse.data.video_url);
  };

  return (
    <div>
      <h1>Create Your AI Video</h1>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter text" />
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="fr">French</option>
          {/* Add more languages */}
      </select>
      <button onClick={handleGenerate}>Generate Video</button>
      videoUrl && <video src={videoUrl} controls />
    </div>
  );
}

export default App;
