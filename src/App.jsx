import { useEffect, useState } from 'react';
import { fetchImages } from './utils/api';
import ImageCard from './components/ImageCard';

function App() {
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [authorFilter, setAuthorFilter] = useState(''); 
  const [sizeFilter, setSizeFilter] = useState('');

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

  
  const filteredImages = images.filter((image) => {
    const matchesAuthor = authorFilter ? image.author.includes(authorFilter) : true;
    const matchesSize =
      sizeFilter === 'small'
        ? image.width < 1000
        : sizeFilter === 'medium'
        ? image.width >= 1000 && image.width < 3000
        : sizeFilter === 'large'
        ? image.width >= 3000
        : true;
    return matchesAuthor && matchesSize;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="filters flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by author"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          className="p-2 border rounded"
        />

        <select
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Sizes</option>
          <option value="small">Small (&lt; 1000px)</option>
          <option value="medium">Medium (1000px - 3000px)</option>
          <option value="large">Large (&gt; 3000px)</option>
        </select>
      </div>

      <div className="gallery grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            isFavorite={!!favorites.find((fav) => fav.id === image.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
