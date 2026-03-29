import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
  const API_KEY = '55036225-8ce8ea9a0711c46d4e7453374';
  const url = 'https://pixabay.com/api/';

  const response = await axios.get(url, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });

  return response.data;
}
