import { useEffect, useState } from 'react';
import { fetchImages } from './utils/api';
import './App.css'

function App() {
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchImages().then(setImages);
  }, []);
  const toggleFavorite = (image) => {
    setFavorites((prevFavorites) =>
      prevFavorites.find((fav) => fav.id === image.id)
        ? prevFavorites.filter((fav) => fav.id !== image.id)
        : [...prevFavorites, image]
    );
  };

return (
    <div className="container mx-auto p-4">
      <div className="gallery grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="relative">
            <img
              src={image.download_url}
              alt={image.author}
              className="rounded-lg shadow-lg"
            />
            <button
              onClick={() => toggleFavorite(image)}
              className="absolute top-2 right-2 bg-white p-2 rounded-full"
            >
              {favorites.find((fav) => fav.id === image.id) ? '💾' : '🖼️'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;