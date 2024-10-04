import { useEffect, useState } from 'react';
import { fetchImages } from './utils/api';
import './App.css'

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages().then(setImages);
  }, []);

  return (
    <div className="gallery grid grid-cols-3 gap-4">
      {images.map(image => (
        <img key={image.id} src={image.download_url} alt={image.author} className="rounded-md" />
      ))}
    </div>
  );
}

export default App;