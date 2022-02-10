const KEY = '24522433-b765e3bcd233b8a39427fcc1c';
const BASE_URL = 'https://pixabay.com/api/';

function searchImages(query, page) {
  return fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Nothing found for this query'));
  });
}

export default searchImages;
