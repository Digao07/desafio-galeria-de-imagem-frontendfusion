export const fetchImages = async (limit = 20) => {
    const response = await fetch(`https://picsum.photos/v2/list?limit=${limit}`);
    return response.json();
  };
  